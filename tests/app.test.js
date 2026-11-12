import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';

// Exercise our page bindings and router configuration without a browser or CDN.
globalThis.Vue = { ref: value => ({ value }), watch() {}, onMounted() {}, onUnmounted() {} };
globalThis.VueRouter = {
    createWebHashHistory: () => ({ type: 'hash' }),
    createRouter: config => ({ ...config, afterEach(handler) { this.onNavigation = handler; } }),
    useRoute: () => ({ path: '/' }),
};
globalThis.window = { location: { href: 'https://example.com/studio/index.html#/custom-orders' }, navigator: { onLine: true }, addEventListener() {}, removeEventListener() {} };

const { routes, router } = await import('../src/router/index.js');
const { useQuoteForm } = await import('../src/composables/useQuoteForm.js');
const { default: header } = await import('../src/components/AppHeader.js');
const { default: footer } = await import('../src/components/AppFooter.js');

test('all page routes expose their required data and form bindings', () => {
    const required = {
        '/': ['featuredProducts', 'testimonials'],
        '/shop': ['allProducts'],
        '/portfolio': ['portfolioItems'],
        '/services': ['servicesList'],
        '/custom-orders': ['form', 'isSubmitting', 'fileError', 'submitError', 'submitForm', 'handleFileUpload', 'contact', 'returnUrl'],
    };
    for (const [path, names] of Object.entries(required)) {
        const bindings = routes.find(route => route.path === path).component.setup();
        for (const name of names) assert.ok(bindings[name] !== undefined, `${path}: missing ${name}`);
    }
});

test('navigation targets exist and obsolete view switching is removed', () => {
    const paths = new Set(routes.map(route => route.path));
    for (const item of header.setup().navItems) assert.ok(paths.has(item.path));
    const components = [...routes.filter(route => route.component).map(route => route.component), header, footer];
    for (const component of components) {
        assert.doesNotMatch(component.template, /currentView|app\._context|\$root/);
        for (const match of component.template.matchAll(/(?<!:)\bto="([^"]+)"|\$router\.push\('([^']+)'\)/g)) {
            assert.ok(paths.has(match[1] || match[2]), `Unknown route in ${component.name}`);
        }
    }
    assert.equal(routes.find(route => route.path === '/orders').redirect, '/custom-orders');
    assert.equal(routes.at(-1).name, 'not-found');
    assert.equal(router.history.type, 'hash');
    assert.deepEqual(router.scrollBehavior({}, {}, null), { top: 0, left: 0 });
    assert.deepEqual(router.scrollBehavior({}, {}, { top: 250 }), { top: 250 });
});

test('quote form rejects invalid attachments and allows removing them', () => {
    const quote = useQuoteForm();
    const input = file => ({ target: { files: file ? [file] : [], value: 'chosen' } });
    quote.handleFileUpload(input({ name: 'art.pdf', size: 100 }));
    assert.equal(quote.form.value.fileName, 'art.pdf');
    const oversized = input({ name: 'art.png', size: 10 * 1024 * 1024 + 1 });
    quote.handleFileUpload(oversized);
    assert.ok(quote.fileError.value);
    assert.equal(oversized.target.value, '');
    assert.equal(quote.form.value.fileName, '');
    let prevented = false;
    quote.submitForm({ preventDefault() { prevented = true; } });
    assert.ok(prevented);
    assert.equal(quote.isSubmitting.value, false);
    quote.handleFileUpload(input({ name: 'script.exe', size: 1 }));
    assert.ok(quote.fileError.value);
    quote.fileInput.value = { value: 'chosen' };
    quote.clearFile();
    assert.equal(quote.fileError.value, '');
    assert.equal(quote.fileInput.value.value, '');
    quote.handleFileUpload(input({ name: 'ART.JPG', size: 10 * 1024 * 1024 }));
    assert.equal(quote.form.value.fileName, 'ART.JPG');
    assert.equal(quote.fileError.value, '');
});

test('submission allows native POST only for valid online requests and blocks duplicates', t => {
    let recover;
    t.mock.method(globalThis, 'setTimeout', fn => { recover = fn; return 0; });
    const quote = useQuoteForm();
    const event = () => ({ prevented: false, preventDefault() { this.prevented = true; } });
    let attempt = event();
    quote.submitForm(attempt);
    assert.ok(attempt.prevented);
    assert.ok(quote.submitError.value);
    Object.assign(quote.form.value, { type: 'general', name: 'Visitor', email: 'visitor@example.com', concept: 'Please design my logo.' });
    window.navigator.onLine = false;
    attempt = event();
    quote.submitForm(attempt);
    assert.ok(attempt.prevented);
    assert.match(quote.submitError.value, /offline/);
    window.navigator.onLine = true;
    attempt = event();
    quote.submitForm(attempt);
    assert.equal(attempt.prevented, false);
    assert.equal(quote.isSubmitting.value, true);
    assert.equal(quote.submitError.value, '');
    const duplicate = event();
    quote.submitForm(duplicate);
    assert.ok(duplicate.prevented);
    recover();
    assert.equal(quote.isSubmitting.value, false);
    assert.match(quote.submitError.value, /try again/);
    assert.equal(quote.form.value.concept, 'Please design my logo.');
});

test('native form sends named fields and attachments to the configured recipient', async () => {
    const { contact, requestReturnUrl } = await import('../src/config/contact.js');
    const view = routes.find(route => route.path === '/custom-orders').component;
    assert.equal(contact.formEndpoint, 'https://formsubmit.co/huothsitha@gmail.com');
    assert.equal(contact.email, 'huothsitha@gmail.com');
    assert.match(view.template, /:action="contact.formEndpoint" method="POST" enctype="multipart\/form-data"/);
    assert.doesNotMatch(view.template, /@submit\.prevent|formSubmitted|Demo Preview/);
    assert.doesNotMatch(view.template, /<fieldset[^>]*disabled/);
    for (const name of ['name', 'email', 'request_type', 'quantity', 'message', 'attachment', 'phone_or_telegram', 'deadline', 'budget', '_next', '_subject', '_honey']) {
        assert.ok(view.template.includes(`name="${name}"`), `Missing posted field: ${name}`);
    }
    assert.doesNotMatch(view.template, /name="_captcha" value="false"/);
    assert.equal(requestReturnUrl('https://example.com/studio/index.html#/custom-orders'), 'https://example.com/studio/index.html#/request-sent');
    assert.equal(requestReturnUrl('http://localhost:5173/#/custom-orders'), 'http://localhost:5173/index.html#/request-sent');
    assert.ok(routes.some(route => route.path === '/request-sent'));
});

test('entry point and local image references resolve', async () => {
    const base = new URL('../', import.meta.url);
    const html = await readFile(new URL('index.html', base), 'utf8');
    for (const match of html.matchAll(/(?:src|href)="(\.\/[^\"]+)"/g)) {
        await access(new URL(match[1], base));
    }
    await access(new URL('assets/images/hero-shirt.jpg', base));
});

test('all catalog and template images resolve to local image files', async () => {
    const base = new URL('../', import.meta.url);
    const { allProducts, portfolioItems } = await import('../src/data/catalog.js');
    const paths = new Set([...allProducts, ...portfolioItems].map(item => item.image));
    for (const folder of ['views', 'components']) {
        for (const filename of await readdir(new URL(`src/${folder}/`, base))) {
            const source = await readFile(new URL(`src/${folder}/${filename}`, base), 'utf8');
            assert.doesNotMatch(source, /https:\/\/(images\.unsplash\.com|flagcdn\.com)/);
            for (const match of source.matchAll(/(?<!:)\bsrc="(\.\/assets\/images\/[^\"]+)"/g)) paths.add(match[1]);
        }
    }
    for (const path of paths) {
        assert.match(path, /^\.\/assets\/images\//);
        const data = await readFile(new URL(path, base));
        if (path.endsWith('.jpg')) assert.equal(data.subarray(0, 3).toString('hex'), 'ffd8ff', path);
        if (path.endsWith('.svg')) assert.match(data.toString(), /<svg\b/);
    }
});

test('image failures switch to a local fallback without an error loop', async () => {
    const { default: fallback } = await import('../src/directives/imageFallback.js');
    const image = new EventTarget();
    Object.assign(image, { src: './assets/images/missing.jpg', complete: false, naturalWidth: 0 });
    fallback.mounted(image);
    image.dispatchEvent(new Event('error'));
    assert.ok(image.src.endsWith('/assets/images/image-unavailable.svg'));
    image.src = 'second-error';
    image.dispatchEvent(new Event('error'));
    assert.equal(image.src, 'second-error');
    fallback.unmounted(image);
    const cachedFailure = new EventTarget();
    Object.assign(cachedFailure, { complete: true, naturalWidth: 0 });
    fallback.mounted(cachedFailure);
    assert.ok(cachedFailure.src.endsWith('/assets/images/image-unavailable.svg'));
    fallback.unmounted(cachedFailure);
});

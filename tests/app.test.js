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

globalThis.location = new URL(window.location.href);

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
        '/custom-orders': ['contact'],
        '/contact': ['contact'],
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

const validValues = { type: 'Branding', name: '  Customer Name  ', email: ' customer@example.com ', concept: 'Logo and packaging', phone: '+85512345678', quantity: '25', deadline: '2026-12-15', budget: 'USD 250', referenceUrl: 'https://example.com/art' };
const event = () => ({ preventDefault() { this.prevented = true; } });

test('validation blocks invalid requests before calling EmailJS', async t => {
    let calls = 0;
    t.mock.method(globalThis, 'fetch', async () => { calls++; throw new Error('Unexpected send'); });
    const quote = useQuoteForm();
    const attempt = event();
    await quote.submitForm(attempt);
    assert.ok(attempt.prevented);
    assert.match(quote.submitError.value, /full name/);
    Object.assign(quote.form.value, validValues, { email: 'invalid-email' });
    await quote.submitForm(event());
    assert.match(quote.submitError.value, /valid email/);
    quote.form.value.email = 'customer@example.com';
    quote.form.value.quantity = '1.5';
    await quote.submitForm(event());
    assert.match(quote.submitError.value, /whole quantity/);
    quote.form.value.quantity = '';
    quote.form.value.referenceUrl = 'https://';
    await quote.submitForm(event());
    assert.match(quote.submitError.value, /valid reference/);
    quote.form.value.referenceUrl = '';
    window.navigator.onLine = false;
    try {
        await quote.submitForm(event());
        assert.match(quote.submitError.value, /offline/);
    } finally { window.navigator.onLine = true; }
    assert.equal(calls, 0);
});

test('real SDK builds one correct request, waits for acceptance, resets and blocks duplicates across forms', async t => {
    let finish;
    const requests = [];
    t.mock.method(globalThis, 'fetch', (url, options) => {
        requests.push({ url, options });
        return new Promise(resolve => { finish = resolve; });
    });
    const quote = useQuoteForm();
    Object.assign(quote.form.value, validValues);
    const pending = quote.submitForm(event());
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(quote.isSubmitting.value, true);
    assert.equal(quote.submitSuccess.value, '');
    assert.equal(quote.form.value.name, validValues.name);
    await quote.submitForm(event());
    const contactForm = useQuoteForm();
    Object.assign(contactForm.form.value, validValues);
    await contactForm.submitForm(event());
    assert.match(contactForm.submitError.value, /still sending/);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, 'https://api.emailjs.com/api/v1.0/email/send');
    assert.equal(requests[0].options.method, 'POST');
    const payload = JSON.parse(requests[0].options.body);
    assert.equal(payload.service_id, 'service_rt590wg');
    assert.equal(payload.template_id, 'template_pntrodx');
    assert.equal(payload.user_id, '8SeH6dnaP1i0q7xRM');
    assert.deepEqual(Object.keys(payload.template_params).sort(), ['email', 'message', 'name']);
    assert.equal(payload.template_params.name, 'Customer Name');
    assert.equal(payload.template_params.email, 'customer@example.com');
    for (const value of ['Branding', '+85512345678', '25', '2026-12-15', 'USD 250', 'https://example.com/art', 'Logo and packaging']) {
        assert.ok(payload.template_params.message.includes(value));
    }
    finish(new Response('OK', { status: 200 }));
    await pending;
    const { inquirySuccessMessage } = await import('../src/config/emailjs.js');
    assert.equal(quote.submitSuccess.value, inquirySuccessMessage);
    assert.equal(quote.form.value.name, '');
    assert.equal(quote.form.value.concept, '');
    assert.equal(quote.isSubmitting.value, false);
    assert.equal(quote.submitError.value, '');
});

test('provider and network failures preserve form data and allow retry', async t => {
    for (const status of [400, 403, 429, 500, 'network']) {
        t.mock.method(globalThis, 'fetch', async () => {
            if (status === 'network') throw new TypeError('Failed to fetch');
            return new Response('Provider error', { status });
        });
        const quote = useQuoteForm();
        Object.assign(quote.form.value, validValues);
        await quote.submitForm(event());
        assert.ok(quote.submitError.value);
        assert.equal(quote.submitSuccess.value, '');
        assert.equal(quote.form.value.concept, validValues.concept);
        assert.equal(quote.isSubmitting.value, false);
    }
});

test('forms use accessible shared controls and preserve quote extras', async () => {
    const { default: inquiry } = await import('../src/components/InquiryForm.js');
    assert.match(inquiry.template, /<form @submit="submitForm"/);
    assert.match(inquiry.template, /:disabled="isSubmitting"/);
    assert.match(inquiry.template, /Sending\.\.\./);
    assert.match(inquiry.template, /role="alert"/);
    assert.match(inquiry.template, /role="status"/);
    assert.doesNotMatch(inquiry.template, /formspree|formsubmit|:action=/i);
    for (const name of ['name', 'email', 'request_type', 'quantity', 'message', 'phone_or_telegram', 'deadline', 'budget', 'reference_url']) {
        assert.ok(inquiry.template.includes('name="' + name + '"'));
    }
    for (const path of ['/contact', '/custom-orders']) {
        assert.match(routes.find(route => route.path === path).component.template, /<inquiry-form/);
    }
});

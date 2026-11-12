export default {
    name: 'NotFoundView',
    template: `
        <section class="max-w-7xl mx-auto px-6 py-24 text-center">
            <p class="font-bold text-kroma-charcoal mb-4">404</p>
            <h1 class="font-syne font-extrabold text-5xl uppercase mb-6">Page not found</h1>
            <p class="mb-8">The page you requested could not be found.</p>
            <router-link to="/" class="inline-block brutal-border bg-kroma-silver px-6 py-3 font-bold">Back to Home</router-link>
        </section>
    `,
};

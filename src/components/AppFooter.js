import SocialLinks from './SocialLinks.js';

export default {
    name: "AppFooter",
    components: { SocialLinks },
    template: `<footer class="bg-kroma-ink text-kroma-bg mt-auto border-t-4 border-kroma-silver">
    <!-- Matching copies create a continuous, full-width loop. -->
    <section class="creative-strip font-grotesk" aria-label="Custom merchandise, branding, and creative design">
        <div class="creative-strip-track">
            <div v-for="copy in 2" :key="copy" class="creative-strip-group" :aria-hidden="copy === 2 ? 'true' : undefined">
                <span class="creative-strip-item strip-ideas">
                    <svg class="strip-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 21c0-4-4-4-4-10a9 9 0 0118 0c0 6-4 6-4 10M11 21h10M12 25h8M14 29h4M16 1v2M2 11h2M28 11h2"/></svg>
                    <span>Your <strong>Ideas.</strong> Made Real.</span>
                </span>
                <span class="strip-spark" aria-hidden="true">&#10022;</span>
                <span class="creative-strip-item strip-merch">
                    <svg class="strip-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M11 5L3 9l4 8 4-2v13h10V15l4 2 4-8-8-4c0 5-10 5-10 0z"/></svg>
                    <span>Custom Merch</span>
                </span>
                <span class="strip-spark" aria-hidden="true">&#10022;</span>
                <span class="creative-strip-item strip-branding">
                    <svg class="strip-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 4h12l13 13-12 12L4 16z"/><circle cx="11" cy="11" r="2"/></svg>
                    <span>Branding</span>
                </span>
                <span class="strip-spark" aria-hidden="true">&#10022;</span>
                <span class="creative-strip-item strip-design">
                    <svg class="strip-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 4l8 8-15 15-10 2 2-10zM17 7l8 8M5 19l8 8M3 29l6-6"/></svg>
                    <span>Creative Design</span>
                </span>
                <span class="strip-spark" aria-hidden="true">&#10022;</span>
            </div>
        </div>
    </section>

    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-2">
            <h2 class="font-syne font-extrabold text-4xl sm:text-5xl md:text-5xl sm:text-7xl uppercase mb-6 text-kroma-bg leading-none tracking-tighter">
                Cool<br>Concept.
            </h2>
            <p class="text-xl max-w-md opacity-80 mb-8 font-light">
                We turn your creative ideas into personalized merchandise. Custom merchandise, branding, and editorial design for the brave. Based in Phnom Penh, delivering everywhere in Cambodia.
            </p>
            <social-links />
        </div>
        <div>
            <h4 class="font-syne font-bold uppercase text-xl mb-4 text-kroma-silver">Studio</h4>
            <ul class="space-y-2 font-light">
                <li><router-link to="/" class="hover:text-kroma-silver transition-colors">Home</router-link></li>
                <li><router-link to="/portfolio" class="hover:text-kroma-silver transition-colors">Portfolio</router-link></li>
                <li><router-link to="/services" class="hover:text-kroma-silver transition-colors">Services</router-link></li>
                <li><router-link to="/about" class="hover:text-kroma-silver transition-colors">About Us</router-link></li>
                <li><router-link to="/contact" class="hover:text-kroma-silver transition-colors">Contact</router-link></li>
            </ul>
        </div>
        <div>
            <h4 class="font-syne font-bold uppercase text-xl mb-4 text-kroma-silver">Shop</h4>
            <ul class="space-y-2 font-light">
                <li><router-link to="/shop" class="hover:text-kroma-silver transition-colors">All Products</router-link></li>
                <li><router-link to="/custom-orders" class="hover:text-kroma-silver transition-colors">Custom Orders</router-link></li>
                <li><a href="#" class="hover:text-kroma-silver transition-colors">FAQ</a></li>
                <li><a href="#" class="hover:text-kroma-silver transition-colors">Shipping</a></li>
            </ul>
        </div>
    </div>
</footer>`,
};

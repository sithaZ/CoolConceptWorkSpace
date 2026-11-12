import { featuredProducts, testimonials } from '../data/catalog.js';

export default {
    name: "HomeView",
    setup() { return { featuredProducts, testimonials }; },
    template: `
<div>
    <!-- Hero -->
    <section class="hero-section relative bg-kroma-bg border-b-2 border-kroma-ink overflow-hidden">
        <!-- Abstract bg shapes -->
        <div class="absolute -right-20 -top-20 w-96 h-96 bg-kroma-cobalt rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>

        <div class="hero-layout relative z-10">
            <div class="hero-copy">
                <div class="hero-eyebrow brutal-border bg-white">
                    <span class="font-bold uppercase tracking-wide text-kroma-ink"><img v-image-fallback src="./assets/images/cambodia-flag.svg" alt="Cambodian flag" width="24" height="16" class="inline-block align-middle mr-2">Cambodia-Based Creative Merch Studio</span>
                </div>
                <h1 class="hero-title font-grotesk font-bold text-kroma-ink uppercase">
                    <span>Your Ideas.</span><span>Your Style.</span><span>Your Merch.</span>
                </h1>
                <p class="hero-description">
                    Bring your ideas to life with custom T-shirts, tote bags, packaging, gifts, and creative design. Made for your brand, event, or personal style in Cambodia.
                </p>
                <div class="hero-actions">
                    <button @click="$router.push('/shop')" class="hero-action brutal-border font-bold uppercase bg-kroma-ink text-white shadow-brutal hover-lift">
                        Explore Merchandise
                    </button>
                    <button @click="$router.push('/custom-orders')" class="hero-action brutal-border font-bold uppercase bg-white text-kroma-ink shadow-brutal hover-lift">
                        Request Custom Merch
                    </button>
                </div>
            </div>

            <div class="hero-art relative">
                <div class="absolute inset-0 bg-kroma-cobalt brutal-border translate-x-4 translate-y-4"></div>
                <img v-image-fallback src="./assets/images/hero-shirt.jpg" alt="Cream graphic T-shirt with blue cat illustration" class="hero-image relative z-10 brutal-border grayscale hover:grayscale-0 transition-all duration-500">

            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section class="py-14 sm:py-24 bg-kroma-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-wrap gap-4 justify-between items-end mb-12 border-b-2 border-kroma-ink pb-4">
                <h2 class="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter">Featured Drops</h2>
                <button @click="$router.push('/shop')" class="font-bold uppercase text-sm hover:text-kroma-cobalt transition-colors">View All &rarr;</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Product Card Component usage (simulated) -->
                <div v-for="product in featuredProducts" :key="product.id" class="group cursor-pointer">
                    <div class="relative brutal-border bg-white overflow-hidden aspect-[4/5] mb-4">
                        <img v-image-fallback :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute top-4 right-4 bg-white brutal-border px-3 py-1 font-bold text-sm">
                            {{ product.price }}
                        </div>
                    </div>
                    <h3 class="font-syne font-bold text-xl uppercase">{{ product.name }}</h3>
                    <p class="text-gray-600 font-light">{{ product.category }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-14 sm:py-24 bg-kroma-ink text-kroma-bg border-y-2 border-kroma-ink relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-10" style="background-image: radial-gradient(#E5E5E5 2px, transparent 2px); background-size: 30px 30px;"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 class="font-syne font-extrabold text-4xl md:text-5xl uppercase tracking-tighter mb-16 text-center text-kroma-silver">Cult Following</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="review in testimonials" :key="review.id" class="bg-kroma-bg text-kroma-ink p-8 brutal-border shadow-[8px_8px_0px_0px_#E5E5E5] hover:-translate-y-2 transition-transform">
                    <div class="flex text-kroma-vermilion mb-4">
                        <svg v-for="i in 5" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </div>
                    <p class="font-medium text-lg mb-6 leading-relaxed">"{{ review.text }}"</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-kroma-charcoal brutal-border rounded-full flex items-center justify-center text-white font-syne font-bold text-xl">
                            {{ review.author.charAt(0) }}
                        </div>
                        <div>
                            <h4 class="font-bold uppercase text-sm">{{ review.author }}</h4>
                            <p class="text-xs text-gray-500">{{ review.company }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
    `,
};

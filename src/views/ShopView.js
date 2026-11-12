import { allProducts } from '../data/catalog.js';

export default {
    name: "ShopView",
    setup() { return { allProducts }; },
    template: `
<div class="bg-kroma-bg min-h-screen pb-24">
    <header class="bg-kroma-charcoal text-white py-16 border-b-2 border-kroma-ink text-center">
        <h1 class="font-syne font-extrabold text-4xl sm:text-5xl md:text-5xl sm:text-7xl uppercase tracking-tighter mb-4 drop-shadow-brutal">Studio Shop</h1>
        <p class="text-xl max-w-2xl mx-auto font-medium">Limited runs, studio staples, and weird objects.</p>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <!-- Filters (Visual only) -->
        <div class="flex flex-wrap gap-4 mb-12 border-b-2 border-kroma-ink pb-6">
            <button class="bg-kroma-ink text-white px-4 py-2 font-bold uppercase text-sm brutal-border">All</button>
            <button class="bg-white text-kroma-ink px-4 py-2 font-bold uppercase text-sm brutal-border hover:bg-kroma-ink hover:text-white">Apparel</button>
            <button class="bg-white text-kroma-ink px-4 py-2 font-bold uppercase text-sm brutal-border hover:bg-kroma-ink hover:text-white">Accessories</button>
            <button class="bg-white text-kroma-ink px-4 py-2 font-bold uppercase text-sm brutal-border hover:bg-kroma-ink hover:text-white">Print</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div v-for="product in allProducts" :key="product.id" class="group bg-white brutal-border shadow-brutal flex flex-col h-full hover-lift">
                <div class="relative overflow-hidden aspect-square border-b-2 border-kroma-ink bg-gray-100 p-4 flex items-center justify-center">
                    <img v-image-fallback :src="product.image" :alt="product.name" class="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500">
                    <!-- Overlay CTA -->
                    <div class="absolute inset-0 bg-kroma-ink/90 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span class="font-syne font-bold text-white text-xl uppercase border-2 border-white px-6 py-2 transform -rotate-3">Quick View</span>
                    </div>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-syne font-bold text-lg uppercase leading-tight">{{ product.name }}</h3>
                            <span class="font-bold text-kroma-ink whitespace-nowrap ml-2">{{ product.price }}</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-4">{{ product.category }}</p>
                    </div>
                    <button class="w-full bg-kroma-silver text-kroma-ink font-bold uppercase py-3 border-2 border-kroma-ink hover:bg-kroma-ink hover:text-white transition-colors">
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
};

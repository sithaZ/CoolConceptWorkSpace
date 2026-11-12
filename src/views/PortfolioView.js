import { portfolioItems } from '../data/catalog.js';

export default {
    name: "PortfolioView",
    setup() { return { portfolioItems }; },
    template: `
<div class="bg-kroma-bg min-h-screen py-10 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="mb-16 border-b-4 border-kroma-ink pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
                <h1 class="font-syne font-extrabold text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter text-kroma-ink leading-none">Selected<br>Works</h1>
            </div>
            <p class="text-xl max-w-sm font-medium border-l-4 border-kroma-ink pl-4">
                A curated archive of branding, illustration, and merch design for rule-breakers.
            </p>
        </header>

        <!-- Masonry Gallery Simulation (CSS Columns) -->
        <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <div v-for="(project, index) in portfolioItems" :key="index" class="break-inside-avoid relative group cursor-pointer brutal-border bg-white p-2">
                <img v-image-fallback :src="project.image" :alt="project.title" class="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">

                <!-- Hover Overlay -->
                <div class="absolute inset-2 bg-kroma-ink/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                    <span class="text-kroma-silver font-bold text-sm uppercase tracking-widest mb-2">{{ project.category }}</span>
                    <h3 class="font-syne font-extrabold text-2xl text-white uppercase">{{ project.title }}</h3>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
};

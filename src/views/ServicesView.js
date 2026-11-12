import { servicesList } from '../data/catalog.js';

export default {
    name: "ServicesView",
    setup() { return { servicesList }; },
    template: `
<div class="bg-kroma-ink min-h-screen py-10 sm:py-16 text-kroma-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-syne font-extrabold text-4xl sm:text-5xl md:text-5xl sm:text-7xl uppercase tracking-tighter mb-16 text-kroma-silver border-b-2 border-kroma-bg pb-4">Our Arsenal</h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div class="space-y-12">
                <div v-for="service in servicesList" :key="service.id" class="group">
                    <h2 class="font-syne font-bold text-4xl uppercase mb-4 group-hover:text-kroma-silver transition-colors flex items-center gap-4">
                        <span class="text-kroma-silver text-2xl">0{{ service.id }}</span>
                        {{ service.title }}
                    </h2>
                    <p class="text-lg text-gray-400 font-light max-w-md border-l-2 border-kroma-bg pl-4 ml-10 group-hover:border-kroma-ink transition-colors">
                        {{ service.desc }}
                    </p>
                </div>
            </div>

            <!-- Decorative Graphic -->
            <div class="hidden lg:flex items-center justify-center">
                <div class="relative w-full aspect-square">
                    <div class="absolute inset-0 bg-kroma-charcoal brutal-border rounded-full transform translate-x-8 translate-y-8"></div>
                    <div class="absolute inset-0 bg-kroma-silver brutal-border flex items-center justify-center p-12 mix-blend-screen">
                        <h3 class="font-syne font-extrabold text-5xl sm:text-7xl uppercase text-kroma-ink text-center leading-none transform -rotate-12">
                            Make<br>It<br>Pop
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
};

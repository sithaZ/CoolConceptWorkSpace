export default {
    name: "AboutView",
    template: `
<div class="bg-kroma-bg min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <div class="brutal-border w-full aspect-[3/4] relative bg-kroma-silver">
                    <img v-image-fallback src="./assets/images/studio-team.jpg" alt="Studio Team" class="w-full h-full object-cover absolute -top-6 -left-6 brutal-border grayscale hover:grayscale-0 transition-all duration-500">
                </div>
            </div>
            <div>
                <h1 class="font-syne font-extrabold text-4xl sm:text-5xl md:text-5xl sm:text-7xl uppercase tracking-tighter mb-8 text-kroma-ink">Anti-Boring<br>Design.</h1>
                <div class="space-y-6 text-lg font-medium text-gray-800">
                    <p>CoolConcept believes every idea deserves merchandise that feels personal and memorable. We are a multidisciplinary design studio specializing in turning bold concepts into physical reality.</p>
                    <p>From custom-dyed streetwear runs to full-scale festival branding, we bridge the gap between digital illustration and tangible goods. We don't just print your logo on a blank; we engineer a brand experience.</p>
                    <div class="bg-white p-6 brutal-border mt-4">
                        <h3 class="font-syne font-bold uppercase text-xl mb-2 flex items-center gap-2">
                            <svg class="w-6 h-6 text-kroma-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Phnom Penh to Everywhere
                        </h3>
                        <p class="text-base text-gray-600">Proudly based in the heart of Phnom Penh, Cambodia. We offer nationwide delivery service to ensure your custom merch reaches you anywhere in the country.</p>
                    </div>
                </div>
                <div class="mt-12 flex gap-4">
                    <button @click="$router.push('/portfolio')" class="bg-kroma-ink text-white px-8 py-4 font-bold uppercase text-sm brutal-border hover:bg-kroma-charcoal transition-colors">
                        View Archive
                    </button>
                    <button @click="$router.push('/custom-orders')" class="bg-transparent text-kroma-ink px-8 py-4 font-bold uppercase text-sm brutal-border hover:bg-kroma-silver transition-colors">
                        Work With Us
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
};

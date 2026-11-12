const { ref, watch } = Vue;
const { useRoute } = VueRouter;
export default {
    name: 'AppHeader',
    setup() {
        const isMobileMenuOpen = ref(false);
        const route = useRoute();
        watch(() => route.path, () => { isMobileMenuOpen.value = false; });
        const navItems = [
            { path: '/', label: 'Home' },
            { path: '/shop', label: 'Shop' },
            { path: '/portfolio', label: 'Portfolio' },
            { path: '/services', label: 'Services' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
        ];
        return { isMobileMenuOpen, navItems };
    },
    template: `<nav class="fixed top-0 w-full z-50 bg-kroma-bg brutal-border border-t-0 border-l-0 border-r-0 border-b-2">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
            <router-link to="/" class="flex-shrink-0">
                <h1 class="font-syne font-extrabold text-xl sm:text-2xl tracking-tighter uppercase">CoolConcept <img v-image-fallback src="./assets/images/cambodia-flag.svg" alt="Cambodian flag" width="32" height="21" class="inline-block align-middle ml-1 w-7 sm:w-8 h-auto rounded-[2px] border border-black/15" loading="eager"></h1>
            </router-link>

            <!-- Desktop Menu -->
            <div class="hidden xl:flex space-x-1 lg:space-x-4">
                <router-link v-for="nav in navItems" :key="nav.path" 
                        :to="nav.path"
                        :class="[
                            'px-3 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors',
                            $route.path === nav.path ? 'bg-kroma-ink text-kroma-bg' : 'hover:bg-kroma-ink hover:text-white'
                        ]">
                    {{ nav.label }}
                </router-link>
            </div>

            <!-- CTA Button -->
            <div class="hidden xl:block">
                <router-link to="/custom-orders" class="brutal-border px-6 py-2 font-bold uppercase text-sm bg-kroma-ink hover:bg-kroma-cobalt text-white shadow-brutal hover-lift transition-colors">
                    Get a Quote
                </router-link>
            </div>

            <!-- Mobile menu button -->
            <div class="xl:hidden flex items-center">
                <button @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle navigation" :aria-expanded="isMobileMenuOpen" aria-controls="mobile-menu" class="text-kroma-ink hover:text-kroma-charcoal">
                    <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!isMobileMenuOpen" stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        <path v-else stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" v-show="isMobileMenuOpen" class="xl:hidden brutal-border border-l-0 border-r-0 border-t-2 bg-kroma-bg absolute w-full">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <router-link v-for="nav in navItems" :key="nav.path" 
                    :to="nav.path" @click="isMobileMenuOpen = false"
                    class="block px-3 py-4 text-left font-syne font-bold uppercase text-xl border-b-2 border-kroma-ink last:border-b-0 hover:bg-kroma-ink hover:text-white">
                {{ nav.label }}
            </router-link>
            <router-link to="/custom-orders" @click="isMobileMenuOpen = false" class="block w-full text-center mt-4 brutal-border px-6 py-4 font-bold uppercase text-lg bg-kroma-ink hover:bg-kroma-cobalt text-white transition-colors">
                Get a Quote
            </router-link>
        </div>
    </div>
</nav>`,
};

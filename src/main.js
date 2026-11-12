import AppHeader from './components/AppHeader.js';
import AppFooter from './components/AppFooter.js';
import { router } from './router/index.js';
import imageFallback from './directives/imageFallback.js';

Vue.createApp({
    components: { AppHeader, AppFooter },
    template: `
        <div class="min-h-screen flex flex-col">
            <a href="#main-content" @click.prevent="$refs.main.focus()" class="skip-link">Skip to content</a>
            <app-header />
            <main id="main-content" ref="main" tabindex="-1" class="flex-grow pt-20">
                <router-view />
            </main>
            <app-footer />
        </div>
    `,
}).directive('image-fallback', imageFallback).use(router).mount('#app');

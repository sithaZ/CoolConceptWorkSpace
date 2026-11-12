import HomeView from '../views/HomeView.js';
import ShopView from '../views/ShopView.js';
import OrdersView from '../views/OrdersView.js';
import PortfolioView from '../views/PortfolioView.js';
import ServicesView from '../views/ServicesView.js';
import AboutView from '../views/AboutView.js';
import ContactView from '../views/ContactView.js';
import NotFoundView from '../views/NotFoundView.js';
import RequestSentView from '../views/RequestSentView.js';

export const routes = [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/shop', name: 'shop', component: ShopView, meta: { title: 'Shop' } },
    { path: '/custom-orders', name: 'orders', component: OrdersView, meta: { title: 'Request a Quote' } },
    { path: '/orders', redirect: '/custom-orders' },
    { path: '/request-sent', name: 'request-sent', component: RequestSentView, meta: { title: 'Request Submitted' } },
    { path: '/portfolio', name: 'portfolio', component: PortfolioView, meta: { title: 'Portfolio' } },
    { path: '/services', name: 'services', component: ServicesView, meta: { title: 'Services' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Contact' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: 'Page Not Found' } },
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0, left: 0 };
    },
});

router.afterEach((to, from, failure) => {
    if (failure) return;
    document.title = `${to.meta.title || 'Custom Merchandise & Design'} | CoolConcept`;
    if (to.path !== from.path) {
        Vue.nextTick(() => {
            if (!document.querySelector('dialog[open]')) {
                document.querySelector('#main-content')?.focus({ preventScroll: true });
            }
        });
    }
});

import { submissionConfirmed } from '../composables/useQuoteForm.js';
import { inquirySuccessMessage } from '../config/emailjs.js';
import { contact } from '../config/contact.js';
import OrdersView from './OrdersView.js';

export default {
    name: 'RequestSentView',
    components: { OrdersView },
    setup() {
        const dialog = Vue.ref(null);
        const router = VueRouter.useRouter();
        Vue.onMounted(() => {
            if (submissionConfirmed) dialog.value?.showModal();
            else router.replace('/custom-orders');
        });
        function dismiss() { window.location.hash = '/custom-orders'; }
        return { contact, dialog, dismiss, inquirySuccessMessage };
    },
    template: `
        <div>
            <orders-view />
            <dialog ref="dialog" class="thank-you-dialog" aria-labelledby="thank-you-title" aria-describedby="thank-you-description" @close="dismiss">
                <button type="button" class="thank-you-close" aria-label="Close thank-you message" @click="dismiss">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>
                </button>
                <div class="thank-you-symbol" aria-hidden="true">
                    <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="25" stroke="currentColor" stroke-width="3"/><path d="m21 32 7 7 15-16" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <p class="thank-you-eyebrow">A little idea. A great beginning.</p>
                <h1 id="thank-you-title">Thank you!</h1>
                <p class="thank-you-lead">Thank you for supporting CoolConcept.</p>
                <p id="thank-you-description">{{ inquirySuccessMessage }}</p>
                <div class="thank-you-next">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></svg>
                    <p>We'll review your details and reply to your email to discuss your project, pricing, and the next steps.</p>
                </div>
                <p class="thank-you-note">Thanks for trusting us with your next creation.</p>
                <div class="thank-you-actions">
                    <router-link to="/" class="thank-you-primary" autofocus>Back to Home</router-link>
                    <router-link to="/custom-orders" class="thank-you-secondary">Send another request</router-link>
                </div>
                <p class="thank-you-contact">Want to add something? <a :href="'mailto:' + contact.email">Email us</a></p>
            </dialog>
        </div>
    `,
};

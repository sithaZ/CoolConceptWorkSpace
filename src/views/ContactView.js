import InquiryForm from '../components/InquiryForm.js';
import SocialLinks from '../components/SocialLinks.js';
import { contact } from '../config/contact.js';

export default {
    name: "ContactView",
    components: { SocialLinks, InquiryForm },
    setup() { return { contact }; },
    template: `
<div class="bg-kroma-silver min-h-screen py-10 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white brutal-border shadow-[5px_5px_0px_0px_rgba(18,18,18,1)] sm:shadow-[12px_12px_0px_0px_rgba(18,18,18,1)] flex flex-col md:flex-row overflow-hidden">

            <div class="md:w-1/2 p-8 md:p-16 bg-kroma-ink text-kroma-bg flex flex-col justify-center relative overflow-hidden">
                <!-- BG shape -->
                <div class="absolute -right-20 -top-20 w-64 h-64 bg-kroma-charcoal rounded-full mix-blend-screen opacity-50 blur-3xl"></div>

                <h1 class="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter mb-6 relative z-10">Holler At Us.</h1>
                <p class="text-lg text-gray-400 mb-8 relative z-10">Got a wild idea? Need a custom quote? Or just want to say hi? Hit us up on our channels below.</p>

                <div class="space-y-6 relative z-10">
                    <div class="flex items-start gap-4">
                        <div class="bg-kroma-ink p-3 brutal-border mt-1">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <div>
                            <h4 class="font-syne font-bold uppercase text-xl mb-1 text-kroma-silver">HQ Location</h4>
                            <p class="text-gray-300">Phnom Penh, Cambodia</p>
                            <p class="text-sm text-gray-500 mt-1">* Nationwide delivery service everywhere in Cambodia</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <div class="bg-kroma-charcoal p-3 brutal-border mt-1">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <h4 class="font-syne font-bold uppercase text-xl mb-1 text-kroma-silver">Email</h4>
                            <a :href="'mailto:' + contact.email" class="text-gray-300 hover:text-white transition-colors break-all">{{ contact.email }}</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#FFFFFF]">
                <h2 class="font-syne font-bold text-3xl uppercase mb-8 text-kroma-ink">Start Your Project</h2>
                <p class="text-lg mb-6">Tell us what you need, share a reference, and leave your contact details. We will reply by email.</p>
                <router-link to="/custom-orders" class="block text-center bg-kroma-ink text-white brutal-border px-6 py-4 font-bold uppercase shadow-brutal hover-lift mb-8">Send a Project Request &rarr;</router-link>

                <inquiry-form />
                <div class="mt-8"><social-links variant="cards" /></div>
            </div>
        </div>
    </div>
</div>
    `,
};

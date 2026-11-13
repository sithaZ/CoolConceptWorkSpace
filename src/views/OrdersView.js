import InquiryForm from '../components/InquiryForm.js';
import { contact } from '../config/contact.js';

export default {
    name: "OrdersView",
    components: { InquiryForm },
    setup() { return { contact }; },
    template: `
<div class="bg-[#e6e6e6] min-h-screen py-10 sm:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white brutal-border shadow-[5px_5px_0px_0px_rgba(18,18,18,1)] sm:shadow-[12px_12px_0px_0px_rgba(18,18,18,1)] p-5 sm:p-8 md:p-12 relative overflow-hidden">
            <!-- Decor -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-kroma-silver rounded-bl-full brutal-border border-t-0 border-r-0 -mr-2 -mt-2"></div>

            <h1 class="font-syne font-extrabold text-4xl md:text-5xl uppercase tracking-tighter mb-4 relative z-10">Tell Us What You Need</h1>
            <p class="text-gray-600 mb-10 text-lg relative z-10">Have an idea for custom merchandise, branding, or design? Share your requirements below and we will contact you by email to discuss the details.</p>

            <inquiry-form detailed />
            <p class="relative z-10 mt-6 text-sm text-gray-600">Prefer email? <a :href="'mailto:' + contact.email" class="font-bold underline break-all">{{ contact.email }}</a></p>


        </div>
    </div>
</div>
    `,
};

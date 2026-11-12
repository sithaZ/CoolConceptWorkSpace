import { useQuoteForm } from '../composables/useQuoteForm.js';

export default {
    name: "OrdersView",
    setup: useQuoteForm,
    template: `
<div class="bg-[#e6e6e6] min-h-screen py-10 sm:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white brutal-border shadow-[5px_5px_0px_0px_rgba(18,18,18,1)] sm:shadow-[12px_12px_0px_0px_rgba(18,18,18,1)] p-5 sm:p-8 md:p-12 relative overflow-hidden">
            <!-- Decor -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-kroma-silver rounded-bl-full brutal-border border-t-0 border-r-0 -mr-2 -mt-2"></div>

            <h1 class="font-syne font-extrabold text-4xl md:text-5xl uppercase tracking-tighter mb-4 relative z-10">Tell Us What You Need</h1>
            <p class="text-gray-600 mb-10 text-lg relative z-10">Have an idea for custom merchandise, branding, or design? Share your requirements below and we will contact you by email to discuss the details.</p>

            <form :action="contact.formEndpoint" method="POST" enctype="multipart/form-data" @submit="submitForm" :aria-busy="isSubmitting" class="space-y-8 relative z-10">
                <input type="hidden" name="_subject" value="New CoolConcept project request">
                <input type="hidden" name="_template" value="table">
                <input type="hidden" name="_next" :value="returnUrl">
                <input type="hidden" name="_url" :value="formUrl">
                <input type="hidden" name="_captcha" value="true">
                <fieldset class="space-y-8 min-w-0">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Type -->
                    <div>
                        <label for="quote-type" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">What Do You Need? *</label>
                        <select required id="quote-type" name="request_type" v-model="form.type" class="w-full bg-kroma-bg brutal-border p-4 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none">
                            <option value="" disabled>Select category...</option>
                            <option value="tshirt">Custom T-Shirts</option>
                            <option value="tote">Tote Bags</option>
                            <option value="stickers">Die-cut Stickers</option>
                            <option value="mugs">Mugs & Drinkware</option>
                            <option value="packaging">Custom Packaging</option>
                            <option value="branding">Branding / Logo Design</option>
                            <option value="illustration">Illustration / Graphic Design</option>
                            <option value="general">General Inquiry</option>
                            <option value="other">Other / Mixed</option>
                        </select>
                    </div>

                    <!-- Quantity -->
                    <div>
                        <label for="quote-quantity" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Estimated Quantity (optional)</label>
                        <input type="number" id="quote-quantity" name="quantity" v-model="form.quantity" min="1" step="1" placeholder="For merchandise requests" class="w-full bg-kroma-bg brutal-border p-4 font-medium focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none">
                    </div>
                </div>

                <!-- Concept -->
                <div>
                    <label for="quote-concept" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Project Concept / Details *</label>
                    <textarea required id="quote-concept" name="message" maxlength="10000" v-model="form.concept" rows="5" placeholder="Describe the vibe, colors, specific garments, and deadline if you have one..." class="w-full bg-kroma-bg brutal-border p-4 font-medium focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none resize-none"></textarea>
                </div>

                <!-- File Upload -->
                <div class="brutal-border bg-kroma-bg p-8 text-center border-dashed relative hover:bg-white transition-colors">
                    <input id="quote-file" name="attachment" ref="fileInput" type="file" class="block w-full mb-4" aria-label="Reference file" aria-describedby="quote-file-help quote-file-error" @change="handleFileUpload" accept=".png,.jpg,.jpeg,.pdf,.ai,.psd">
                    <svg class="mx-auto h-12 w-12 text-kroma-charcoal mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="font-bold uppercase text-sm text-kroma-ink">Choose a reference file above</p>
                    <p id="quote-file-help" class="text-xs text-gray-500 mt-2">PNG, JPG, PDF, AI, PSD (Max 10MB)</p>
                    <p id="quote-file-error" role="alert" class="text-kroma-ink mt-2">{{ fileError }}</p>

                    <div v-if="form.fileName" class="mt-4 bg-kroma-silver inline-block px-4 py-2 brutal-border text-sm font-bold">
                        Attached: {{ form.fileName }}
                    </div>
                    <button v-if="form.fileName || fileError" type="button" @click="clearFile" class="block mx-auto mt-4 font-bold underline">Remove reference file</button>
                </div>

                <!-- Contact details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t-2 border-kroma-ink">
                    <div>
                        <label for="quote-name" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Your Name *</label>
                        <input required type="text" id="quote-name" name="name" autocomplete="name" maxlength="100" v-model="form.name" class="w-full bg-kroma-bg brutal-border p-4 font-medium focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none">
                    </div>
                    <div>
                        <label for="quote-email" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Email Address *</label>
                        <input required type="email" id="quote-email" name="email" autocomplete="email" maxlength="254" v-model="form.email" class="w-full bg-kroma-bg brutal-border p-4 font-medium focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label for="quote-phone" class="block font-bold uppercase text-sm mb-2">Phone / Telegram (optional)</label>
                        <input id="quote-phone" name="phone_or_telegram" type="text" autocomplete="tel" maxlength="100" v-model="form.phone" placeholder="Phone number or @username" class="w-full bg-kroma-bg brutal-border p-4 rounded-none">
                    </div>
                    <div>
                        <label for="quote-deadline" class="block font-bold uppercase text-sm mb-2">Preferred Deadline (optional)</label>
                        <input id="quote-deadline" name="deadline" type="date" v-model="form.deadline" class="w-full bg-kroma-bg brutal-border p-4 rounded-none">
                    </div>
                </div>
                <div>
                    <label for="quote-budget" class="block font-bold uppercase text-sm mb-2">Budget (optional)</label>
                    <input id="quote-budget" name="budget" type="text" maxlength="100" v-model="form.budget" placeholder="Your estimated budget and currency" class="w-full bg-kroma-bg brutal-border p-4 rounded-none">
                </div>
                <p class="text-sm text-gray-600">Your details and optional attachment will be processed by FormSubmit and emailed to CoolConcept so we can reply. You may be asked to complete a spam check before your request is submitted.</p>
                <p v-if="submitError" role="alert" class="bg-gray-100 border-2 border-kroma-ink p-4 text-kroma-ink">{{ submitError }}</p>
                <!-- Submit -->
                <button type="submit" :disabled="isSubmitting" class="w-full bg-kroma-ink hover:bg-kroma-cobalt transition-colors text-white font-syne font-bold text-2xl uppercase py-6 brutal-border shadow-brutal hover-lift">
                    {{ isSubmitting ? 'Opening secure submission...' : 'Send My Request' }} &rarr;
                </button>
                </fieldset>
            </form>
            <p class="relative z-10 mt-6 text-sm text-gray-600">Prefer email? <a :href="'mailto:' + contact.email" class="font-bold underline break-all">{{ contact.email }}</a></p>


        </div>
    </div>
</div>
    `,
};

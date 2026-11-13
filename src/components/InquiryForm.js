import { useQuoteForm } from '../composables/useQuoteForm.js';

export default {
    name: 'InquiryForm',
    props: { detailed: { type: Boolean, default: false } },
    setup: useQuoteForm,
    template: `
            <form @submit="submitForm" :aria-busy="isSubmitting" class="space-y-8 relative z-10">
                <fieldset :disabled="isSubmitting" class="space-y-8 min-w-0">

                <div :class="detailed ? 'md:grid-cols-2' : 'xl:grid-cols-2'" class="grid grid-cols-1 gap-8">
                    <!-- Type -->
                    <div>
                        <label for="quote-type" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Service Type *</label>
                        <select required id="quote-type" name="request_type" v-model="form.type" class="w-full bg-kroma-bg brutal-border p-4 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none">
                            <option value="" disabled>Select category...</option>
                            <option value="Custom Merchandise">Custom Merchandise</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Branding">Branding</option>
                            <option value="Other">Other</option>
                            <optgroup label="Merchandise details">
                                <option value="Custom Merchandise / Custom T-Shirts">Custom T-Shirts</option>
                                <option value="Custom Merchandise / Tote Bags">Tote Bags</option>
                                <option value="Custom Merchandise / Die-cut Stickers">Die-cut Stickers</option>
                                <option value="Custom Merchandise / Mugs & Drinkware">Mugs & Drinkware</option>
                                <option value="Custom Merchandise / Custom Packaging">Custom Packaging</option>
                            </optgroup>
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

                <!-- Optional quote details -->
                <div v-if="detailed">
                    <label for="quote-reference" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Reference Link (optional)</label>
                    <input id="quote-reference" name="reference_url" type="url" maxlength="2000" v-model="form.referenceUrl" placeholder="https://..." aria-describedby="quote-reference-help" class="w-full bg-kroma-bg brutal-border p-4 rounded-none">
                    <p id="quote-reference-help" class="text-sm text-gray-600 mt-2">Share a link to your artwork, inspiration, or reference folder. Make sure we have permission to view it.</p>
                </div>

                <!-- Contact details -->
                <div :class="detailed ? 'md:grid-cols-2' : 'xl:grid-cols-2'" class="grid grid-cols-1 gap-8 pt-4 border-t-2 border-kroma-ink">
                    <div>
                        <label for="quote-name" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Full Name *</label>
                        <input required type="text" id="quote-name" name="name" autocomplete="name" maxlength="100" v-model="form.name" class="w-full bg-kroma-bg brutal-border p-4 font-medium focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none">
                    </div>
                    <div>
                        <label for="quote-email" class="block font-bold uppercase text-sm mb-2 text-kroma-ink">Email Address *</label>
                        <input required type="email" id="quote-email" name="email" autocomplete="email" maxlength="254" v-model="form.email" class="w-full bg-kroma-bg brutal-border p-4 font-medium focus:outline-none focus:ring-2 focus:ring-kroma-charcoal rounded-none">
                    </div>
                </div>

                <div :class="detailed ? 'md:grid-cols-2' : 'xl:grid-cols-2'" class="grid grid-cols-1 gap-8">
                    <div>
                        <label for="quote-phone" class="block font-bold uppercase text-sm mb-2">Phone / Telegram (optional)</label>
                        <input id="quote-phone" name="phone_or_telegram" type="text" autocomplete="tel" maxlength="100" v-model="form.phone" placeholder="Phone number or @username" class="w-full bg-kroma-bg brutal-border p-4 rounded-none">
                    </div>
                    <div v-if="detailed">
                        <label for="quote-deadline" class="block font-bold uppercase text-sm mb-2">Preferred Deadline (optional)</label>
                        <input id="quote-deadline" name="deadline" type="date" v-model="form.deadline" class="w-full bg-kroma-bg brutal-border p-4 rounded-none">
                    </div>
                </div>
                <div v-if="detailed">
                    <label for="quote-budget" class="block font-bold uppercase text-sm mb-2">Budget (optional)</label>
                    <input id="quote-budget" name="budget" type="text" maxlength="100" v-model="form.budget" placeholder="Your estimated budget and currency" class="w-full bg-kroma-bg brutal-border p-4 rounded-none">
                </div>
                <p class="text-sm text-gray-600">Your inquiry will be sent securely through EmailJS to CoolConcept so we can respond to your project.</p>
                <p v-if="isSubmitting" role="status" aria-live="polite" class="text-sm text-gray-600">Sending your request. Please keep this page open.</p>
                <!-- Submit -->
                <button type="submit" :disabled="isSubmitting" class="w-full bg-kroma-ink hover:bg-kroma-cobalt transition-colors disabled:opacity-60 disabled:cursor-wait text-white font-syne font-bold text-2xl uppercase py-6 brutal-border shadow-brutal hover-lift">
                    {{ isSubmitting ? 'Sending...' : 'Send My Request' }} &rarr;
                </button>
                </fieldset>
                <p role="alert" aria-live="assertive" :class="submitError ? 'bg-gray-100 border-2 border-kroma-ink p-4 text-kroma-ink' : ''">{{ submitError }}</p>
                <p role="status" aria-live="polite" :class="submitSuccess ? 'bg-white border-2 border-kroma-ink p-5 text-kroma-ink font-medium' : ''">{{ submitSuccess }}</p>
            </form>
    `,
};

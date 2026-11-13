import emailjs from '../../assets/vendor/emailjs/index.js';
import { contact } from '../config/contact.js';
import { emailjsConfig, inquirySuccessMessage } from '../config/emailjs.js';

const emptyForm = () => ({ type: '', quantity: '', concept: '', name: '', email: '', phone: '', deadline: '', budget: '', referenceUrl: '' });
// Shared across form instances so changing routes cannot start a second send.
let sending = false;
export let submissionConfirmed = false;

export function useQuoteForm() {
    const { ref, onUnmounted } = Vue;
    const form = ref(emptyForm());
    const isSubmitting = ref(false);
    const submitError = ref('');
    const submitSuccess = ref('');
    let disposed = false;
    onUnmounted(() => { disposed = true; });

    async function submitForm(event) {
        event.preventDefault();
        if (isSubmitting.value) return;
        submitError.value = '';
        submitSuccess.value = '';
        if (sending) {
            submitError.value = 'Your previous request is still sending. Please wait before submitting again.';
            return;
        }
        const values = Object.fromEntries(Object.entries(form.value).map(([key, value]) => [key, String(value).trim()]));
        if (!values.name || !values.concept || !values.email || !values.type) {
            submitError.value = 'Please enter your full name, email, service type, and project details.';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            submitError.value = 'Please enter a valid email address, such as name@example.com.';
            return;
        }
        if (values.quantity && (!Number.isSafeInteger(Number(values.quantity)) || Number(values.quantity) < 1)) {
            submitError.value = 'Please enter a whole quantity of at least 1, or leave it blank.';
            return;
        }
        if (values.referenceUrl) {
            try {
                const url = new URL(values.referenceUrl);
                if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid protocol');
            } catch {
                submitError.value = 'Please use a valid reference link starting with https:// or http://.';
                return;
            }
        }
        if (window.navigator.onLine === false) {
            submitError.value = 'You appear to be offline. Reconnect and send your request again.';
            return;
        }
        const message = [
            `Service type: ${values.type}`,
            `Phone / Telegram: ${values.phone || 'Not provided'}`,
            `Estimated quantity: ${values.quantity || 'Not provided'}`,
            `Preferred deadline: ${values.deadline || 'Not provided'}`,
            `Budget: ${values.budget || 'Not provided'}`,
            `Reference link: ${values.referenceUrl || 'Not provided'}`,
            '', 'Project description:', values.concept,
        ].join('\n');
        isSubmitting.value = true;
        sending = true;
        try {
            const response = await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId,
                { name: values.name, email: values.email, message }, { publicKey: emailjsConfig.publicKey });
            if (response.status !== 200) throw response;
            submissionConfirmed = true;
            if (!disposed) {
                form.value = emptyForm();
                submitSuccess.value = inquirySuccessMessage;
            }
        } catch (error) {
            if (!disposed) submitError.value = error.status === 429
                ? 'Too many requests right now. Please wait a moment and try again, or email us directly.'
                : 'We could not confirm your inquiry was sent. Your details are still here. Please check your connection or email us directly before resending.';
        } finally {
            sending = false;
            isSubmitting.value = false;
        }
    }

    return { form, isSubmitting, submitError, submitSuccess, submitForm, contact };
}

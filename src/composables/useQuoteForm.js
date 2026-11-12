import { contact, requestReturnUrl } from '../config/contact.js';

const emptyForm = () => ({
    type: '', quantity: '', concept: '', name: '', email: '', phone: '',
    deadline: '', budget: '', fileName: '',
});
const allowedExtensions = /\.(png|jpe?g|pdf|ai|psd)$/i;
const maxFileSize = 10 * 1024 * 1024;

export function useQuoteForm() {
    const { ref, onMounted, onUnmounted } = Vue;
    const form = ref(emptyForm());
    const isSubmitting = ref(false);
    const fileError = ref('');
    const fileInput = ref(null);
    const submitError = ref('');
    const returnUrl = requestReturnUrl(window.location.href);
    let recoveryTimer;

    // Restore the submit button when Back restores a cached page.
    function recoverForm() {
        clearTimeout(recoveryTimer);
        isSubmitting.value = false;
    }
    onMounted(() => window.addEventListener('pageshow', recoverForm));
    onUnmounted(() => {
        clearTimeout(recoveryTimer);
        window.removeEventListener('pageshow', recoverForm);
    });

    function handleFileUpload(event) {
        const input = event.target;
        const file = input.files?.[0];
        fileError.value = '';
        form.value.fileName = '';
        if (!file) return;
        if (!allowedExtensions.test(file.name) || file.size > maxFileSize) {
            fileError.value = 'Choose a PNG, JPG, PDF, AI, or PSD file up to 10 MB.';
            input.value = '';
            return;
        }
        form.value.fileName = file.name;
    }

    function clearFile() {
        if (fileInput.value) fileInput.value.value = '';
        form.value.fileName = '';
        fileError.value = '';
    }

    function submitForm(event) {
        submitError.value = '';
        if (isSubmitting.value) {
            event.preventDefault();
            return;
        }
        if (fileError.value) {
            event.preventDefault();
            submitError.value = 'Please fix the reference file before sending.';
            return;
        }
        if (!form.value.name.trim() || !form.value.concept.trim() || !form.value.email.trim() || !form.value.type) {
            event.preventDefault();
            submitError.value = 'Please enter your name, email, request type, and project details.';
            return;
        }
        if (window.navigator.onLine === false) {
            event.preventDefault();
            submitError.value = 'You appear to be offline. Reconnect and send your request again.';
            return;
        }
        // Allow the native multipart POST for attachments and provider CAPTCHA.
        // The provider redirects to confirmation after processing the submission.
        isSubmitting.value = true;
        recoveryTimer = setTimeout(() => {
            isSubmitting.value = false;
            submitError.value = 'If the submission page did not open, try again or email us directly.';
        }, 30000);
    }

    return { form, isSubmitting, fileError, fileInput, clearFile, submitError, handleFileUpload, submitForm, contact, returnUrl };
}

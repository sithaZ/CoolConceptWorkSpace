const fallbackUrl = new URL('../../assets/images/image-unavailable.svg', import.meta.url).href;
const handlers = new WeakMap();

export default {
    mounted(element) {
        const onError = () => {
            element.removeEventListener('error', onError);
            element.src = fallbackUrl;
        };
        handlers.set(element, onError);
        element.addEventListener('error', onError);
        // An eager image can finish loading before its directive is mounted.
        if (element.complete && element.naturalWidth === 0) onError();
    },
    unmounted(element) {
        element.removeEventListener('error', handlers.get(element));
        handlers.delete(element);
    },
};

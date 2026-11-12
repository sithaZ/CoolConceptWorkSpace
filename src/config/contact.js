export const contact = {
    email: 'huothsitha@gmail.com',
    formEndpoint: 'https://formsubmit.co/huothsitha@gmail.com',
};

export function requestReturnUrl(pageUrl) {
    const url = new URL('./index.html', pageUrl);
    url.hash = '/request-sent';
    return url.href;
}

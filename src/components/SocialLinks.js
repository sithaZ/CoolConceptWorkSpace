import { socialProfiles } from '../config/socials.js';

const iconPaths = {
    "telegram": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.11.03-1.88 1.2-5.32 3.52-.5.34-.96.51-1.36.5-.44-.01-1.28-.24-1.91-.44-.77-.25-1.38-.38-1.33-.8.03-.22.34-.45.94-.69 3.68-1.6 6.13-2.65 7.37-3.17 3.5-1.46 4.23-1.71 4.7-1.72.1 0 .34.02.48.13.12.09.15.22.16.33.01.12.01.25 0 .34z",
    "instagram": "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    "facebook": "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.885v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073z"
};

export default {
    name: 'SocialLinks',
    props: { variant: { type: String, default: 'buttons' } },
    setup() { return { socialProfiles, iconPaths }; },
    template: `
        <div class="social-links" :class="'social-links--' + variant" aria-label="Social channels">
            <component v-for="social in socialProfiles" :key="social.id"
                :is="social.url ? 'a' : 'span'"
                :href="social.url || undefined" :target="social.url ? '_blank' : undefined"
                :rel="social.url ? 'noopener noreferrer' : undefined"
                class="social-link" :class="'social-link--' + social.id"
                :title="social.url ? social.description : social.name + ' profile link coming soon'">
                <span class="social-link-icon">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path :d="iconPaths[social.id]" /></svg>
                </span>
                <span class="social-link-copy">
                    <span class="social-link-name">{{ social.name }}</span>
                    <span v-if="variant === 'cards'" class="social-link-description">{{ social.url ? social.description : 'Profile link coming soon' }}</span>
                </span>
                <span v-if="social.url && variant === 'cards'" class="social-link-arrow" aria-hidden="true">&rarr;</span>
            </component>
        </div>
    `,
};

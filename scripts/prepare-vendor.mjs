import { cp, mkdir } from 'node:fs/promises';

// Serve the npm SDK locally without adding a bundler to this static Vue project.
const vendor = new URL('../assets/vendor/emailjs/', import.meta.url);
await mkdir(vendor, { recursive: true });
await cp(new URL('../node_modules/@emailjs/browser/esm/', import.meta.url), vendor, { recursive: true });
await cp(new URL('../node_modules/@emailjs/browser/LICENSE', import.meta.url), new URL('LICENSE', vendor));

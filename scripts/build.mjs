import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, basename } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
// Only replace this project's generated output directory.
if (dirname(output) !== resolve(root) || basename(output) !== 'dist') {
    throw new Error('Unexpected build output directory.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of ['index.html', 'email-test.html', 'src', 'assets']) {
    await cp(resolve(root, entry), resolve(output, entry), { recursive: true });
}
console.log('Built static website in dist/');

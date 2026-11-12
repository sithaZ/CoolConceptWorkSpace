import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 5173);
const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
};

const server = createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end();
        return;
    }
    try {
        const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
        const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
        if (!file.startsWith(root.endsWith(sep) ? root : root + sep) || !types[extname(file)]) {
            response.writeHead(404).end('Not found');
            return;
        }
        const body = await readFile(file);
        response.writeHead(200, { 'Content-Type': types[extname(file)], 'Cache-Control': 'no-store' });
        response.end(request.method === 'HEAD' ? undefined : body);
    } catch (error) {
        response.writeHead(error.code === 'ENOENT' || error.code === 'EISDIR' ? 404 : 400).end('Not found');
    }
});

server.listen(port, '127.0.0.1', () => console.log(`CoolConcept: http://localhost:${port}`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const root = path.resolve('out')
const port = Number(process.env.PORT || 3000)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

async function resolveFile(pathname) {
  const target = path.join(root, decodeURIComponent(pathname))
  if (!target.startsWith(root)) return null
  const info = await stat(target).catch(() => null)
  if (info?.isFile()) return target
  if (info?.isDirectory()) {
    const index = path.join(target, 'index.html')
    if (await stat(index).catch(() => null)) return index
  }
  return null
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost')
  const file = await resolveFile(pathname)
  const body = await readFile(file ?? path.join(root, '404.html'))
  const type = types[path.extname(file ?? '.html')] ?? 'application/octet-stream'
  // Hosting statis mengompresi file teks. Pratinjau menirunya agar ukuran unduhan realistis.
  const compress =
    /charset|svg/.test(type) && /\bgzip\b/.test(request.headers['accept-encoding'] ?? '')
  response.writeHead(file ? 200 : 404, {
    'Content-Type': type,
    ...(compress && { 'Content-Encoding': 'gzip' }),
  })
  response.end(compress ? gzipSync(body) : body)
}).listen(port, () => console.log(`Pratinjau hasil build: http://localhost:${port}`))

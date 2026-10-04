// Menyiapkan salinan CMS yang terisolasi untuk tes browser: database sementara, konten contoh,
// build produksi, lalu server. Data lokal di folder data/ dan media/ tidak disentuh.
import { execSync, spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const port = process.env.PORT || '4174'
const workDir = mkdtempSync(path.join(tmpdir(), 'cms-browser-test-'))
const env = {
  ...process.env,
  CONTENT_SOURCE: 'cms',
  DATABASE_URI: `file:${path.join(workDir, 'cms.db')}`,
  MEDIA_DIR: path.join(workDir, 'media'),
  PAYLOAD_SECRET: 'rahasia-khusus-pengujian',
  NEXT_PUBLIC_SHOWCASE: '',
  NEXT_PUBLIC_SITE_URL: `http://localhost:${port}`,
}

for (const command of [
  'npx payload migrate',
  'npx tsx scripts/import-content.ts',
  'npx next build',
]) {
  execSync(command, { env, stdio: 'inherit' })
}

const server = spawn('npx', ['next', 'start', '-p', port], { env, stdio: 'inherit' })
const stop = () => {
  server.kill()
  rmSync(workDir, { recursive: true, force: true })
  process.exit()
}
process.on('SIGTERM', stop)
process.on('SIGINT', stop)

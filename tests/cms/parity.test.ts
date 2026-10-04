import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, before, test } from 'node:test'
import type { Payload } from 'payload'
import type { ContentSource } from '../../src/content/source'

// Database dan folder gambar sementara, supaya tes tidak menyentuh data lokal.
const workDir = mkdtempSync(path.join(tmpdir(), 'cms-test-'))
process.env.DATABASE_URI = `file:${path.join(workDir, 'cms.db')}`
process.env.MEDIA_DIR = path.join(workDir, 'media')
process.env.PAYLOAD_SECRET = 'rahasia-khusus-pengujian'

let cms: Payload
let fileSource: ContentSource
let payloadSource: ContentSource

before(async () => {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../../src/payload.config')
  const { importContent } = await import('../../src/cms/import-content')
  ;({ fileSource } = await import('../../src/content/file-source'))
  ;({ payloadSource } = await import('../../src/content/payload-source'))
  cms = await getPayload({ config })
  await cms.db.migrate()
  await importContent(cms)
})

after(() => {
  rmSync(workDir, { recursive: true, force: true })
  // Koneksi database Payload menahan proses tetap hidup.
  setImmediate(() => process.exit(process.exitCode ?? 0))
})

/** Gambar berpindah ke CMS, jadi alamat dan ukurannya memang berbeda dari file asal. */
function withoutImageFiles<Value>(value: Value): Value {
  return JSON.parse(
    JSON.stringify(value, (key, entry) =>
      ['src', 'width', 'height'].includes(key) ? undefined : entry,
    ),
  )
}

test('profil dari CMS sama dengan profil dari file', async () => {
  const [fromFile, fromCms] = await Promise.all([
    fileSource.getProfile(),
    payloadSource.getProfile(),
  ])
  assert.deepEqual(withoutImageFiles(fromCms), withoutImageFiles(fromFile))
  assert.match(fromCms.photo.src, /^\/api\/media\/file\//)
  assert.ok(fromCms.photo.width > 0)
})

test('prosedur dari CMS sama dengan prosedur dari file, termasuk isi dan urutannya', async () => {
  const [fromFile, fromCms] = await Promise.all([
    fileSource.getProcedures(),
    payloadSource.getProcedures(),
  ])
  assert.deepEqual(fromCms, fromFile)
})

test('artikel dari CMS sama dengan artikel dari file', async () => {
  const [fromFile, fromCms] = await Promise.all([
    fileSource.getArticles(),
    payloadSource.getArticles(),
  ])
  // Tanggal ubah dikelola CMS, sedangkan file contoh tidak mencantumkannya.
  const comparable = fromCms.map(({ updatedAt: _managedByCms, ...article }) => article)
  assert.deepEqual(withoutImageFiles(comparable), withoutImageFiles(fromFile))
})

test('halaman kebijakan privasi ikut terimpor', async () => {
  const [fromFile, fromCms] = await Promise.all([
    fileSource.getPage('kebijakan-privasi'),
    payloadSource.getPage('kebijakan-privasi'),
  ])
  assert.equal(fromCms?.title, fromFile?.title)
  assert.equal(fromCms?.body, fromFile?.body)
})

test('draf tidak ikut tampil', async () => {
  await cms.create({
    collection: 'procedures',
    data: { title: 'Prosedur Draf', summary: 'Belum terbit.', order: 99, _status: 'draft' },
    draft: true,
  })
  const procedures = await payloadSource.getProcedures()
  assert.ok(!procedures.some((procedure) => procedure.title === 'Prosedur Draf'))
})

test('mengganti alamat prosedur yang sudah terbit membuat pengalihan', async () => {
  const { docs } = await cms.find({
    collection: 'procedures',
    where: { slug: { equals: 'operasi-skoliosis' } },
  })
  await cms.update({
    collection: 'procedures',
    id: docs[0].id,
    data: { slug: 'koreksi-skoliosis' },
  })
  assert.equal(
    await payloadSource.getRedirect('/prosedur/operasi-skoliosis/'),
    '/prosedur/koreksi-skoliosis/',
  )
  assert.equal(
    await payloadSource.getRedirect('/prosedur/operasi-skoliosis'),
    '/prosedur/koreksi-skoliosis/',
  )
  assert.equal(await payloadSource.getRedirect('/tidak-pernah-ada/'), null)
})

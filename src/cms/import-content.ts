import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Payload } from 'payload'
import sharp from 'sharp'
import { fileSource } from '@/content/file-source'
import type { Image } from '@/content/types'
import { markdownToRichText } from './rich-text'

const publicDir = path.join(process.cwd(), 'public')
const contentCollections = ['procedures', 'articles', 'pages', 'media', 'redirects'] as const

/**
 * Memindahkan seluruh isi folder `content/` ke CMS. Dipakai sekali saat klien beralih dari
 * Paket Profil ke Paket Mandiri, sehingga alamat halaman dan isinya tetap sama.
 */
export async function importContent(cms: Payload, { replace = false } = {}) {
  const existing = await cms.count({ collection: 'procedures' })
  if (existing.totalDocs > 0 && !replace) {
    throw new Error('CMS sudah berisi konten. Jalankan dengan --replace untuk menimpanya.')
  }
  for (const collection of contentCollections) {
    await cms.delete({ collection, where: { id: { exists: true } } })
  }

  const uploaded = new Map<string, number>()
  async function upload(image: Image) {
    const cached = uploaded.get(image.src)
    if (cached) return cached

    const source = await readFile(path.join(publicDir, image.src))
    // Ilustrasi contoh berformat SVG, sedangkan CMS hanya menerima foto, jadi diubah ke PNG.
    const isSvg = image.src.endsWith('.svg')
    const data = isSvg ? await sharp(source).png().toBuffer() : source
    const name = path.basename(image.src).replace(/\.svg$/, '.png')
    const media = await cms.create({
      collection: 'media',
      data: { alt: image.alt },
      file: { data, name, size: data.length, mimetype: isSvg ? 'image/png' : mimeType(name) },
    })
    uploaded.set(image.src, media.id)
    return media.id
  }
  const toRichText = (markdown: string) => markdownToRichText(markdown, cms.config)

  const [profile, procedures, articles, privacy] = await Promise.all([
    fileSource.getProfile(),
    fileSource.getProcedures(),
    fileSource.getArticles(),
    fileSource.getPage('kebijakan-privasi'),
  ])

  // SQLite hanya menerima satu penulis, jadi semua penulisan dilakukan berurutan.
  const { bio, photo, videos, instagram, ...profileFields } = profile
  const videoRows = []
  for (const { poster, ...video } of videos) {
    videoRows.push({ ...video, poster: poster && (await upload(poster)) })
  }
  const instagramRows = []
  for (const post of instagram) {
    instagramRows.push({ url: post.url, image: await upload(post.image) })
  }
  await cms.updateGlobal({
    slug: 'profile',
    data: {
      ...profileFields,
      bio: await toRichText(bio),
      photo: await upload(photo),
      videos: videoRows,
      instagram: instagramRows,
    },
  })

  for (const { body, ...procedure } of procedures) {
    await cms.create({
      collection: 'procedures',
      data: { ...procedure, body: await toRichText(body), _status: 'published' },
    })
  }

  for (const { body, image, readingMinutes: _computed, ...article } of articles) {
    await cms.create({
      collection: 'articles',
      data: {
        ...article,
        body: await toRichText(body),
        image: await upload(image),
        _status: 'published',
      },
    })
  }

  if (privacy) {
    const { body, updatedAt: _managedByCms, ...page } = privacy
    await cms.create({ collection: 'pages', data: { ...page, body: await toRichText(body) } })
  }

  return {
    procedures: procedures.length,
    articles: articles.length,
    pages: privacy ? 1 : 0,
    images: uploaded.size,
  }
}

function mimeType(fileName: string) {
  const extension = path.extname(fileName).slice(1).toLowerCase()
  return extension === 'jpg' ? 'image/jpeg' : `image/${extension}`
}

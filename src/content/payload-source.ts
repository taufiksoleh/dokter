import { cache } from 'react'
import type { z } from 'zod'
import { getCms } from '@/cms/client'
import type { Media } from '@/cms/payload-types'
import { richTextToMarkdown } from '@/cms/rich-text'
import { readingMinutes } from './markdown'
import { articleSchema, pageSchema, procedureSchema, profileSchema } from './schema'
import type { ContentSource } from './source'

const published = { _status: { equals: 'published' } } as const

function toImage(media: number | Media | null | undefined) {
  if (!media || typeof media === 'number' || !media.url) return undefined
  return { src: media.url, alt: media.alt, width: media.width ?? 0, height: media.height ?? 0 }
}

const isEmptyObject = (value: unknown) =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.keys(value).length === 0

/**
 * Payload menyimpan field kosong sebagai null dan grup kosong sebagai objek kosong,
 * sedangkan skema konten menganggap keduanya tidak ada.
 */
function withoutEmpty(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutEmpty)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, entry]) => [key, withoutEmpty(entry)] as const)
        .filter(([, entry]) => entry !== null && !isEmptyObject(entry)),
    )
  }
  return value
}

/** Memastikan data dari CMS berbentuk sama persis dengan data dari file. */
function toDto<Output>(schema: z.ZodType<Output>, data: unknown, label: string): Output {
  const result = schema.safeParse(withoutEmpty(data))
  if (!result.success) {
    throw new Error(`${label} di panel admin belum lengkap: ${result.error.message}`)
  }
  return result.data
}

const getProfile = cache(async () => {
  const cms = await getCms()
  const profile = await cms.findGlobal({ slug: 'profile', depth: 1 })
  const data = toDto(
    profileSchema,
    {
      ...profile,
      photo: toImage(profile.photo),
      highlights: profile.highlights ?? [],
      education: profile.education ?? [],
      training: profile.training ?? [],
      memberships: profile.memberships ?? [],
      socials: profile.socials ?? [],
      videos: (profile.videos ?? []).map((video) => ({ ...video, poster: toImage(video.poster) })),
      instagram: (profile.instagram ?? []).map((post) => ({ ...post, image: toImage(post.image) })),
    },
    'Profil dokter',
  )
  return { ...data, bio: await richTextToMarkdown(profile.bio, cms.config) }
})

const getProcedures = cache(async () => {
  const cms = await getCms()
  const { docs } = await cms.find({
    collection: 'procedures',
    where: published,
    sort: 'order',
    pagination: false,
    depth: 0,
  })
  return Promise.all(
    docs.map(async (doc) => ({
      ...toDto(
        procedureSchema,
        { ...doc, facts: doc.facts ?? [], faqs: doc.faqs ?? [] },
        `Prosedur "${doc.title}"`,
      ),
      slug: doc.slug,
      body: await richTextToMarkdown(doc.body, cms.config),
    })),
  )
})

const getArticles = cache(async () => {
  const cms = await getCms()
  const { docs } = await cms.find({
    collection: 'articles',
    where: published,
    sort: '-publishedAt',
    pagination: false,
    depth: 1,
  })
  return Promise.all(
    docs.map(async (doc) => {
      const body = await richTextToMarkdown(doc.body, cms.config)
      return {
        ...toDto(
          articleSchema,
          { ...doc, image: toImage(doc.image), tags: doc.tags ?? [] },
          `Artikel "${doc.title}"`,
        ),
        slug: doc.slug,
        body,
        readingMinutes: readingMinutes(body),
      }
    }),
  )
})

const getPages = cache(async () => {
  const cms = await getCms()
  const { docs } = await cms.find({ collection: 'pages', pagination: false, depth: 0 })
  return Promise.all(
    docs.map(async (doc) => ({
      ...toDto(pageSchema, doc, `Halaman "${doc.title}"`),
      slug: doc.slug,
      body: await richTextToMarkdown(doc.body, cms.config),
    })),
  )
})

async function getRedirect(path: string) {
  const cms = await getCms()
  const withSlash = path.endsWith('/') ? path : `${path}/`
  const { docs } = await cms.find({
    collection: 'redirects',
    where: { from: { in: [withSlash, withSlash.slice(0, -1)] } },
    limit: 1,
    depth: 0,
  })
  return docs[0]?.to ?? null
}

/** Sumber konten Paket Mandiri: Payload CMS, dibaca lewat local API tanpa permintaan HTTP. */
export const payloadSource: ContentSource = {
  getProfile,
  getProcedures,
  getArticles,
  getProcedure: async (slug) => (await getProcedures()).find((item) => item.slug === slug) ?? null,
  getArticle: async (slug) => (await getArticles()).find((item) => item.slug === slug) ?? null,
  getPage: async (slug) => (await getPages()).find((item) => item.slug === slug) ?? null,
  getRedirect,
}

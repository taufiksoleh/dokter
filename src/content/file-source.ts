import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import type { z } from 'zod'
import { parseDocument, readingMinutes } from './markdown'
import { articleSchema, pageSchema, procedureSchema, profileSchema } from './schema'
import type { ContentSource } from './source'

const contentDir = path.join(process.cwd(), 'content')

async function readDocument<Output extends object>(file: string, schema: z.ZodType<Output>) {
  const raw = await readFile(path.join(contentDir, file), 'utf8')
  return parseDocument(raw, schema, `content/${file}`)
}

async function readCollection<Output extends object>(folder: string, schema: z.ZodType<Output>) {
  const files = (await readdir(path.join(contentDir, folder))).filter((file) =>
    file.endsWith('.md'),
  )
  return Promise.all(
    files.map(async (file) => {
      const { data, body } = await readDocument(`${folder}/${file}`, schema)
      return { ...data, slug: file.replace(/\.md$/, ''), body }
    }),
  )
}

const getProfile = cache(async () => {
  const { data, body } = await readDocument('profile.md', profileSchema)
  return { ...data, bio: body }
})

const getProcedures = cache(async () => {
  const procedures = await readCollection('procedures', procedureSchema)
  return procedures.sort((a, b) => a.order - b.order)
})

const getArticles = cache(async () => {
  const articles = await readCollection('articles', articleSchema)
  return articles
    .map((article) => ({ ...article, readingMinutes: readingMinutes(article.body) }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
})

const getPages = cache(() => readCollection('pages', pageSchema))

/** Sumber konten Paket Profil: file Markdown di folder `content/`, dibaca saat build. */
export const fileSource: ContentSource = {
  getProfile,
  getProcedures,
  getArticles,
  getProcedure: async (slug) => (await getProcedures()).find((item) => item.slug === slug) ?? null,
  getArticle: async (slug) => (await getArticles()).find((item) => item.slug === slug) ?? null,
  getPage: async (slug) => (await getPages()).find((item) => item.slug === slug) ?? null,
  // Website statis tidak punya daftar pengalihan. Alamat yang berubah diatur di hosting.
  getRedirect: async () => null,
}

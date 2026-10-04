import type { ContentSource } from './source'

/**
 * Satu-satunya tempat sumber konten dipilih. CONTENT_SOURCE disisipkan saat build oleh
 * next.config.mjs, sehingga hanya salah satu modul di bawah yang ikut dibundel.
 */
const source: Promise<ContentSource> =
  process.env.CONTENT_SOURCE === 'cms'
    ? import('./payload-source').then((module) => module.payloadSource)
    : import('./file-source').then((module) => module.fileSource)

export const content: ContentSource = {
  getProfile: async () => (await source).getProfile(),
  getProcedures: async () => (await source).getProcedures(),
  getProcedure: async (slug) => (await source).getProcedure(slug),
  getArticles: async () => (await source).getArticles(),
  getArticle: async (slug) => (await source).getArticle(slug),
  getPage: async (slug) => (await source).getPage(slug),
  getRedirect: async (path) => (await source).getRedirect(path),
}

export type * from './types'

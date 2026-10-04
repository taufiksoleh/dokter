import type { Article, Page, Procedure, Profile } from './types'

/**
 * Kontrak antara tampilan dan tempat konten disimpan. Halaman dan komponen hanya mengenal
 * antarmuka ini, sehingga sumber konten bisa diganti dari file ke CMS tanpa mengubah tampilan.
 */
export interface ContentSource {
  getProfile(): Promise<Profile>
  /** Terurut menurut `order`. */
  getProcedures(): Promise<Procedure[]>
  getProcedure(slug: string): Promise<Procedure | null>
  /** Terurut dari yang terbaru. */
  getArticles(): Promise<Article[]>
  getArticle(slug: string): Promise<Article | null>
  getPage(slug: string): Promise<Page | null>
  /** Alamat tujuan bila `path` pernah dipindahkan, atau null. */
  getRedirect(path: string): Promise<string | null>
}

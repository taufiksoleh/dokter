import type { MetadataRoute } from 'next'
import { content } from '@/content'
import { absoluteUrl, isShowcase, routes } from '@/lib/site'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dalam mode etalase hanya halaman paket yang diindeks, karena isi website contoh fiktif.
  if (isShowcase) return [{ url: absoluteUrl(routes.pricing) }]

  const [procedures, articles] = await Promise.all([content.getProcedures(), content.getArticles()])
  const staticPaths = [
    routes.home,
    routes.about,
    routes.procedures,
    routes.articles,
    routes.contact,
    routes.links,
    routes.privacy,
  ]

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...procedures.map(({ slug }) => ({ url: absoluteUrl(routes.procedure(slug)) })),
    ...articles.map((article) => ({
      url: absoluteUrl(routes.article(article.slug)),
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ]
}

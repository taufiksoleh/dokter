import { content } from '@/content'
import { PageIntro } from '@/components/content/PageIntro'
import { ArticleGrid } from '@/components/sections/ArticleGrid'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'

const title = 'Artikel'
const description =
  'Tulisan singkat tentang keluhan tulang belakang yang sering ditanyakan pasien di ruang praktik.'

export const metadata = pageMetadata({ title, description, path: routes.articles })

export default async function ArticlesPage() {
  const articles = await content.getArticles()

  return (
    <>
      <PageIntro
        breadcrumb={[{ name: title, path: routes.articles }]}
        eyebrow="Artikel"
        title="Tulisan untuk pasien"
        description={description}
      />
      <section className="container section">
        <ArticleGrid articles={articles} headingLevel="h2" />
      </section>
    </>
  )
}

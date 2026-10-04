import type { Metadata } from 'next'
import { content } from '@/content'
import { extractHeadings } from '@/content/markdown'
import { DetailLayout } from '@/components/content/DetailLayout'
import { MedicalNote } from '@/components/content/MedicalNote'
import { PageIntro } from '@/components/content/PageIntro'
import { Prose } from '@/components/content/Prose'
import { ArticleGrid } from '@/components/sections/ArticleGrid'
import { ConsultBand } from '@/components/sections/ConsultBand'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { formatDate } from '@/lib/format'
import { redirectOrNotFound } from '@/lib/missing'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'
import { articleSchema } from '@/lib/structured-data'
import styles from './page.module.css'

const OTHER_ARTICLE_COUNT = 3

type ArticlePageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const articles = await content.getArticles()
  return articles.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await content.getArticle(slug)
  if (!article) return {}
  return pageMetadata({
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.summary,
    path: routes.article(slug),
    image: article.image,
    type: 'article',
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const [profile, article, articles] = await Promise.all([
    content.getProfile(),
    content.getArticle(slug),
    content.getArticles(),
  ])
  if (!article) return redirectOrNotFound(routes.article(slug))

  const others = articles.filter((item) => item.slug !== slug).slice(0, OTHER_ARTICLE_COUNT)

  return (
    <>
      <PageIntro
        breadcrumb={[
          { name: 'Artikel', path: routes.articles },
          { name: article.title, path: routes.article(slug) },
        ]}
        eyebrow={article.tags[0]}
        title={article.title}
        description={article.summary}
      >
        <p className={styles.meta}>
          <span>Ditulis oleh {profile.name}</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span>{article.readingMinutes} menit baca</span>
        </p>
      </PageIntro>

      <div className={`container ${styles.cover}`}>
        <img
          src={article.image.src}
          alt={article.image.alt}
          width={article.image.width}
          height={article.image.height}
        />
      </div>

      <DetailLayout headings={extractHeadings(article.body)}>
        <Prose markdown={article.body} />
        <MedicalNote />
      </DetailLayout>

      <ConsultBand whatsapp={profile.whatsapp} />

      {others.length > 0 && (
        <section className="container section">
          <SectionHeader
            eyebrow="Artikel lain"
            title="Bacaan berikutnya"
            link={{ href: routes.articles, label: 'Semua artikel' }}
          />
          <ArticleGrid articles={others} />
        </section>
      )}

      <JsonLd data={articleSchema(article, profile)} />
    </>
  )
}

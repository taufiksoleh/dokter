import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { content } from '@/content'
import { PageIntro } from '@/components/content/PageIntro'
import { Prose } from '@/components/content/Prose'
import { formatDate } from '@/lib/format'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'

const SLUG = 'kebijakan-privasi'

export async function generateMetadata(): Promise<Metadata> {
  const page = await content.getPage(SLUG)
  if (!page) return {}
  return pageMetadata({ title: page.title, description: page.summary, path: routes.privacy })
}

export default async function PrivacyPage() {
  const page = await content.getPage(SLUG)
  if (!page) notFound()

  return (
    <>
      <PageIntro
        breadcrumb={[{ name: page.title, path: routes.privacy }]}
        title={page.title}
        description={page.summary}
      />
      <div className="container section">
        <Prose markdown={page.body} />
        <p className="caption">Diperbarui {formatDate(page.updatedAt)}</p>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import { content } from '@/content'
import { extractHeadings } from '@/content/markdown'
import { DetailLayout } from '@/components/content/DetailLayout'
import { FactGrid } from '@/components/content/FactGrid'
import { FaqList } from '@/components/content/FaqList'
import { MedicalNote } from '@/components/content/MedicalNote'
import { PageIntro } from '@/components/content/PageIntro'
import { Prose } from '@/components/content/Prose'
import { ConsultBand } from '@/components/sections/ConsultBand'
import { ProcedureList } from '@/components/sections/ProcedureList'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { redirectOrNotFound } from '@/lib/missing'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'
import { procedureSchema } from '@/lib/structured-data'

const OTHER_PROCEDURE_COUNT = 4

type ProcedurePageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const procedures = await content.getProcedures()
  return procedures.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProcedurePageProps): Promise<Metadata> {
  const { slug } = await params
  const procedure = await content.getProcedure(slug)
  if (!procedure) return {}
  return pageMetadata({
    title: procedure.seo?.title ?? procedure.title,
    description: procedure.seo?.description ?? procedure.summary,
    path: routes.procedure(slug),
  })
}

export default async function ProcedurePage({ params }: ProcedurePageProps) {
  const { slug } = await params
  const [profile, procedure, procedures] = await Promise.all([
    content.getProfile(),
    content.getProcedure(slug),
    content.getProcedures(),
  ])
  if (!procedure) return redirectOrNotFound(routes.procedure(slug))

  const others = procedures.filter((item) => item.slug !== slug).slice(0, OTHER_PROCEDURE_COUNT)

  return (
    <>
      <PageIntro
        breadcrumb={[
          { name: 'Prosedur', path: routes.procedures },
          { name: procedure.title, path: routes.procedure(slug) },
        ]}
        eyebrow="Prosedur"
        title={procedure.title}
        description={procedure.summary}
      >
        <FactGrid facts={procedure.facts} />
      </PageIntro>

      <DetailLayout headings={extractHeadings(procedure.body)}>
        <Prose markdown={procedure.body} />
        <FaqList faqs={procedure.faqs} />
        <MedicalNote />
      </DetailLayout>

      <ConsultBand
        whatsapp={profile.whatsapp}
        topic={procedure.title}
        title="Ingin menanyakan tindakan ini?"
      />

      {others.length > 0 && (
        <section className="container section">
          <SectionHeader
            eyebrow="Prosedur lain"
            title="Tindakan lain yang ditangani"
            link={{ href: routes.procedures, label: 'Semua prosedur' }}
          />
          <ProcedureList procedures={others} />
        </section>
      )}

      <JsonLd data={procedureSchema(procedure)} />
    </>
  )
}

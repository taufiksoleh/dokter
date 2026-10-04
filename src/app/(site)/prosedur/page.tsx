import { content } from '@/content'
import { PageIntro } from '@/components/content/PageIntro'
import { ConsultBand } from '@/components/sections/ConsultBand'
import { ProcedureList } from '@/components/sections/ProcedureList'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'

const title = 'Prosedur'
const description =
  'Penjelasan tiap tindakan yang ditangani, mulai dari untuk siapa tindakan ditujukan sampai masa pemulihannya.'

export const metadata = pageMetadata({ title, description, path: routes.procedures })

export default async function ProceduresPage() {
  const [profile, procedures] = await Promise.all([content.getProfile(), content.getProcedures()])

  return (
    <>
      <PageIntro
        breadcrumb={[{ name: title, path: routes.procedures }]}
        eyebrow="Prosedur"
        title="Tindakan yang ditangani"
        description={description}
      />
      <section className="container section">
        <ProcedureList procedures={procedures} headingLevel="h2" />
      </section>
      <ConsultBand whatsapp={profile.whatsapp} />
    </>
  )
}

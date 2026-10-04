import { content } from '@/content'
import { PageIntro } from '@/components/content/PageIntro'
import { PracticeList } from '@/components/sections/PracticeList'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'
import styles from './page.module.css'

const title = 'Kontak dan jadwal praktik'
const description =
  'Untuk membuat janji, kirim pesan lewat WhatsApp. Sebutkan nama, keluhan singkat, dan tempat praktik yang Anda pilih.'

export const metadata = pageMetadata({ title, description, path: routes.contact })

export default async function ContactPage() {
  const profile = await content.getProfile()

  return (
    <>
      <PageIntro
        breadcrumb={[{ name: 'Kontak', path: routes.contact }]}
        eyebrow="Kontak"
        title={title}
        description={description}
      >
        <div className={styles.actions}>
          <WhatsAppLink whatsapp={profile.whatsapp} />
          <SocialLinks socials={profile.socials} />
        </div>
      </PageIntro>

      <section className="container section">
        <PracticeList practices={profile.practices} />
      </section>
    </>
  )
}

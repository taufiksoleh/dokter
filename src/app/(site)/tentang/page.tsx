import { content } from '@/content'
import { CredentialList } from '@/components/content/CredentialList'
import { PageIntro } from '@/components/content/PageIntro'
import { Prose } from '@/components/content/Prose'
import { ConsultBand } from '@/components/sections/ConsultBand'
import { PracticeList } from '@/components/sections/PracticeList'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'
import { personSchema } from '@/lib/structured-data'
import styles from './page.module.css'

const title = 'Tentang'

export async function generateMetadata() {
  const profile = await content.getProfile()
  return pageMetadata({
    title,
    description: `Pendidikan, pelatihan, bidang keahlian, dan tempat praktik ${profile.name}.`,
    path: routes.about,
    image: profile.photo,
    type: 'profile',
  })
}

export default async function AboutPage() {
  const profile = await content.getProfile()

  return (
    <>
      <PageIntro
        breadcrumb={[{ name: title, path: routes.about }]}
        eyebrow="Tentang"
        title={profile.name}
        description={profile.title}
      />

      <div className={`container section ${styles.story}`}>
        <div className={styles.photo}>
          <img
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={profile.photo.width}
            height={profile.photo.height}
          />
        </div>
        <div className={styles.bio}>
          <Prose markdown={profile.bio} />
          <div>
            <h2 className={styles.subheading}>Bidang yang ditangani</h2>
            <ul className={styles.tags}>
              {profile.expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className={`container section ${styles.credentials}`}>
        <CredentialList title="Pendidikan" items={profile.education} />
        <CredentialList title="Pelatihan lanjutan" items={profile.training} />
        {profile.memberships.length > 0 && (
          <div>
            <h2 className={styles.subheading}>Keanggotaan organisasi</h2>
            <ul className={styles.tags}>
              {profile.memberships.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="Tempat praktik"
          title="Jadwal dan lokasi praktik"
          link={{ href: routes.contact, label: 'Kontak dan peta' }}
        />
        <PracticeList practices={profile.practices} />
      </section>

      <ConsultBand whatsapp={profile.whatsapp} />
      <JsonLd data={personSchema(profile)} />
    </>
  )
}

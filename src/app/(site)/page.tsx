import type { Metadata } from 'next'
import { content } from '@/content'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { ArticleGrid } from '@/components/sections/ArticleGrid'
import { ConsultBand } from '@/components/sections/ConsultBand'
import { Hero } from '@/components/sections/Hero'
import { InstagramGrid } from '@/components/sections/InstagramGrid'
import { PracticeList } from '@/components/sections/PracticeList'
import { ProcedureList } from '@/components/sections/ProcedureList'
import { VideoGrid } from '@/components/sections/VideoGrid'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/lib/site'
import { personSchema } from '@/lib/structured-data'
import { getLatestVideos } from '@/lib/youtube'

const HOME_ARTICLE_COUNT = 3

export const metadata: Metadata = { alternates: { canonical: routes.home } }

export default async function HomePage() {
  const [profile, procedures, articles] = await Promise.all([
    content.getProfile(),
    content.getProcedures(),
    content.getArticles(),
  ])
  const videos = await getLatestVideos(profile.youtubeChannelId, profile.videos)
  const instagram = profile.socials.find((social) => social.platform === 'instagram')
  const youtube = profile.socials.find((social) => social.platform === 'youtube')

  return (
    <>
      <Hero profile={profile} />

      <section className="container section">
        <SectionHeader
          eyebrow="Tempat praktik"
          title="Jadwal dan lokasi praktik"
          link={{ href: routes.contact, label: 'Kontak dan peta' }}
        />
        <PracticeList practices={profile.practices} />
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="Prosedur"
          title="Tindakan yang ditangani"
          description="Setiap halaman menjelaskan untuk siapa tindakan ditujukan, tahapannya, masa pemulihan, dan risikonya."
          link={{ href: routes.procedures, label: 'Semua prosedur' }}
        />
        <ProcedureList procedures={procedures} />
      </section>

      <AboutTeaser profile={profile} />

      {videos.length > 0 && (
        <section className="container section">
          <SectionHeader
            eyebrow="Video"
            title="Penjelasan dalam video"
            link={youtube && { href: youtube.url, label: 'Buka channel YouTube', external: true }}
          />
          <VideoGrid videos={videos} />
        </section>
      )}

      {articles.length > 0 && (
        <section className="container section">
          <SectionHeader
            eyebrow="Artikel"
            title="Tulisan terbaru"
            link={{ href: routes.articles, label: 'Semua artikel' }}
          />
          <ArticleGrid articles={articles.slice(0, HOME_ARTICLE_COUNT)} />
        </section>
      )}

      {profile.instagram.length > 0 && (
        <section className="container section">
          <SectionHeader
            eyebrow="Instagram"
            title="Edukasi singkat di Instagram"
            link={
              instagram && {
                href: instagram.url,
                label: `Ikuti ${instagram.handle}`,
                external: true,
              }
            }
          />
          <InstagramGrid posts={profile.instagram} />
        </section>
      )}

      <ConsultBand whatsapp={profile.whatsapp} />
      <JsonLd data={personSchema(profile)} />
    </>
  )
}

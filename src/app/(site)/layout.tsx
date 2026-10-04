import type { Metadata, Viewport } from 'next'
import { content } from '@/content'
import { BottomNav } from '@/components/layout/BottomNav'
import { Document } from '@/components/layout/Document'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ShowcaseBar } from '@/components/layout/ShowcaseBar'
import { isShowcase, showcaseShareImage, siteUrl } from '@/lib/site'

// Halaman boleh memakai seluruh layar, sehingga navigasi bawah bisa memberi ruang
// untuk garis beranda lewat env(safe-area-inset-bottom).
export const viewport: Viewport = { viewportFit: 'cover' }

export async function generateMetadata(): Promise<Metadata> {
  const profile = await content.getProfile()
  const shareImage = isShowcase ? showcaseShareImage : profile.photo
  return {
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      images: [{ url: shareImage.src, alt: shareImage.alt }],
    },
    twitter: { card: 'summary_large_image' },
    icons: '/favicon.svg',
    title: { default: `${profile.name} | ${profile.title}`, template: `%s | ${profile.shortName}` },
    description: profile.summary,
    // Website contoh berisi dokter fiktif, jadi tidak perlu muncul di hasil pencarian.
    robots: isShowcase ? { index: false, follow: true } : undefined,
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await content.getProfile()

  return (
    <Document>
      <a className="skip" href="#main">
        Lewati ke konten
      </a>
      {isShowcase && <ShowcaseBar />}
      <Header profile={profile} />
      <BottomNav />
      <main id="main">{children}</main>
      <Footer profile={profile} />
      <FloatingWhatsApp whatsapp={profile.whatsapp} />
    </Document>
  )
}

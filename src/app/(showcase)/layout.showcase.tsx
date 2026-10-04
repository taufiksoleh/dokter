import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Document } from '@/components/layout/Document'
import { routes, siteUrl } from '@/lib/site'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { vendor } from '@/showcase/vendor'
import styles from './layout.module.css'

export const metadata: Metadata = { metadataBase: new URL(siteUrl), icons: '/favicon.svg' }

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  const whatsappUrl = buildWhatsAppUrl({
    phone: vendor.whatsapp,
    message: 'Halo, saya ingin bertanya tentang paket website profil dokter.',
  })

  return (
    <Document>
      <a className="skip" href="#main">
        Lewati ke konten
      </a>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link href={routes.pricing} className={styles.brand}>
            {vendor.name}
          </Link>
          <Link href={routes.home} className={styles.demo}>
            Website contoh
          </Link>
          <a
            className="button is-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            Tanya
          </a>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className={styles.footer}>
        <div className="container">
          © {new Date().getFullYear()} {vendor.name}. Nama dokter dan isi pada website contoh
          bersifat fiktif.
        </div>
      </footer>
    </Document>
  )
}

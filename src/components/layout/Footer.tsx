import Link from 'next/link'
import type { Profile } from '@/content'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { routes } from '@/lib/site'
import styles from './Footer.module.css'

const navigation = [
  { href: routes.about, label: 'Tentang' },
  { href: routes.procedures, label: 'Prosedur' },
  { href: routes.articles, label: 'Artikel' },
  { href: routes.contact, label: 'Kontak dan jadwal' },
  { href: routes.links, label: 'Tautan resmi' },
]

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.identity}>
          <p className={styles.name}>{profile.name}</p>
          <p className="muted">{profile.title}</p>
          <SocialLinks socials={profile.socials} />
        </div>

        <nav aria-label="Menu kaki halaman">
          <h2 className={styles.heading}>Menu</h2>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Tempat praktik</h2>
          <ul className={styles.list}>
            {profile.practices.map((practice) => (
              <li key={practice.name}>
                {practice.name}
                <span className={styles.city}>{practice.city}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          Informasi di website ini bersifat umum dan tidak menggantikan pemeriksaan langsung oleh
          dokter.
        </p>
        <p>
          © {new Date().getFullYear()} {profile.shortName}.{' '}
          <Link href={routes.privacy}>Kebijakan Privasi</Link>
        </p>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import type { Profile } from '@/content'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { routes } from '@/lib/site'
import { primaryNavigation } from './navigation'
import styles from './Header.module.css'

/** Di ponsel header hanya menampilkan nama. Menunya ada di navigasi bawah (BottomNav). */
export function Header({ profile }: { profile: Profile }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href={routes.home} className={styles.brand}>
          <span className={styles.brandName}>{profile.shortName}</span>
          <span className={styles.brandTitle}>{profile.title}</span>
        </Link>

        <nav aria-label="Menu utama" className={styles.nav}>
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <WhatsAppLink
          whatsapp={profile.whatsapp}
          label="Konsultasi"
          className={`button is-whatsapp ${styles.cta}`}
        />
      </div>
    </header>
  )
}

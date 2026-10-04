import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { routes } from '@/lib/site'
import styles from './ShowcaseBar.module.css'

/** Penanda bahwa website yang sedang dilihat adalah contoh, dengan jalan pintas ke paket harga. */
export function ShowcaseBar() {
  return (
    <aside className={styles.bar} aria-label="Keterangan website contoh">
      <div className={`container ${styles.inner}`}>
        <p>Ini website contoh. Nama dokter dan isinya fiktif.</p>
        <Link href={routes.pricing} className={styles.link}>
          Lihat paket harga
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}

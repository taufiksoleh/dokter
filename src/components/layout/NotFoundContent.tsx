import Link from 'next/link'
import { routes } from '@/lib/site'
import styles from './NotFoundContent.module.css'

export function NotFoundContent() {
  return (
    <div className={`container ${styles.page}`}>
      <p className="eyebrow">404</p>
      <h1 className={styles.title}>Halaman tidak ditemukan</h1>
      <p className="lede">Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.</p>
      <Link href={routes.home} className="button">
        Kembali ke beranda
      </Link>
    </div>
  )
}

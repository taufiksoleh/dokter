import type { ReactNode } from 'react'
import type { Heading } from '@/content/markdown'
import styles from './DetailLayout.module.css'

type DetailLayoutProps = {
  headings: Heading[]
  children: ReactNode
}

/** Halaman detail dua kolom: daftar isi berbentuk ruas tulang belakang di kiri, isi di kanan. */
export function DetailLayout({ headings, children }: DetailLayoutProps) {
  return (
    <div className={`container ${styles.layout}`}>
      {headings.length > 1 && (
        <nav aria-label="Daftar isi" className={styles.rail}>
          <p className={styles.railTitle}>Di halaman ini</p>
          <ol className={styles.toc}>
            {headings.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Breadcrumb } from './Breadcrumb'
import styles from './PageIntro.module.css'

type PageIntroProps = {
  breadcrumb: { name: string; path: string }[]
  eyebrow?: string
  title: string
  description?: string
  /** Isi tambahan di bawah deskripsi, misalnya tombol atau tanggal terbit. */
  children?: ReactNode
}

export function PageIntro({ breadcrumb, eyebrow, title, description, children }: PageIntroProps) {
  return (
    <header className={`container ${styles.intro}`}>
      <Breadcrumb items={breadcrumb} />
      {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={`lede ${styles.description}`}>{description}</p>}
      {children}
    </header>
  )
}

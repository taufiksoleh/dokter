import type { Credential } from '@/content'
import styles from './CredentialList.module.css'

type CredentialListProps = { title: string; items: Credential[] }

export function CredentialList({ title, items }: CredentialListProps) {
  if (!items.length) return null

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={`${item.period}-${item.title}`}>
            <span className={styles.period}>{item.period}</span>
            <span>
              <strong>{item.title}</strong>
              <span className={styles.institution}>{item.institution}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  link?: { href: string; label: string; external?: boolean }
}

export function SectionHeader({ eyebrow, title, description, link }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {link &&
        (link.external ? (
          <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
            <ArrowRight aria-hidden="true" />
          </a>
        ) : (
          <Link className="text-link" href={link.href}>
            {link.label}
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
    </div>
  )
}

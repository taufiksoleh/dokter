import { Check } from 'lucide-react'
import styles from './PlanCard.module.css'

type PlanCardProps = {
  name: string
  audience: string
  recommended: boolean
  price: string
  priceNote: string
  includes: string[]
  /** Tautan WhatsApp dengan pesan yang sudah menyebut paket ini. */
  href: string
}

export function PlanCard({
  name,
  audience,
  recommended,
  price,
  priceNote,
  includes,
  href,
}: PlanCardProps) {
  return (
    <article className={styles.card} data-recommended={recommended}>
      {recommended && <p className={styles.badge}>Rekomendasi kami</p>}
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.audience}>{audience}</p>
      <p className={styles.price}>{price}</p>
      <p className={styles.priceNote}>{priceNote}</p>
      <ul className={styles.includes}>
        {includes.map((item) => (
          <li key={item}>
            <Check aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <a
        className={recommended ? 'button' : 'button is-ghost'}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Pilih {name}
      </a>
    </article>
  )
}

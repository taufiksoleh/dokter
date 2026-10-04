import { ArrowUpRight } from 'lucide-react'
import type { Practice } from '@/content'
import styles from './PracticeList.module.css'

export function PracticeList({ practices }: { practices: Practice[] }) {
  return (
    <ul className={styles.list}>
      {practices.map((practice) => (
        <li key={practice.name} className={styles.card}>
          <div>
            <h3>{practice.name}</h3>
            <p className={styles.address}>
              {practice.address}, {practice.city}
            </p>
          </div>

          <dl className={styles.schedule}>
            {practice.schedule.map((slot) => (
              <div key={slot.days}>
                <dt>{slot.days}</dt>
                <dd>{slot.hours}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.foot}>
            {practice.note && <span className={styles.note}>{practice.note}</span>}
            <a
              className="text-link"
              href={practice.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka peta
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}

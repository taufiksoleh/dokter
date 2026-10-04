import type { Procedure } from '@/content'
import styles from './FactGrid.module.css'

/** Angka ringkas sebuah tindakan, misalnya lama tindakan dan masa rawat inap. */
export function FactGrid({ facts }: { facts: Procedure['facts'] }) {
  if (!facts.length) return null

  return (
    <dl className={styles.grid}>
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}

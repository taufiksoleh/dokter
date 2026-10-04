import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Procedure } from '@/content'
import { routes } from '@/lib/site'
import styles from './ProcedureList.module.css'

type ProcedureListProps = {
  procedures: Procedure[]
  /** Tingkat heading judul prosedur, menyesuaikan posisi daftar di halaman. */
  headingLevel?: 'h2' | 'h3'
}

export function ProcedureList({ procedures, headingLevel: Heading = 'h3' }: ProcedureListProps) {
  return (
    <ul className={styles.list}>
      {procedures.map((procedure) => (
        <li key={procedure.slug}>
          <Link href={routes.procedure(procedure.slug)} className={styles.item}>
            <div>
              <Heading className={styles.title}>{procedure.title}</Heading>
              <p className={styles.summary}>{procedure.summary}</p>
              <ul className={styles.facts} aria-label="Ringkasan tindakan">
                {procedure.facts.slice(0, 2).map((fact) => (
                  <li key={fact.label}>
                    {fact.label} {fact.value}
                  </li>
                ))}
              </ul>
            </div>
            <ArrowRight className={styles.arrow} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

import { Plus } from 'lucide-react'
import type { Faq } from '@/content'
import { JsonLd } from '@/components/ui/JsonLd'
import { faqSchema } from '@/lib/structured-data'
import styles from './FaqList.module.css'

type FaqListProps = {
  faqs: Faq[]
  title?: string
}

export function FaqList({ faqs, title = 'Pertanyaan yang sering diajukan' }: FaqListProps) {
  if (!faqs.length) return null

  return (
    <section aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.title}>
        {title}
      </h2>
      <div className={styles.list}>
        {faqs.map((faq) => (
          <details key={faq.question} className={styles.item}>
            <summary>
              {faq.question}
              <Plus aria-hidden="true" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  )
}

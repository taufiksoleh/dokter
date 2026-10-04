import Link from 'next/link'
import { JsonLd } from '@/components/ui/JsonLd'
import { routes } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/structured-data'
import styles from './Breadcrumb.module.css'

type Crumb = { name: string; path: string }

/** Jejak halaman. Item terakhir adalah halaman yang sedang dibuka. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail = [{ name: 'Beranda', path: routes.home }, ...items]

  return (
    <nav aria-label="Jejak halaman" className={styles.breadcrumb}>
      <ol>
        {trail.map((item, index) => (
          <li key={item.path}>
            {index < trail.length - 1 ? (
              <Link href={item.path}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(trail)} />
    </nav>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Profile } from '@/content'
import { routes } from '@/lib/site'
import styles from './AboutTeaser.module.css'

export function AboutTeaser({ profile }: { profile: Profile }) {
  const [opening] = profile.bio.split('\n\n')

  return (
    <section className={styles.teaser}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Tentang</p>
          <h2>Mengenal {profile.shortName}</h2>
          <p className="muted">{opening}</p>
          <Link href={routes.about} className="text-link">
            Pendidikan dan pengalaman
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div>
          <h3 className={styles.listTitle}>Bidang yang ditangani</h3>
          <ul className={styles.list}>
            {profile.expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

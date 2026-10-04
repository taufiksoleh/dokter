import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { Profile } from '@/content'
import { SpineMark } from '@/components/ui/SpineMark'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { routes } from '@/lib/site'
import styles from './Hero.module.css'

export function Hero({ profile }: { profile: Profile }) {
  const [mainPractice] = profile.practices

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">{profile.title}</p>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={`lede ${styles.tagline}`}>{profile.tagline}</p>

          <div className={styles.actions}>
            <WhatsAppLink whatsapp={profile.whatsapp} />
            <Link href={routes.procedures} className="button is-ghost">
              Lihat prosedur
            </Link>
          </div>

          <dl className={styles.highlights}>
            {profile.highlights.map((item) => (
              <div key={item.label}>
                <dt className={styles.highlightValue}>{item.value}</dt>
                <dd className={styles.highlightLabel}>{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.figure}>
          <SpineMark className={styles.spine} count={14} />
          <div className={styles.frame}>
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              fetchPriority="high"
            />
          </div>
          <Link href={routes.contact} className={styles.practice}>
            <MapPin aria-hidden="true" />
            <span>
              <strong>{mainPractice.name}</strong>
              {mainPractice.city}
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

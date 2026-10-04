import type { SocialLink } from '@/content'
import { SocialIcon, socialLabels } from './SocialIcon'
import styles from './SocialLinks.module.css'

export function SocialLinks({ socials }: { socials: SocialLink[] }) {
  if (!socials.length) return null

  return (
    <ul className={styles.list}>
      {socials.map((social) => (
        <li key={social.platform}>
          <a
            className={styles.link}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${socialLabels[social.platform]} ${social.handle}`}
          >
            <SocialIcon platform={social.platform} />
          </a>
        </li>
      ))}
    </ul>
  )
}

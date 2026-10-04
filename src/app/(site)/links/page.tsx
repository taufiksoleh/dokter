import Link from 'next/link'
import { content } from '@/content'
import { SocialIcon, socialLabels } from '@/components/ui/SocialIcon'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'
import styles from './page.module.css'

const internalLinks = [
  { href: routes.contact, label: 'Jadwal dan tempat praktik' },
  { href: routes.procedures, label: 'Info prosedur' },
  { href: routes.articles, label: 'Artikel' },
]

export const metadata = pageMetadata({
  title: 'Tautan resmi',
  description: 'Semua tautan resmi dalam satu halaman, untuk dipasang di bio Instagram.',
  path: routes.links,
})

export default async function LinksPage() {
  const profile = await content.getProfile()

  return (
    <div className={`container ${styles.page}`}>
      <img
        className={styles.avatar}
        src={profile.photo.src}
        alt={profile.photo.alt}
        width={profile.photo.width}
        height={profile.photo.height}
      />
      <h1 className={styles.name}>{profile.name}</h1>
      <p className="muted">{profile.title}</p>

      <ul className={styles.links}>
        <li>
          <WhatsAppLink whatsapp={profile.whatsapp} />
        </li>
        {internalLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="button is-ghost">
              {link.label}
            </Link>
          </li>
        ))}
        {profile.socials.map((social) => (
          <li key={social.platform}>
            <a
              className="button is-ghost"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon platform={social.platform} />
              {socialLabels[social.platform]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

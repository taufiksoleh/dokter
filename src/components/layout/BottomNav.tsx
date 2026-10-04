'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/lib/site'
import { homeNavigation, primaryNavigation } from './navigation'
import styles from './BottomNav.module.css'

const items = [homeNavigation, ...primaryNavigation]

const withoutTrailingSlash = (path: string) => path.replace(/\/$/, '')

/** Beranda hanya aktif di alamat utama. Menu lain juga aktif di halaman detailnya. */
function isCurrent(href: string, pathname: string) {
  const current = withoutTrailingSlash(pathname)
  const target = withoutTrailingSlash(href)
  return href === routes.home ? current === target : current.startsWith(target)
}

/** Navigasi utama di ponsel, menempel di bawah layar agar terjangkau ibu jari. */
export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Menu ponsel" className={styles.nav}>
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={styles.item}
          aria-current={isCurrent(href, pathname) ? 'page' : undefined}
        >
          <Icon aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  )
}

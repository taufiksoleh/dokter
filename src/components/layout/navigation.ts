import { CalendarDays, Home, Newspaper, Stethoscope, UserRound } from 'lucide-react'
import { routes } from '@/lib/site'

/** Menu utama. Dipakai header di layar lebar dan navigasi bawah di ponsel. */
export const primaryNavigation = [
  { href: routes.about, label: 'Tentang', icon: UserRound },
  { href: routes.procedures, label: 'Prosedur', icon: Stethoscope },
  { href: routes.articles, label: 'Artikel', icon: Newspaper },
  { href: routes.contact, label: 'Kontak', icon: CalendarDays },
]

export const homeNavigation = { href: routes.home, label: 'Beranda', icon: Home }

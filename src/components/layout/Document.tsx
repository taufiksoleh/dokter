import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/tokens.css'
import '@/styles/base.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

/**
 * Kerangka HTML halaman publik beserta huruf dan gaya dasarnya. Dipakai oleh tiap root layout,
 * karena panel admin memiliki kerangka HTML sendiri dan tidak boleh ikut memuat gaya ini.
 */
export function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Document } from '@/components/layout/Document'
import { NotFoundContent } from '@/components/layout/NotFoundContent'

export const metadata: Metadata = { title: 'Halaman tidak ditemukan', icons: '/favicon.svg' }

/** Untuk alamat yang tidak cocok dengan rute mana pun. Dirender tanpa layout. */
export default function GlobalNotFound() {
  return (
    <Document>
      <main>
        <NotFoundContent />
      </main>
    </Document>
  )
}

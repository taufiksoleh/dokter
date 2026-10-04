import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks'

const MAX_IMAGE_WIDTH = 1600

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Gambar', plural: 'Gambar' },
  admin: { group: 'Konten' },
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    // Foto dari kamera diperkecil dan diubah ke WebP agar halaman tetap ringan.
    resizeOptions: { width: MAX_IMAGE_WIDTH, withoutEnlargement: true },
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      name: 'alt',
      label: 'Teks alternatif',
      type: 'text',
      required: true,
      admin: { description: 'Deskripsi singkat isi gambar untuk pembaca layar dan Google.' },
    },
  ],
}

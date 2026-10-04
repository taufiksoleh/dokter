import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access'
import { bodyField, slugField, summaryField } from '../fields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks'

/** Halaman teks sederhana seperti Kebijakan Privasi. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Halaman', plural: 'Halaman' },
  admin: { group: 'Konten', useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true },
    slugField,
    summaryField,
    bodyField,
  ],
}

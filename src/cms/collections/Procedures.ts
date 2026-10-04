import type { CollectionConfig } from 'payload'
import { routes, siteUrl } from '@/lib/site'
import { isLoggedIn, publishedOrLoggedIn } from '../access'
import { bodyField, seoField, slugField, summaryField } from '../fields'
import { redirectOnSlugChange, revalidateAfterChange, revalidateAfterDelete } from '../hooks'

export const Procedures: CollectionConfig = {
  slug: 'procedures',
  labels: { singular: 'Prosedur', plural: 'Prosedur' },
  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', '_status', 'updatedAt'],
    preview: (doc) => `${siteUrl}${routes.procedure(String(doc.slug))}`,
  },
  defaultSort: 'order',
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    afterChange: [redirectOnSlugChange(routes.procedure), revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', label: 'Nama prosedur', type: 'text', required: true },
    slugField,
    {
      name: 'order',
      label: 'Urutan tampil',
      type: 'number',
      required: true,
      defaultValue: 10,
      admin: { position: 'sidebar', description: 'Angka kecil tampil lebih dulu.' },
    },
    summaryField,
    {
      name: 'facts',
      label: 'Angka ringkas',
      labels: { singular: 'Angka', plural: 'Angka' },
      type: 'array',
      maxRows: 4,
      admin: { description: 'Misalnya lama tindakan dan masa rawat inap. Maksimal 4.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Keterangan', type: 'text', required: true },
            { name: 'value', label: 'Nilai', type: 'text', required: true },
          ],
        },
      ],
    },
    bodyField,
    {
      name: 'faqs',
      label: 'Pertanyaan yang sering diajukan',
      labels: { singular: 'Pertanyaan', plural: 'Pertanyaan' },
      type: 'array',
      fields: [
        { name: 'question', label: 'Pertanyaan', type: 'text', required: true },
        { name: 'answer', label: 'Jawaban', type: 'textarea', required: true },
      ],
    },
    seoField,
  ],
}

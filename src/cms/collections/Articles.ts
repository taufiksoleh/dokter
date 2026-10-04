import type { CollectionConfig } from 'payload'
import { routes, siteUrl } from '@/lib/site'
import { isLoggedIn, publishedOrLoggedIn } from '../access'
import { bodyField, imageField, seoField, slugField, summaryField } from '../fields'
import { redirectOnSlugChange, revalidateAfterChange, revalidateAfterDelete } from '../hooks'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Artikel', plural: 'Artikel' },
  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
    preview: (doc) => `${siteUrl}${routes.article(String(doc.slug))}`,
  },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    afterChange: [redirectOnSlugChange(routes.article), revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true },
    slugField,
    {
      name: 'publishedAt',
      label: 'Tanggal terbit',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { displayFormat: 'd MMMM yyyy' } },
    },
    summaryField,
    imageField('image', 'Gambar sampul'),
    {
      name: 'tags',
      label: 'Topik',
      type: 'text',
      hasMany: true,
      admin: { description: 'Topik pertama tampil di atas judul artikel.' },
    },
    bodyField,
    seoField,
  ],
}

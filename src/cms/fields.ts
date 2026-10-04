import type { Field } from 'payload'
import { slugify } from '@/lib/seo'

const SUMMARY_MAX_LENGTH = 160

export const slugField: Field = {
  name: 'slug',
  label: 'Alamat halaman',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Terisi otomatis dari judul. Hanya huruf kecil, angka, dan tanda hubung.',
  },
  hooks: {
    beforeValidate: [({ value, data }) => slugify(String(value || data?.title || ''))],
  },
}

export const summaryField: Field = {
  name: 'summary',
  label: 'Ringkasan',
  type: 'textarea',
  required: true,
  maxLength: SUMMARY_MAX_LENGTH,
  admin: {
    description: `Tampil di daftar dan di hasil pencarian Google. Maksimal ${SUMMARY_MAX_LENGTH} karakter.`,
  },
}

export const bodyField: Field = {
  name: 'body',
  label: 'Isi',
  type: 'richText',
  required: true,
  admin: { description: 'Gunakan Judul 2 untuk subjudul. Subjudul otomatis menjadi daftar isi.' },
}

export const seoField: Field = {
  name: 'seo',
  label: 'SEO',
  type: 'group',
  admin: { description: 'Opsional. Bila dikosongkan, judul dan ringkasan di atas yang dipakai.' },
  fields: [
    { name: 'title', label: 'Judul di Google', type: 'text', maxLength: 65 },
    { name: 'description', label: 'Deskripsi di Google', type: 'textarea', maxLength: 160 },
  ],
}

export function imageField(name: string, label: string, required = true): Field {
  return { name, label, type: 'upload', relationTo: 'media', required }
}

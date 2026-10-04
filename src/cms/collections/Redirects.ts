import type { CollectionConfig, TextFieldSingleValidation } from 'payload'
import { isLoggedIn } from '../access'

const internalPath: TextFieldSingleValidation = (value) =>
  /^\/(?!\/)[a-z0-9/_-]*$/.test(value ?? '') ||
  'Tulis alamat di dalam website, diawali garis miring. Contoh: /prosedur/operasi-skoliosis/'

const differentInternalPath: TextFieldSingleValidation = (value, args) => {
  const { from } = args.siblingData as { from?: string }
  if (value && value === from) return 'Alamat baru harus berbeda dari alamat lama.'
  return internalPath(value, args)
}

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Pengalihan', plural: 'Pengalihan URL' },
  admin: {
    group: 'Pengaturan',
    useAsTitle: 'from',
    defaultColumns: ['from', 'to'],
    description:
      'Alamat lama yang dialihkan ke alamat baru. Terisi otomatis saat alamat prosedur atau artikel diganti.',
  },
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  fields: [
    {
      name: 'from',
      label: 'Alamat lama',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: internalPath,
    },
    {
      name: 'to',
      label: 'Alamat baru',
      type: 'text',
      required: true,
      validate: differentInternalPath,
    },
  ],
}

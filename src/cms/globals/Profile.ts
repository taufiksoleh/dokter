import type { Field, GlobalConfig } from 'payload'
import { socialPlatforms } from '@/content/schema'
import { WHATSAPP_PHONE_PATTERN } from '@/lib/whatsapp'
import { isLoggedIn } from '../access'
import { imageField } from '../fields'
import { revalidateGlobal } from '../hooks'

const platformLabels: Record<(typeof socialPlatforms)[number], string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
}

function credentialFields(): Field[] {
  return [
    {
      type: 'row',
      fields: [
        { name: 'period', label: 'Tahun', type: 'text', required: true, admin: { width: '25%' } },
        { name: 'title', label: 'Gelar atau pelatihan', type: 'text', required: true },
      ],
    },
    { name: 'institution', label: 'Institusi', type: 'text', required: true },
  ]
}

const identityFields: Field[] = [
  {
    name: 'name',
    label: 'Nama lengkap dengan gelar',
    type: 'text',
    required: true,
    admin: { description: 'Contoh: dr. Nama Dokter, Sp.OT(K)' },
  },
  {
    name: 'shortName',
    label: 'Nama singkat',
    type: 'text',
    required: true,
    admin: { description: 'Tampil di bagian atas website dan di judul halaman.' },
  },
  { name: 'title', label: 'Spesialisasi', type: 'text', required: true },
  {
    name: 'tagline',
    label: 'Kalimat pembuka',
    type: 'textarea',
    required: true,
    admin: { description: 'Satu atau dua kalimat di bawah nama pada beranda.' },
  },
  {
    name: 'summary',
    label: 'Deskripsi untuk Google',
    type: 'textarea',
    required: true,
    maxLength: 160,
  },
  imageField('photo', 'Foto profil'),
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    type: 'group',
    fields: [
      {
        name: 'phone',
        label: 'Nomor',
        type: 'text',
        required: true,
        validate: (value: unknown) =>
          WHATSAPP_PHONE_PATTERN.test(String(value ?? '')) ||
          'Gunakan format 62xxxxxxxxxx tanpa tanda plus, spasi, atau angka 0 di depan.',
      },
      {
        name: 'greeting',
        label: 'Sapaan pembuka pesan',
        type: 'text',
        required: true,
        admin: { description: 'Contoh: Halo dr. Raka' },
      },
    ],
  },
  {
    name: 'highlights',
    label: 'Angka sorotan di beranda',
    labels: { singular: 'Sorotan', plural: 'Sorotan' },
    type: 'array',
    maxRows: 4,
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'value', label: 'Angka', type: 'text', required: true, admin: { width: '30%' } },
          { name: 'label', label: 'Keterangan', type: 'text', required: true },
        ],
      },
    ],
  },
]

const practiceFields: Field[] = [
  {
    name: 'practices',
    label: 'Tempat praktik',
    labels: { singular: 'Tempat praktik', plural: 'Tempat praktik' },
    type: 'array',
    required: true,
    minRows: 1,
    fields: [
      { name: 'name', label: 'Nama rumah sakit atau klinik', type: 'text', required: true },
      {
        type: 'row',
        fields: [
          { name: 'address', label: 'Alamat', type: 'text', required: true },
          { name: 'city', label: 'Kota', type: 'text', required: true, admin: { width: '30%' } },
        ],
      },
      {
        name: 'mapUrl',
        label: 'Tautan Google Maps',
        type: 'text',
        required: true,
        admin: { description: 'Diawali https://' },
      },
      {
        name: 'schedule',
        label: 'Jadwal',
        labels: { singular: 'Jadwal', plural: 'Jadwal' },
        type: 'array',
        required: true,
        minRows: 1,
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'days', label: 'Hari', type: 'text', required: true },
              { name: 'hours', label: 'Jam', type: 'text', required: true },
            ],
          },
        ],
      },
      { name: 'note', label: 'Catatan', type: 'text', admin: { description: 'Opsional.' } },
    ],
  },
]

const backgroundFields: Field[] = [
  {
    name: 'bio',
    label: 'Biografi',
    type: 'richText',
    required: true,
    admin: { description: 'Paragraf pertama juga tampil di beranda.' },
  },
  {
    name: 'expertise',
    label: 'Bidang yang ditangani',
    type: 'text',
    hasMany: true,
    required: true,
  },
  {
    name: 'education',
    label: 'Pendidikan',
    labels: { singular: 'Pendidikan', plural: 'Pendidikan' },
    type: 'array',
    fields: credentialFields(),
  },
  {
    name: 'training',
    label: 'Pelatihan lanjutan',
    labels: { singular: 'Pelatihan', plural: 'Pelatihan' },
    type: 'array',
    fields: credentialFields(),
  },
  { name: 'memberships', label: 'Keanggotaan organisasi', type: 'text', hasMany: true },
]

const socialFields: Field[] = [
  {
    name: 'socials',
    label: 'Akun media sosial',
    labels: { singular: 'Akun', plural: 'Akun' },
    type: 'array',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'platform',
            label: 'Platform',
            type: 'select',
            required: true,
            options: socialPlatforms.map((value) => ({ value, label: platformLabels[value] })),
            admin: { width: '30%' },
          },
          { name: 'handle', label: 'Nama akun', type: 'text', required: true },
        ],
      },
      { name: 'url', label: 'Tautan', type: 'text', required: true },
    ],
  },
  {
    name: 'youtubeChannelId',
    label: 'ID channel YouTube',
    type: 'text',
    admin: {
      description:
        'Opsional. Bila diisi, video terbaru channel tampil otomatis dan daftar di bawah menjadi cadangan.',
    },
  },
  {
    name: 'videos',
    label: 'Video pilihan',
    labels: { singular: 'Video', plural: 'Video' },
    type: 'array',
    fields: [
      { name: 'title', label: 'Judul', type: 'text', required: true },
      { name: 'url', label: 'Tautan video', type: 'text', required: true },
      {
        type: 'row',
        fields: [
          {
            name: 'youtubeId',
            label: 'ID video YouTube',
            type: 'text',
            admin: { description: 'Bila diisi, video bisa diputar langsung di website.' },
          },
          { name: 'duration', label: 'Durasi', type: 'text', admin: { width: '30%' } },
        ],
      },
      imageField('poster', 'Sampul video', false),
    ],
  },
  {
    name: 'instagram',
    label: 'Unggahan Instagram pilihan',
    labels: { singular: 'Unggahan', plural: 'Unggahan' },
    type: 'array',
    fields: [
      imageField('image', 'Gambar'),
      { name: 'url', label: 'Tautan unggahan', type: 'text', required: true },
    ],
  },
]

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profil dokter',
  admin: { group: 'Konten' },
  access: { read: () => true, update: isLoggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Identitas', fields: identityFields },
        { label: 'Tempat praktik', fields: practiceFields },
        { label: 'Riwayat', fields: backgroundFields },
        { label: 'Media sosial', fields: socialFields },
      ],
    },
  ],
}

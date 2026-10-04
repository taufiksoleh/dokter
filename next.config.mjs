import { withPayload } from '@payloadcms/next/withPayload'

const isShowcase = process.env.NEXT_PUBLIC_SHOWCASE === '1'
const isCms = process.env.CONTENT_SOURCE === 'cms'

/** @type {import('next').NextConfig} */
const baseConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  // Disisipkan saat build, sehingga kode sumber konten yang tidak dipakai tidak ikut dibundel.
  env: { CONTENT_SOURCE: isCms ? 'cms' : 'file' },
  // Akhiran file menentukan rute mana yang ikut dibangun:
  // .showcase.tsx = halaman /paket (mode etalase), .cms.ts(x) = panel admin (Paket Mandiri).
  pageExtensions: [
    'tsx',
    'ts',
    ...(isShowcase ? ['showcase.tsx'] : []),
    ...(isCms ? ['cms.tsx', 'cms.ts'] : []),
  ],
}

// Paket Profil dibangun menjadi file statis. Paket Mandiri butuh server untuk panel admin,
// dan memakai folder build sendiri agar kedua mode bisa dijalankan berdampingan.
export default isCms
  ? withPayload({ ...baseConfig, distDir: '.next-cms' })
  : { ...baseConfig, output: 'export' }

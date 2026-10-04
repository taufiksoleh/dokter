export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
)

/** Mode etalase menampilkan bilah "website contoh" dan halaman paket harga. */
export const isShowcase = process.env.NEXT_PUBLIC_SHOWCASE === '1'

/** Gambar pratinjau saat tautan etalase dibagikan lewat WhatsApp atau media sosial. */
export const showcaseShareImage = { src: '/og-etalase.png', alt: 'Website pribadi untuk dokter' }

export const routes = {
  home: '/',
  about: '/tentang/',
  procedures: '/prosedur/',
  procedure: (slug: string) => `/prosedur/${slug}/`,
  articles: '/artikel/',
  article: (slug: string) => `/artikel/${slug}/`,
  contact: '/kontak/',
  links: '/links/',
  privacy: '/kebijakan-privasi/',
  pricing: '/paket/',
} as const

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`
}

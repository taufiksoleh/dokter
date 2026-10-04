import type { Metadata } from 'next'
import { isShowcase, showcaseShareImage } from './site'

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Serialisasi JSON-LD yang aman disisipkan ke dalam tag script. */
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  image?: { src: string; alt: string }
  type?: 'website' | 'article' | 'profile'
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: PageMetadataInput): Metadata {
  // Ilustrasi website contoh berformat SVG, yang tidak ditampilkan WhatsApp dan media sosial.
  const shareImage = isShowcase ? showcaseShareImage : image

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      locale: 'id_ID',
      images: shareImage ? [{ url: shareImage.src, alt: shareImage.alt }] : undefined,
    },
    twitter: { card: shareImage ? 'summary_large_image' : 'summary', title, description },
  }
}

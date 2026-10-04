import { z } from 'zod'
import { WHATSAPP_PHONE_PATTERN } from '@/lib/whatsapp'

const text = z.string().trim().min(1)
const isoDate = z.coerce.date().transform((date) => date.toISOString())

const image = z.object({
  src: z.string().startsWith('/'),
  alt: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const seo = z.object({ title: text.max(65).optional(), description: text.max(160).optional() })

const credential = z.object({ period: text, title: text, institution: text })

const practice = z.object({
  name: text,
  address: text,
  city: text,
  mapUrl: z.url(),
  schedule: z.array(z.object({ days: text, hours: text })).min(1),
  note: text.optional(),
})

export const socialPlatforms = ['instagram', 'youtube', 'tiktok', 'facebook', 'linkedin'] as const

const social = z.object({ platform: z.enum(socialPlatforms), url: z.url(), handle: text })

const video = z.object({
  title: text,
  url: z.url(),
  youtubeId: text.optional(),
  poster: image.optional(),
  duration: text.optional(),
})

export const profileSchema = z.object({
  name: text,
  shortName: text,
  title: text,
  tagline: text,
  summary: text.max(160),
  photo: image,
  whatsapp: z.object({
    phone: z.string().regex(WHATSAPP_PHONE_PATTERN, 'Gunakan format 62xxxxxxxxxx tanpa tanda plus'),
    greeting: text,
  }),
  highlights: z.array(z.object({ value: text, label: text })).max(4),
  expertise: z.array(text).min(1),
  education: z.array(credential),
  training: z.array(credential),
  memberships: z.array(text),
  practices: z.array(practice).min(1),
  socials: z.array(social),
  youtubeChannelId: text.optional(),
  videos: z.array(video),
  instagram: z.array(z.object({ image, url: z.url() })),
})

export const procedureSchema = z.object({
  title: text,
  summary: text.max(160),
  order: z.number().int(),
  facts: z.array(z.object({ label: text, value: text })).max(4),
  faqs: z.array(z.object({ question: text, answer: text })),
  seo: seo.optional(),
})

export const articleSchema = z.object({
  title: text,
  summary: text.max(160),
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  image,
  tags: z.array(text),
  seo: seo.optional(),
})

export const pageSchema = z.object({ title: text, summary: text.max(160), updatedAt: isoDate })

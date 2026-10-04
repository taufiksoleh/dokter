import type { z } from 'zod'
import type { articleSchema, pageSchema, procedureSchema, profileSchema } from './schema'

export type Profile = z.infer<typeof profileSchema> & { bio: string }
export type Procedure = z.infer<typeof procedureSchema> & { slug: string; body: string }
export type Article = z.infer<typeof articleSchema> & {
  slug: string
  body: string
  readingMinutes: number
}
export type Page = z.infer<typeof pageSchema> & { slug: string; body: string }

export type Image = Profile['photo']
export type Practice = Profile['practices'][number]
export type Credential = Profile['education'][number]
export type SocialLink = Profile['socials'][number]
export type Video = Profile['videos'][number]
export type Faq = Procedure['faqs'][number]

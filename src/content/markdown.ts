import matter from 'gray-matter'
import { z } from 'zod'
import { slugify } from '@/lib/seo'

const WORDS_PER_MINUTE = 200

export type Heading = { id: string; text: string }

/** Memisahkan frontmatter dari isi, lalu memvalidasinya. Build gagal bila frontmatter salah. */
export function parseDocument<Output extends object>(
  raw: string,
  schema: z.ZodType<Output>,
  label: string,
) {
  const { data, content } = matter(raw)
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Error(`Frontmatter ${label} tidak valid:\n${z.prettifyError(result.error)}`)
  }
  return { data: result.data, body: content.trim() }
}

/** Subjudul tingkat dua, dipakai untuk daftar isi. */
export function extractHeadings(markdown: string): Heading[] {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map(([, text]) => ({
    id: slugify(text),
    text: text.trim(),
  }))
}

export function readingMinutes(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

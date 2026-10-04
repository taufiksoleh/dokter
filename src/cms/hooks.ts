import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/** Membangun ulang halaman publik agar perubahan di panel admin langsung tampil. */
function revalidateSite() {
  try {
    revalidatePath('/', 'layout')
  } catch (error) {
    // Payload juga berjalan lewat skrip CLI, di luar permintaan Next.js.
    if (error instanceof Error && error.message.includes('static generation store missing')) return
    throw error
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateSite()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite()
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  revalidateSite()
  return doc
}

/**
 * Saat alamat halaman yang sudah terbit diganti, alamat lama dialihkan ke yang baru
 * supaya tautan yang sudah tersebar tidak berujung ke halaman 404.
 */
export function redirectOnSlugChange(toPath: (slug: string) => string): CollectionAfterChangeHook {
  return async ({ doc, previousDoc, operation, req }) => {
    const wasPublished = previousDoc?._status === 'published'
    if (operation !== 'update' || !wasPublished || previousDoc.slug === doc.slug) return doc

    const from = toPath(previousDoc.slug)
    const to = toPath(doc.slug)
    // Pengalihan lama yang berangkat dari alamat baru dihapus agar tidak berputar.
    await req.payload.delete({ collection: 'redirects', where: { from: { equals: to } }, req })
    const existing = await req.payload.find({
      collection: 'redirects',
      where: { from: { equals: from } },
      limit: 1,
      req,
    })
    if (existing.docs[0]) {
      await req.payload.update({
        collection: 'redirects',
        id: existing.docs[0].id,
        data: { to },
        req,
      })
    } else {
      await req.payload.create({ collection: 'redirects', data: { from, to }, req })
    }
    return doc
  }
}

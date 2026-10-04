import { notFound, permanentRedirect } from 'next/navigation'
import { content } from '@/content'

/** Untuk alamat yang tidak punya konten: alihkan bila pernah dipindahkan, selain itu 404. */
export async function redirectOrNotFound(path: string): Promise<never> {
  const target = await content.getRedirect(path)
  if (target) permanentRedirect(target)
  notFound()
}

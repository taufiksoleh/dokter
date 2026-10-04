import { redirectOrNotFound } from '@/lib/missing'

type FallbackPageProps = { params: Promise<{ path: string[] }> }

/** Menangkap alamat yang tidak punya halaman, untuk pengalihan yang diatur di panel admin. */
export default async function FallbackPage({ params }: FallbackPageProps) {
  const { path } = await params
  return redirectOrNotFound(`/${path.join('/')}/`)
}

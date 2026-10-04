import config from '@payload-config'
import { generatePageMetadata, NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type AdminPageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: AdminPageProps) =>
  generatePageMetadata({ config, params, searchParams })

export default function AdminNotFound({ params, searchParams }: AdminPageProps) {
  return NotFoundPage({ config, params, searchParams, importMap })
}

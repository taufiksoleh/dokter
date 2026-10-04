import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { id } from '@payloadcms/translations/languages/id'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Articles } from './cms/collections/Articles'
import { Media } from './cms/collections/Media'
import { Pages } from './cms/collections/Pages'
import { Procedures } from './cms/collections/Procedures'
import { Redirects } from './cms/collections/Redirects'
import { Users } from './cms/collections/Users'
import { Profile } from './cms/globals/Profile'
import { richTextFeatures } from './cms/rich-text'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: ' | Panel Admin' },
  },
  i18n: { supportedLanguages: { id }, fallbackLanguage: 'id' },
  globals: [Profile],
  collections: [Procedures, Articles, Pages, Media, Redirects, Users],
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./data/cms.db' },
    migrationDir: path.resolve(dirname, 'cms/migrations'),
    // Skema hanya berubah lewat file migrasi, di komputer pengembang maupun di server,
    // supaya struktur database klien selalu bisa dilacak dan tidak berubah diam-diam.
    push: false,
  }),
  editor: lexicalEditor({ features: richTextFeatures }),
  sharp,
  upload: { limits: { fileSize: MAX_UPLOAD_BYTES } },
  typescript: { outputFile: path.resolve(dirname, 'cms/payload-types.ts') },
})

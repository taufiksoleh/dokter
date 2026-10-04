import nextEnv from '@next/env'

// Membuat akun pengelola pertama dari variabel lingkungan, supaya halaman pendaftaran
// pertama di /admin tidak sempat dipakai orang lain setelah website online.
nextEnv.loadEnvConfig(process.cwd())

const { CMS_ADMIN_EMAIL: email, CMS_ADMIN_PASSWORD: password, CMS_ADMIN_NAME: name } = process.env
if (!email || !password) {
  console.error('Isi CMS_ADMIN_EMAIL dan CMS_ADMIN_PASSWORD sebelum menjalankan perintah ini.')
  process.exit(1)
}

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const cms = await getPayload({ config })

const { totalDocs } = await cms.count({ collection: 'users' })
if (totalDocs > 0) {
  console.log('Akun pengelola sudah ada. Tambahkan pengelola lain lewat panel admin.')
} else {
  await cms.create({ collection: 'users', data: { email, password, name: name || 'Admin' } })
  console.log(`Akun pengelola ${email} dibuat.`)
}

// Koneksi database Payload menahan proses tetap hidup, jadi skrip diakhiri secara eksplisit.
process.exit(0)

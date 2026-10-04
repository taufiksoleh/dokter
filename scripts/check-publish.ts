import nextEnv from '@next/env'

// Memeriksa nilai contoh yang tidak boleh ikut terbit. Jalankan sebelum build untuk publikasi.
nextEnv.loadEnvConfig(process.cwd())

const { isShowcase, siteUrl } = await import('../src/lib/site')
const { vendor } = await import('../src/showcase/vendor')
const { fileSource } = await import('../src/content/file-source')

const PLACEHOLDER_PHONE: string = '620000000000'
const PLACEHOLDER_VENDOR_NAME: string = 'Website Dokter'

const problems: string[] = []

if (!siteUrl.startsWith('https://') || siteUrl.includes('localhost')) {
  problems.push(
    `NEXT_PUBLIC_SITE_URL masih "${siteUrl}". Isi dengan domain website, diawali https://. ` +
      'Nilai ini dipakai untuk canonical, sitemap, dan pratinjau tautan.',
  )
}

const profile = await fileSource.getProfile()
if (profile.whatsapp.phone === PLACEHOLDER_PHONE) {
  problems.push(
    'Nomor WhatsApp dokter di content/profile.md masih nomor contoh, jadi tombol konsultasi tidak mengarah ke siapa pun.',
  )
}

if (isShowcase) {
  if (vendor.whatsapp === PLACEHOLDER_PHONE) {
    problems.push(
      'Nomor WhatsApp penjual di src/showcase/vendor.ts masih nomor contoh, jadi tombol "Pilih paket" tidak mengarah ke siapa pun.',
    )
  }
  if (vendor.name === PLACEHOLDER_VENDOR_NAME) {
    problems.push('Nama usaha di src/showcase/vendor.ts masih "Website Dokter".')
  }
}

if (problems.length) {
  console.error(`Belum siap dipublikasikan (${problems.length} hal):`)
  for (const problem of problems) console.error(`- ${problem}`)
  process.exit(1)
}
console.log(`Siap dipublikasikan ke ${siteUrl} (mode ${isShowcase ? 'etalase' : 'klien'}).`)

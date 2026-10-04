import nextEnv from '@next/env'

// Variabel lingkungan harus dimuat sebelum konfigurasi Payload dibaca.
nextEnv.loadEnvConfig(process.cwd())

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const { importContent } = await import('../src/cms/import-content')

const cms = await getPayload({ config })
try {
  const result = await importContent(cms, { replace: process.argv.includes('--replace') })
  console.log(
    `Impor selesai: ${result.procedures} prosedur, ${result.articles} artikel, ` +
      `${result.pages} halaman, ${result.images} gambar.`,
  )
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}

// Koneksi database Payload menahan proses tetap hidup, jadi skrip diakhiri secara eksplisit.
process.exit(process.exitCode ?? 0)

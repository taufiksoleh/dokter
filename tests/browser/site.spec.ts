import { expect, test } from '@playwright/test'

const pages = [
  '/',
  '/tentang/',
  '/prosedur/',
  '/prosedur/endoskopi-tulang-belakang/',
  '/artikel/',
  '/artikel/nyeri-pinggang-kapan-ke-dokter/',
  '/kontak/',
  '/links/',
  '/kebijakan-privasi/',
  '/paket/',
]

for (const path of pages) {
  test(`${path} punya satu h1 dan tidak melebar ke samping`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('h1')).toHaveCount(1)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('tombol WhatsApp di halaman prosedur menyebut nama prosedurnya', async ({ page }) => {
  await page.goto('/prosedur/endoskopi-tulang-belakang/')
  const link = page.getByRole('link', { name: 'Konsultasi via WhatsApp' })
  await expect(link).toHaveAttribute('href', /^https:\/\/wa\.me\/62\d+\?text=/)
  const href = await link.getAttribute('href')
  expect(decodeURIComponent(href ?? '')).toContain('Endoskopi Tulang Belakang')
})

test('daftar isi prosedur mengarah ke subjudul yang ada', async ({ page }) => {
  await page.goto('/prosedur/operasi-skoliosis/')
  const anchors = page.getByRole('navigation', { name: 'Daftar isi' }).getByRole('link')
  expect(await anchors.count()).toBeGreaterThan(1)
  for (const href of await anchors.evaluateAll((links) =>
    links.map((a) => a.getAttribute('href')),
  )) {
    await expect(page.locator(href ?? '')).toHaveCount(1)
  }
})

test('website contoh menaut ke halaman paket dan sebaliknya', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Lihat paket harga' }).click()
  await expect(page).toHaveURL(/\/paket\/$/)
  await expect(page.getByRole('heading', { name: 'Paket Profil' }).first()).toBeVisible()
  await page.getByRole('link', { name: 'Lihat website contoh' }).click()
  await expect(page).toHaveURL(/localhost:\d+\/$/)
})

test('ponsel memakai navigasi bawah yang menandai halaman aktif', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Navigasi bawah hanya tampil di layar kecil')
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Menu ponsel' })
  await expect(nav.getByRole('link')).toHaveCount(5)
  await expect(nav.getByRole('link', { name: 'Beranda' })).toHaveAttribute('aria-current', 'page')

  await nav.getByRole('link', { name: 'Prosedur' }).click()
  await expect(page).toHaveURL(/\/prosedur\/$/)
  await expect(nav.getByRole('link', { name: 'Prosedur' })).toHaveAttribute('aria-current', 'page')
  await expect(nav.getByRole('link', { name: 'Beranda' })).not.toHaveAttribute(
    'aria-current',
    'page',
  )

  await page.goto('/prosedur/operasi-skoliosis/')
  await expect(nav.getByRole('link', { name: 'Prosedur' })).toHaveAttribute('aria-current', 'page')
})

test('navigasi bawah dan tombol WhatsApp tidak saling menutupi', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Navigasi bawah hanya tampil di layar kecil')
  await page.goto('/')
  const nav = await page.getByRole('navigation', { name: 'Menu ponsel' }).boundingBox()
  const whatsapp = await page.getByRole('link', { name: 'WhatsApp', exact: true }).boundingBox()
  expect(whatsapp!.y + whatsapp!.height).toBeLessThanOrEqual(nav!.y)
})

test('layar lebar memakai menu di header, bukan navigasi bawah', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Hanya untuk layar lebar')
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: 'Menu ponsel' })).toBeHidden()
  await expect(page.getByRole('navigation', { name: 'Menu utama' })).toBeVisible()
})

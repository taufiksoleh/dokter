import { expect, type Page, test } from '@playwright/test'

const admin = { name: 'Admin Uji', email: 'admin@contoh.id', password: 'KataSandiUji123!' }

test.describe.configure({ mode: 'serial' })

/** Form panel admin baru bisa dipakai setelah selesai dimuat di browser. */
async function openAdmin(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'networkidle' })
}

async function login(page: Page) {
  await openAdmin(page, '/admin/login/')
  await page.locator('#field-email').fill(admin.email)
  await page.locator('#field-password').fill(admin.password)
  await page.getByRole('button', { name: 'Masuk' }).click()
  await expect(page).toHaveURL(/\/admin\/$/)
}

async function openProcedure(page: Page, title: string) {
  await openAdmin(page, '/admin/collections/procedures/')
  await page.getByRole('link', { name: title, exact: true }).first().click()
  await expect(page).toHaveURL(/collections\/procedures\/\d+/)
  await page.waitForLoadState('networkidle')
  await expect(page.locator('#field-title')).toHaveValue(title)
}

async function publish(page: Page) {
  const saved = page.waitForResponse(
    (response) => response.url().includes('/api/procedures') && response.ok(),
  )
  await page.getByRole('button', { name: /Publikasikan/ }).click()
  await saved
}

test('website publik menampilkan konten dari CMS', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('dr. Raka Adiwangsa')
  await page.goto('/prosedur/endoskopi-tulang-belakang/')
  await expect(page.locator('h1')).toHaveText('Endoskopi Tulang Belakang')
  await expect(page.getByRole('navigation', { name: 'Daftar isi' }).getByRole('link')).toHaveCount(
    6,
  )
})

test('panel admin tertutup tanpa login dan pengelola pertama bisa dibuat', async ({ page }) => {
  await openAdmin(page, '/admin/')
  await expect(page).toHaveURL(/create-first-user/)
  await page.locator('#field-email').fill(admin.email)
  await page.locator('#field-password').fill(admin.password)
  await page.locator('#field-confirm-password').fill(admin.password)
  await page.locator('#field-name').fill(admin.name)
  await page.getByRole('button', { name: 'Buat' }).click()
  await expect(page).toHaveURL(/\/admin\/$/)
  await expect(page.getByRole('link', { name: 'Prosedur' }).first()).toBeVisible()
})

test('perubahan yang diterbitkan langsung tampil dan alamat lama dialihkan', async ({ page }) => {
  await login(page)
  await openProcedure(page, 'Injeksi Pereda Nyeri Tulang Belakang')
  await page.locator('#field-title').fill('Injeksi Pereda Nyeri')
  await page.locator('#field-slug').fill('injeksi-pereda-nyeri')
  await publish(page)

  await page.goto('/prosedur/injeksi-pereda-nyeri/')
  await expect(page.locator('h1')).toHaveText('Injeksi Pereda Nyeri')

  const oldAddress = await page.request.get('/prosedur/injeksi-tulang-belakang/', {
    maxRedirects: 0,
  })
  expect(oldAddress.status()).toBe(308)
  await page.goto('/prosedur/injeksi-tulang-belakang/')
  await expect(page).toHaveURL(/\/prosedur\/injeksi-pereda-nyeri\/$/)

  await page.goto('/prosedur/')
  await expect(
    page.getByRole('heading', { name: 'Injeksi Pereda Nyeri', exact: true }),
  ).toBeVisible()
})

test('prosedur baru mendapat halaman sendiri dan masuk sitemap', async ({ page }) => {
  await login(page)
  await openAdmin(page, '/admin/collections/procedures/create/')
  await page.locator('#field-title').fill('Terapi Uji Coba')
  await page.locator('#field-summary').fill('Ringkasan prosedur yang dibuat oleh tes otomatis.')
  await page.locator('.rich-text-lexical [contenteditable="true"]').first().click()
  await page.keyboard.type('Isi prosedur dari tes otomatis.')
  await publish(page)
  await expect(page).toHaveURL(/collections\/procedures\/\d+/)

  await page.goto('/prosedur/terapi-uji-coba/')
  await expect(page.locator('h1')).toHaveText('Terapi Uji Coba')
  await expect(page.getByText('Isi prosedur dari tes otomatis.')).toBeVisible()

  const sitemap = await (await page.request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('/prosedur/terapi-uji-coba/')
})

test('draf tidak tampil di website dan tidak terbaca tanpa login', async ({ page, playwright }) => {
  await login(page)
  await openProcedure(page, 'Terapi Uji Coba')
  await page.locator('#field-title').fill('Terapi Uji Coba Versi Draf')
  const saved = page.waitForResponse(
    (response) => response.url().includes('/api/procedures') && response.ok(),
  )
  await page.getByRole('button', { name: 'Simpan Draf' }).click()
  await saved

  await page.goto('/prosedur/terapi-uji-coba/')
  await expect(page.locator('h1')).toHaveText('Terapi Uji Coba')

  const visitor = await playwright.request.newContext({ baseURL: test.info().project.use.baseURL })
  const publicApi = await (await visitor.get('/api/procedures/?limit=50')).text()
  expect(publicApi).not.toContain('Versi Draf')
  const users = await visitor.get('/api/users/')
  expect(users.status()).toBe(403)
})

test('alamat yang tidak ada menampilkan halaman 404', async ({ page }) => {
  const response = await page.goto('/alamat-yang-tidak-ada/')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Halaman tidak ditemukan' })).toBeVisible()
})

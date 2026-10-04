import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fileSource } from '../../src/content/file-source'
import { extractHeadings } from '../../src/content/markdown'

test('seluruh file konten lolos validasi', async () => {
  const [profile, procedures, articles, privacy] = await Promise.all([
    fileSource.getProfile(),
    fileSource.getProcedures(),
    fileSource.getArticles(),
    fileSource.getPage('kebijakan-privasi'),
  ])
  assert.ok(profile.name)
  assert.ok(procedures.length > 0)
  assert.ok(articles.length > 0)
  assert.ok(privacy)
})

test('prosedur terurut menurut order dan artikel dari yang terbaru', async () => {
  const procedures = await fileSource.getProcedures()
  const orders = procedures.map((procedure) => procedure.order)
  assert.deepEqual(
    orders,
    [...orders].sort((a, b) => a - b),
  )

  const articles = await fileSource.getArticles()
  const dates = articles.map((article) => article.publishedAt)
  assert.deepEqual(dates, [...dates].sort().reverse())
})

test('setiap prosedur punya daftar isi dan slug yang tidak ditemukan mengembalikan null', async () => {
  for (const procedure of await fileSource.getProcedures()) {
    assert.ok(extractHeadings(procedure.body).length > 1, procedure.slug)
  }
  assert.equal(await fileSource.getProcedure('tidak-ada'), null)
})

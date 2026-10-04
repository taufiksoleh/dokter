import assert from 'node:assert/strict'
import { test } from 'node:test'
import { extractHeadings, parseDocument, readingMinutes } from '../../src/content/markdown'
import { procedureSchema } from '../../src/content/schema'

const validProcedure = `---
title: Contoh Tindakan
summary: Ringkasan singkat tindakan.
order: 1
facts: []
faqs: []
---

## Apa itu tindakan ini

Isi.

### Bukan subjudul utama

## Pemulihan`

test('memisahkan frontmatter dan isi', () => {
  const { data, body } = parseDocument(validProcedure, procedureSchema, 'contoh.md')
  assert.equal(data.title, 'Contoh Tindakan')
  assert.ok(body.startsWith('## Apa itu tindakan ini'))
})

test('frontmatter yang salah menghentikan build dengan nama file', () => {
  const broken = validProcedure.replace('order: 1', 'order: pertama')
  assert.throws(
    () => parseDocument(broken, procedureSchema, 'contoh.md'),
    /Frontmatter contoh\.md tidak valid/,
  )
})

test('daftar isi hanya memuat subjudul tingkat dua', () => {
  assert.deepEqual(extractHeadings(validProcedure), [
    { id: 'apa-itu-tindakan-ini', text: 'Apa itu tindakan ini' },
    { id: 'pemulihan', text: 'Pemulihan' },
  ])
})

test('lama baca minimal satu menit', () => {
  assert.equal(readingMinutes('satu dua tiga'), 1)
  assert.equal(readingMinutes(Array(600).fill('kata').join(' ')), 3)
})

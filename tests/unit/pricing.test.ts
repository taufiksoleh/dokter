import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatRupiah } from '../../src/lib/format'
import { plans, UPGRADE_PRICE } from '../../src/showcase/pricing'

const [profil, mandiri] = plans

test('biaya upgrade sama dengan selisih harga paket', () => {
  assert.equal(mandiri.oneTime.price - profil.oneTime.price, UPGRADE_PRICE)
})

test('format rupiah memakai titik sebagai pemisah ribuan', () => {
  assert.equal(formatRupiah(9_500_000), 'Rp 9.500.000')
})

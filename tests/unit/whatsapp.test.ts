import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildWhatsAppUrl, consultMessage } from '../../src/lib/whatsapp'

test('membuat tautan wa.me tanpa pesan', () => {
  assert.equal(buildWhatsAppUrl({ phone: '6281234567890' }), 'https://wa.me/6281234567890')
})

test('meng-encode pesan pembuka, termasuk karakter khusus', () => {
  const url = buildWhatsAppUrl({ phone: '6281234567890', message: 'Halo & salam, apa kabar?' })
  assert.equal(url, 'https://wa.me/6281234567890?text=Halo%20%26%20salam%2C%20apa%20kabar%3F')
})

test('menolak nomor yang tidak diawali 62', () => {
  for (const phone of ['081234567890', '+6281234567890', '62812', '']) {
    assert.throws(() => buildWhatsAppUrl({ phone }), /Nomor WhatsApp tidak valid/)
  }
})

test('pesan konsultasi menyebut topik bila ada', () => {
  assert.equal(
    consultMessage('Halo dr. Raka', 'Endoskopi Tulang Belakang'),
    'Halo dr. Raka, saya ingin berkonsultasi tentang Endoskopi Tulang Belakang.',
  )
  assert.equal(
    consultMessage('Halo dr. Raka'),
    'Halo dr. Raka, saya ingin membuat janji konsultasi.',
  )
})

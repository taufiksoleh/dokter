/** Format internasional tanpa tanda plus, misalnya 6281234567890. */
export const WHATSAPP_PHONE_PATTERN = /^62\d{8,13}$/

export function buildWhatsAppUrl({ phone, message }: { phone: string; message?: string }) {
  if (!WHATSAPP_PHONE_PATTERN.test(phone)) {
    throw new Error(`Nomor WhatsApp tidak valid: "${phone}". Gunakan format 62xxxxxxxxxx.`)
  }
  const url = `https://wa.me/${phone}`
  return message ? `${url}?text=${encodeURIComponent(message)}` : url
}

/** Pesan pembuka yang sudah terisi saat calon pasien menekan tombol WhatsApp. */
export function consultMessage(greeting: string, topic?: string) {
  return topic
    ? `${greeting}, saya ingin berkonsultasi tentang ${topic}.`
    : `${greeting}, saya ingin membuat janji konsultasi.`
}

const dateFormat = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
})

const rupiahFormat = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })

export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso))
}

export function formatRupiah(amount: number) {
  return `Rp ${rupiahFormat.format(amount)}`
}

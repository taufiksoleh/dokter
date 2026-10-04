/** Satu-satunya sumber angka harga di website. Ubah di sini, halaman /paket ikut berubah. */

export type Plan = {
  id: 'profil' | 'mandiri'
  name: string
  audience: string
  recommended: boolean
  oneTime: { price: number; includes: string[] }
  subscription: { setup: number; monthly: number; includes: string[] }
}

/** Paket berlangganan disembunyikan untuk sementara. Ubah ke true untuk menampilkannya lagi. */
export const SHOW_SUBSCRIPTION: boolean = false
export const SUBSCRIPTION_MIN_MONTHS = 12
export const UPGRADE_PRICE = 7_000_000

export const plans: Plan[] = [
  {
    id: 'profil',
    name: 'Paket Profil',
    audience: 'Untuk dokter yang ingin website rapi tanpa perlu mengurusnya sendiri.',
    recommended: false,
    oneTime: {
      price: 9_500_000,
      includes: [
        'Semua halaman seperti di website contoh',
        'Sampai 6 halaman prosedur',
        '3 artikel dipasang di awal',
        'Domain dan hosting tahun pertama',
        '3 kali update konten di tahun pertama',
        'Garansi perbaikan bug 30 hari',
      ],
    },
    subscription: {
      setup: 2_500_000,
      monthly: 600_000,
      includes: [
        'Semua halaman seperti di website contoh',
        'Sampai 6 halaman prosedur',
        'Domain, hosting, dan perawatan selama berlangganan',
        '1 kali update konten setiap bulan',
      ],
    },
  },
  {
    id: 'mandiri',
    name: 'Paket Mandiri',
    audience: 'Untuk dokter atau asisten yang ingin menambah dan mengubah konten kapan saja.',
    recommended: true,
    oneTime: {
      price: 16_500_000,
      includes: [
        'Semua isi Paket Profil',
        'Panel admin untuk mengelola konten sendiri',
        'Halaman prosedur tidak dibatasi',
        '5 artikel dipasang di awal',
        '1 sesi pelatihan dan panduan tertulis',
        'Garansi perbaikan bug 60 hari',
      ],
    },
    subscription: {
      setup: 4_000_000,
      monthly: 1_000_000,
      includes: [
        'Semua isi Paket Profil',
        'Panel admin untuk mengelola konten sendiri',
        'Halaman prosedur tidak dibatasi',
        'Domain, server, backup harian, dan perawatan',
        '1 sesi pelatihan dan panduan tertulis',
      ],
    },
  },
]

export const maintenance = [
  {
    plan: 'Paket Profil',
    yearly: 2_400_000,
    includes:
      'Perpanjangan domain, hosting, SSL, pemantauan, dan 6 kali update konten dalam setahun',
  },
  {
    plan: 'Paket Mandiri',
    yearly: 4_800_000,
    includes:
      'Perpanjangan domain, server, backup harian, pembaruan keamanan, perbaikan bug, dan perubahan kecil hingga 1 jam kerja per bulan',
  },
]

export const addOns = [
  { name: 'Update konten di luar kuota (Paket Profil)', price: 'Rp 150.000 per update' },
  { name: 'Halaman prosedur tambahan (Paket Profil)', price: 'Rp 250.000 per halaman' },
  {
    name: 'Penulisan artikel 1.000-1.200 kata',
    price: 'Rp 350.000 per artikel, atau Rp 1.200.000 untuk 4 artikel',
  },
  { name: 'Unggahan Instagram tampil otomatis', price: 'Rp 1.000.000' },
  { name: 'Versi bahasa Inggris, di luar biaya penerjemahan', price: 'Rp 2.500.000' },
  { name: 'Meta Pixel dan pelacakan iklan', price: 'Rp 750.000' },
  { name: 'Form konsultasi tersimpan dan notifikasi email (Paket Mandiri)', price: 'Rp 1.500.000' },
  { name: 'Pekerjaan lain di luar paket', price: 'Rp 300.000 per jam' },
]

export const features = [
  {
    title: 'Profil yang meyakinkan',
    description:
      'Foto, pendidikan, pelatihan lanjutan, dan tempat praktik Anda tersusun rapi di satu alamat resmi.',
  },
  {
    title: 'Satu halaman untuk tiap prosedur',
    description:
      'Menjelaskan untuk siapa tindakan ditujukan, tahapan, pemulihan, risiko, dan pertanyaan yang sering diajukan.',
  },
  {
    title: 'Konsultasi lewat WhatsApp',
    description:
      'Tombol WhatsApp selalu terlihat. Dari halaman prosedur, pesan pembuka sudah menyebut nama tindakannya.',
  },
  {
    title: 'Artikel',
    description: 'Tulisan Anda tampil dengan daftar isi otomatis dan nyaman dibaca di ponsel.',
  },
  {
    title: 'YouTube dan Instagram',
    description:
      'Video terbaru dan unggahan pilihan tampil di beranda, ditambah halaman tautan untuk bio Instagram.',
  },
  {
    title: 'Mudah ditemukan di Google',
    description:
      'Data terstruktur untuk profil dokter, prosedur, artikel, dan FAQ dibuat otomatis, lengkap dengan sitemap.',
  },
]

export const steps = [
  {
    title: 'Pilih paket',
    description: 'Hubungi kami lewat WhatsApp, lalu kontrak dan pembayaran pertama diselesaikan.',
  },
  {
    title: 'Kirim materi',
    description: 'Foto, riwayat singkat, daftar prosedur, jadwal praktik, dan akun media sosial.',
  },
  {
    title: 'Tinjau tampilan',
    description: 'Kami memasang materi ke template. Anda meninjau dan meminta satu kali revisi.',
  },
  {
    title: 'Website online',
    description: 'Setelah uji coba disetujui, website diluncurkan di domain Anda.',
  },
]

export const terms = [
  'Desain mengikuti template seperti website contoh. Warna, foto, dan teks disesuaikan, sedangkan tata letak tidak diubah. Tidak ada pengerjaan desain custom.',
  'Materi dipasang sesuai naskah yang Anda berikan. Penyuntingan bahasa dan penulisan artikel tersedia sebagai layanan tambahan.',
  'Revisi satu kali pada tahap tampilan dan satu kali pada tahap uji coba.',
  'Pembayaran dibagi dua: 50% saat kontrak dan 50% sebelum website diluncurkan.',
  'Harga belum termasuk PPN (bila berlaku).',
]

export const faqs = [
  {
    question: 'Apakah desainnya bisa diubah sesuai keinginan saya?',
    answer:
      'Desain mengikuti template seperti website contoh. Kami menyesuaikan warna, foto, dan seluruh teksnya dengan identitas Anda, tetapi tata letaknya tetap. Dengan cara ini biaya lebih rendah dan website lebih cepat online.',
  },
  {
    question: 'Saya tidak sempat menulis. Apakah tetap bisa?',
    answer:
      'Bisa. Cukup kirim riwayat singkat dan poin penting tiap prosedur. Bila Anda ingin dibantu menulis artikel, layanan penulisan tersedia sebagai tambahan dan setiap tulisan Anda setujui dulu sebelum terbit.',
  },
  {
    question: 'Bisakah mulai dari Paket Profil lalu pindah ke Paket Mandiri?',
    answer:
      'Bisa. Dalam 12 bulan pertama Anda cukup membayar selisihnya. Tampilan dan alamat halaman tidak berubah.',
  },
  {
    question: 'Apakah domain didaftarkan atas nama saya?',
    answer: 'Ya. Domain didaftarkan atas nama Anda dan tetap menjadi milik Anda.',
  },
  {
    question: 'Apakah website menyimpan data pasien?',
    answer:
      'Tidak. Calon pasien langsung diarahkan ke WhatsApp, sehingga tidak ada data pasien yang tersimpan di website.',
  },
  {
    question: 'Apakah ada jaminan muncul di halaman pertama Google?',
    answer:
      'Tidak ada yang bisa menjamin peringkat tertentu. Yang kami pastikan adalah website dibangun sesuai praktik teknis yang dianjurkan Google dan cepat dibuka di ponsel.',
  },
]

export const subscriptionTerms = [
  `Paket berlangganan berlaku dengan kontrak minimal ${SUBSCRIPTION_MIN_MONTHS} bulan.`,
]

export const subscriptionFaqs = [
  {
    question: 'Apa beda sekali bayar dan berlangganan?',
    answer:
      'Pada sekali bayar, biaya di awal lebih besar, biaya tahun berikutnya kecil, dan kode sumber diserahkan kepada Anda. Pada berlangganan, biaya di awal lebih ringan dan perawatan sudah termasuk selama Anda berlangganan.',
  },
  {
    question: 'Apa yang terjadi bila saya berhenti berlangganan?',
    answer:
      'Website dinonaktifkan pada akhir periode. Domain dan seluruh konten tetap milik Anda, sedangkan template tidak diserahkan. Anda juga dapat beralih ke paket sekali bayar, silakan hubungi kami untuk perhitungannya.',
  },
]

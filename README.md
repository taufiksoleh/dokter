# Website Profil Dokter

Template website pribadi dokter: profil, info prosedur, artikel, tombol konsultasi WhatsApp, serta tautan Instagram dan YouTube. Satu kode dipakai untuk dua paket:

- **Paket Profil**: konten disimpan sebagai file Markdown, hasil build berupa file statis tanpa server dan database.
- **Paket Mandiri**: konten dikelola lewat panel admin di `/admin`, berjalan di server Node.js dengan database SQLite.

Dibangun dengan Next.js 16, TypeScript, CSS biasa dengan token, dan Payload CMS untuk panel admin.

## Menjalankan Paket Profil

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # hasil di folder out/
npm run preview    # menyajikan folder out/
npm run verify     # typecheck, lint, format, tes unit, build, tes browser
```

Tes browser memakai Chrome yang terpasang di komputer.

## Menjalankan Paket Mandiri (panel admin)

Semua perintah Paket Mandiri berakhiran `:cms` atau berawalan `cms:`.

```sh
cp .env.example .env.local    # lalu isi PAYLOAD_SECRET, misalnya dari: openssl rand -hex 32
npm run cms:migrate           # membuat struktur database di data/cms.db
npm run cms:import            # memindahkan isi folder content/ ke CMS
npm run dev:cms               # website di http://localhost:3000, panel admin di /admin
```

Saat `/admin` dibuka pertama kali, Payload menampilkan form pembuatan akun pengelola pertama. Di server sungguhan, buat akun itu lewat perintah supaya form tersebut tidak sempat dipakai orang lain:

```sh
CMS_ADMIN_EMAIL=dokter@contoh.id CMS_ADMIN_PASSWORD='kata-sandi-kuat' npm run cms:create-admin
```

Untuk produksi:

```sh
npm run build:cms   # menjalankan migrasi, lalu membangun ke folder .next-cms/
npm run start:cms
```

Build membaca konten dari database, jadi database harus sudah berisi (lewat `cms:import` atau panel admin) sebelum `build:cms` dijalankan.

### Yang bisa dilakukan dari panel admin

| Menu | Isi |
| --- | --- |
| Profil dokter | Identitas, foto, WhatsApp, tempat dan jadwal praktik, pendidikan, biografi, media sosial, video, unggahan Instagram |
| Prosedur | Halaman prosedur, angka ringkas, FAQ, pengaturan SEO, urutan tampil |
| Artikel | Tulisan dengan gambar sampul, topik, dan pengaturan SEO |
| Halaman | Halaman teks seperti Kebijakan Privasi |
| Gambar | Foto yang diunggah. Otomatis diperkecil ke lebar 1600 px dan diubah ke WebP |
| Pengalihan URL | Alamat lama ke alamat baru. Terisi otomatis saat alamat prosedur atau artikel yang sudah terbit diganti |
| Pengelola | Akun yang boleh masuk panel admin. Akun terkunci 15 menit setelah 5 kali salah kata sandi |

Prosedur dan artikel punya status draf. Draf tidak tampil di website dan tidak terbaca lewat API tanpa login. Perubahan yang diterbitkan langsung tampil tanpa build ulang.

### Yang perlu dijaga di server

- Folder `data/` (database) dan `media/` (gambar) harus berada di disk yang tidak ikut terhapus saat deploy. Backup cukup dengan menyalin kedua folder itu.
- `PAYLOAD_SECRET` tidak boleh berubah setelah website online, karena sesi login bergantung padanya.
- Perubahan struktur konten (menambah atau mengubah field di `src/cms/`) harus disertai file migrasi:

  ```sh
  npm run cms:migrate:create -- nama-perubahan
  npm run cms:migrate
  npm run cms:types
  ```

  Database tidak pernah diubah otomatis. `dev:cms` dan `build:cms` selalu menjalankan migrasi yang belum diterapkan.

### Tes Paket Mandiri

```sh
npm run test:cms            # konten dari CMS harus sama persis dengan konten dari file
npm run test:cms:browser    # alur panel admin pada build produksi
```

Keduanya memakai database sementara, sehingga `data/` dan `media/` tidak tersentuh. `test:cms:browser` membangun ulang folder `.next-cms/`, jadi jalankan `npm run build:cms` lagi sesudahnya bila folder itu dipakai untuk produksi.

## Publikasi ke Cloudflare

Berlaku untuk Paket Profil dan etalase, karena keduanya berupa file statis di folder `out/`.

Repo ini terhubung ke Cloudflare Workers Builds. Setiap push ke `main` menjalankan `npm run build`, lalu `npx wrangler deploy`. File `wrangler.jsonc` memberi tahu Wrangler bahwa yang diunggah adalah folder `out/` sebagai file statis. Jangan hapus file itu: tanpa file tersebut Wrangler menganggap proyek ini aplikasi Next.js dengan server, mencoba memasang adapter OpenNext, lalu gagal.

Pengaturan di dashboard Cloudflare (Settings > Build):

| Pengaturan | Nilai |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Build variable `NEXT_PUBLIC_SITE_URL` | Alamat website, diawali `https://` |
| Build variable `NEXT_PUBLIC_SHOWCASE` | `1` untuk etalase, kosong untuk klien |

`NEXT_PUBLIC_SITE_URL` disisipkan saat build. Bila domain berubah, website harus dibangun ulang.

Sebelum push, periksa secara lokal:

```sh
npm run check:publish                 # menolak bila masih ada nomor WhatsApp contoh atau alamat localhost
npm run build
npx wrangler deploy --dry-run         # memeriksa konfigurasi tanpa mengunggah
```

File `public/_headers` berisi header keamanan dan aturan cache yang dibaca Cloudflare. Gambar pratinjau saat tautan etalase dibagikan ada di `public/og-etalase.png`.

## Mode etalase

`NEXT_PUBLIC_SHOWCASE=1` menambahkan bilah "website contoh" di atas halaman dan halaman `/paket` berisi harga. Halaman dokter diberi `noindex` karena isinya fiktif. File `.env` di repo ini disetel ke mode etalase. Untuk klien, kosongkan nilainya.

## Yang harus diganti sebelum dipublikasikan

- `content/profile.md`: untuk klien, ganti `whatsapp.phone` dengan nomor dokter. Di website contoh, nomor ini sengaja sama dengan nomor penjual.
- `.env`: `NEXT_PUBLIC_SITE_URL`.

## Mengganti konten (Paket Profil)

Semua konten ada di folder `content/` dan divalidasi saat build. Bila ada field yang salah, build berhenti dan menyebut nama filenya.

| File | Isi |
| --- | --- |
| `content/profile.md` | Nama, gelar, foto, WhatsApp, tempat praktik, pendidikan, media sosial, video, unggahan Instagram. Isi di bawah frontmatter adalah biografi. |
| `content/procedures/*.md` | Satu file per prosedur. Nama file menjadi alamat halaman. |
| `content/articles/*.md` | Satu file per artikel. |
| `content/pages/kebijakan-privasi.md` | Kebijakan privasi. |

Subjudul `##` di dalam prosedur dan artikel otomatis menjadi daftar isi. Bentuk tiap field ada di `src/content/schema.ts`.

Gambar diletakkan di `public/` dan ditulis dengan ukuran aslinya (`width`, `height`). Karena build statis tidak mengubah ukuran gambar, siapkan foto dengan lebar sekitar 1200 px dalam format WebP atau JPG. Gambar di `public/demo/` hanya ilustrasi untuk website contoh.

Untuk menampilkan video terbaru secara otomatis, isi `youtubeChannelId`. Daftar video dibaca saat build, jadi pada Paket Profil jadwalkan build ulang harian di hosting agar video baru muncul.

## Mengganti warna dan harga

Seluruh warna, huruf, jarak, dan radius ada di `src/styles/tokens.css`. Angka paket hanya ada di `src/showcase/pricing.ts`.

## Struktur

```
content/                 konten Paket Profil dalam Markdown
src/app/(site)/          halaman website dokter
src/app/(showcase)/      halaman /paket, hanya dibangun dalam mode etalase
src/app/(payload)/       panel admin dan API, hanya dibangun dalam mode CMS
src/components/layout/   kerangka HTML, header, footer, tombol WhatsApp mengambang
src/components/sections/ bagian beranda
src/components/content/  halaman detail, daftar isi, FAQ
src/components/ui/       komponen kecil yang dipakai di banyak tempat
src/content/             kontrak sumber konten, pembaca file, pembaca CMS, skema validasi
src/cms/                 koleksi dan field panel admin, migrasi, impor konten
src/lib/                 WhatsApp, SEO, data terstruktur, format, YouTube
src/showcase/            harga dan identitas penjual
src/styles/              token dan gaya dasar
tests/unit/              tes unit
tests/browser/           tes browser Paket Profil
tests/cms/               tes kesamaan konten file dan CMS
tests/cms-browser/       tes browser panel admin
```

Akhiran file menentukan rute mana yang ikut dibangun: `.showcase.tsx` hanya dalam mode etalase, `.cms.tsx` dan `.cms.ts` hanya dalam mode CMS. Pengaturannya ada di `next.config.mjs`.

## Aturan yang dijaga

- Halaman dan komponen membaca konten hanya lewat `content` dari `src/content`. Keduanya tidak tahu apakah konten berasal dari file atau CMS. Kontraknya ada di `src/content/source.ts`, dan `tests/cms` memastikan kedua sumber mengembalikan data yang sama.
- Isi prosedur dan artikel selalu berupa Markdown. Editor di panel admin dibatasi pada format yang bisa ditulis sebagai Markdown (`src/cms/rich-text.ts`), sehingga satu komponen `Prose` merender keduanya.
- Alamat halaman diambil dari `routes` di `src/lib/site.ts`, bukan ditulis sebagai teks di komponen.
- Tautan WhatsApp selalu dibuat lewat `buildWhatsAppUrl` di `src/lib/whatsapp.ts`.
- Komponen adalah server component kecuali memang butuh interaksi. `npm run lint` menolak komponen browser yang mengimpor kode server atau CMS.

## Belum dikerjakan

- Deploy: belum ada konfigurasi server (layanan, reverse proxy, backup terjadwal) untuk Paket Mandiri.
- Email: belum ada pengirim email, jadi fitur "lupa kata sandi" panel admin belum berfungsi. Kata sandi bisa diganti oleh pengelola lain dari menu Pengelola.
- Google Analytics 4 dan pencatatan klik WhatsApp.
- Gambar pratinjau Open Graph dalam format PNG untuk website contoh. Ilustrasi contoh berformat SVG, yang tidak ditampilkan oleh WhatsApp dan media sosial.
- Unggahan Instagram otomatis.

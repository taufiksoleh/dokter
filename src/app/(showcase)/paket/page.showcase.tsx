import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { FaqList } from '@/components/content/FaqList'
import { SpineMark } from '@/components/ui/SpineMark'
import { formatRupiah } from '@/lib/format'
import { routes, showcaseShareImage } from '@/lib/site'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import {
  addOns,
  faqs,
  features,
  maintenance,
  plans,
  SHOW_SUBSCRIPTION,
  steps,
  SUBSCRIPTION_MIN_MONTHS,
  subscriptionFaqs,
  subscriptionTerms,
  terms,
  UPGRADE_PRICE,
} from '@/showcase/pricing'
import { PlanCard } from '@/showcase/PlanCard'
import { vendor } from '@/showcase/vendor'
import styles from './page.module.css'

const title = 'Paket Website Profil Dokter'
const description =
  'Website pribadi dokter dengan profil, info prosedur, artikel, dan tombol konsultasi WhatsApp. Lihat website contoh dan pilihan paketnya.'

const MONTHS_PER_YEAR = 12
const [profil] = plans
const visibleTerms = SHOW_SUBSCRIPTION ? [...terms, ...subscriptionTerms] : terms
const visibleFaqs = SHOW_SUBSCRIPTION ? [...faqs, ...subscriptionFaqs] : faqs

export const metadata: Metadata = {
  title: { absolute: `${title} | ${vendor.name}` },
  description,
  alternates: { canonical: routes.pricing },
  openGraph: {
    title,
    description,
    url: routes.pricing,
    locale: 'id_ID',
    images: [{ url: showcaseShareImage.src, alt: showcaseShareImage.alt }],
  },
  twitter: { card: 'summary_large_image', title, description },
}

function askUrl(message: string) {
  return buildWhatsAppUrl({ phone: vendor.whatsapp, message })
}

export default function PricingPage() {
  const subscriptionFirstYear =
    profil.subscription.setup + profil.subscription.monthly * MONTHS_PER_YEAR

  return (
    <>
      <section className={`container ${styles.hero}`}>
        <div>
          <p className="eyebrow">Website profil dokter</p>
          <h1 className={styles.heroTitle}>Website pribadi untuk dokter</h1>
          <p className={`lede ${styles.heroLede}`}>
            Profil, info prosedur, artikel, dan tombol konsultasi WhatsApp dalam satu website yang
            cepat dibuka di ponsel. Tampilannya sama dengan website contoh yang bisa Anda jelajahi
            sekarang.
          </p>
          <div className={styles.actions}>
            <Link href={routes.home} className="button">
              Lihat website contoh
              <ArrowRight aria-hidden="true" />
            </Link>
            <a href="#paket" className="button is-ghost">
              Lihat paket
            </a>
          </div>
        </div>
        <SpineMark className={styles.heroSpine} count={12} />
      </section>

      <section className="container section" aria-labelledby="fitur">
        <h2 id="fitur" className={styles.sectionTitle}>
          Yang Anda dapatkan
        </h2>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="paket" className={styles.plans}>
        <div className="container">
          <p className="eyebrow">Paket</p>
          <h2 className={styles.sectionTitle}>Pilihan paket</h2>
          <p className={styles.sectionLede}>
            Biaya dibayar satu kali dan kode sumber diserahkan kepada Anda. Domain dan hosting tahun
            pertama sudah termasuk.
          </p>
          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                name={plan.name}
                audience={plan.audience}
                recommended={plan.recommended}
                price={formatRupiah(plan.oneTime.price)}
                priceNote="satu kali bayar"
                includes={plan.oneTime.includes}
                href={askUrl(`Halo, saya tertarik dengan ${plan.name} (sekali bayar).`)}
              />
            ))}
          </div>

          {SHOW_SUBSCRIPTION && (
            <>
              <h2 className={`${styles.sectionTitle} ${styles.spaced}`}>Berlangganan</h2>
              <p className={styles.sectionLede}>
                Biaya awal lebih ringan, lalu dibayar bulanan. Perawatan sudah termasuk selama Anda
                berlangganan, dengan kontrak minimal {SUBSCRIPTION_MIN_MONTHS} bulan.
              </p>
              <div className={styles.planGrid}>
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    name={plan.name}
                    audience={plan.audience}
                    recommended={false}
                    price={formatRupiah(plan.subscription.monthly)}
                    priceNote={`per bulan, dengan biaya awal ${formatRupiah(plan.subscription.setup)}`}
                    includes={plan.subscription.includes}
                    href={askUrl(`Halo, saya tertarik dengan ${plan.name} (berlangganan).`)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {SHOW_SUBSCRIPTION && (
        <section className="container section" aria-labelledby="perbandingan">
          <h2 id="perbandingan" className={styles.sectionTitle}>
            Sekali bayar atau berlangganan?
          </h2>
          <p className={styles.sectionLede}>Perbandingan berikut memakai angka {profil.name}.</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Perihal</span>
                  </th>
                  <th scope="col">Sekali bayar</th>
                  <th scope="col">Berlangganan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Biaya di awal</th>
                  <td>{formatRupiah(profil.oneTime.price / 2)} (termin pertama)</td>
                  <td>{formatRupiah(profil.subscription.setup)}</td>
                </tr>
                <tr>
                  <th scope="row">Total tahun pertama</th>
                  <td>{formatRupiah(profil.oneTime.price)}</td>
                  <td>{formatRupiah(subscriptionFirstYear)}</td>
                </tr>
                <tr>
                  <th scope="row">Tahun kedua dan seterusnya</th>
                  <td>{formatRupiah(maintenance[0].yearly)} per tahun</td>
                  <td>{formatRupiah(profil.subscription.monthly * MONTHS_PER_YEAR)} per tahun</td>
                </tr>
                <tr>
                  <th scope="row">Update konten</th>
                  <td>3 kali di tahun pertama, lalu 6 kali per tahun</td>
                  <td>1 kali setiap bulan</td>
                </tr>
                <tr>
                  <th scope="row">Kepemilikan</th>
                  <td>Domain, konten, dan kode sumber milik Anda</td>
                  <td>Domain dan konten milik Anda</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="container section" aria-labelledby="perawatan">
        <h2 id="perawatan" className={styles.sectionTitle}>
          Perawatan dan layanan tambahan
        </h2>
        <p className={styles.sectionLede}>
          Biaya perawatan tahunan baru berlaku mulai tahun kedua. Pindah dari Paket Profil ke Paket
          Mandiri dalam 12 bulan pertama cukup membayar selisihnya, yaitu{' '}
          {formatRupiah(UPGRADE_PRICE)}.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Perawatan tahunan</th>
                <th scope="col">Biaya per tahun</th>
                <th scope="col">Cakupan</th>
              </tr>
            </thead>
            <tbody>
              {maintenance.map((item) => (
                <tr key={item.plan}>
                  <th scope="row">{item.plan}</th>
                  <td>{formatRupiah(item.yearly)}</td>
                  <td>{item.includes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Layanan tambahan</th>
                <th scope="col">Biaya</th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((item) => (
                <tr key={item.name}>
                  <th scope="row">{item.name}</th>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container section" aria-labelledby="cara-kerja">
        <h2 id="cara-kerja" className={styles.sectionTitle}>
          Dari pesan pertama sampai online
        </h2>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section" aria-labelledby="ketentuan">
        <h2 id="ketentuan" className={styles.sectionTitle}>
          Yang perlu diketahui
        </h2>
        <ul className={styles.terms}>
          {visibleTerms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </section>

      <div className="container section">
        <FaqList faqs={visibleFaqs} />
      </div>

      <section className="container section">
        <div className={styles.closing}>
          <h2>Masih menimbang paket yang cocok?</h2>
          <p>
            Ceritakan kebutuhan Anda lewat WhatsApp. Kami bantu memilih tanpa kewajiban apa pun.
          </p>
          <a
            className="button is-light"
            href={askUrl('Halo, saya ingin bertanya tentang paket website profil dokter.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            Tanya lewat WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}

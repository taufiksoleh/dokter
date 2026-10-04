import type { Profile } from '@/content'
import { SpineMark } from '@/components/ui/SpineMark'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import styles from './ConsultBand.module.css'

type ConsultBandProps = {
  whatsapp: Profile['whatsapp']
  /** Topik halaman tempat ajakan ini muncul, ikut disebut di pesan WhatsApp. */
  topic?: string
  title?: string
}

export function ConsultBand({
  whatsapp,
  topic,
  title = 'Ingin berkonsultasi langsung?',
}: ConsultBandProps) {
  return (
    <section className="container section">
      <div className={styles.band}>
        <div className={styles.copy}>
          <h2>{title}</h2>
          <p>
            Kirim pesan lewat WhatsApp untuk menanyakan jadwal atau membuat janji. Pesan dibalas
            pada jam praktik.
          </p>
          <WhatsAppLink whatsapp={whatsapp} topic={topic} className="button is-light" />
        </div>
        <SpineMark className={styles.spine} count={9} />
      </div>
    </section>
  )
}

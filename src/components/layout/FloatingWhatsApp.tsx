import type { Profile } from '@/content'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import styles from './FloatingWhatsApp.module.css'

/** Tombol WhatsApp yang selalu terlihat di sudut layar pada semua halaman. */
export function FloatingWhatsApp({ whatsapp }: { whatsapp: Profile['whatsapp'] }) {
  return (
    <WhatsAppLink
      whatsapp={whatsapp}
      label="WhatsApp"
      className={`button is-whatsapp ${styles.floating}`}
    />
  )
}

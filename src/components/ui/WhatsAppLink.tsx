import { MessageCircle } from 'lucide-react'
import type { Profile } from '@/content'
import { buildWhatsAppUrl, consultMessage } from '@/lib/whatsapp'

type WhatsAppLinkProps = {
  whatsapp: Profile['whatsapp']
  /** Nama prosedur atau judul artikel yang ikut disebut di pesan pembuka. */
  topic?: string
  label?: string
  className?: string
}

export function WhatsAppLink({
  whatsapp,
  topic,
  label = 'Konsultasi via WhatsApp',
  className = 'button is-whatsapp',
}: WhatsAppLinkProps) {
  const href = buildWhatsAppUrl({
    phone: whatsapp.phone,
    message: consultMessage(whatsapp.greeting, topic),
  })

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      <MessageCircle aria-hidden="true" />
      <span>{label}</span>
    </a>
  )
}

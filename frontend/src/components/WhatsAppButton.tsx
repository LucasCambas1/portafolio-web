import { useTranslation } from 'react-i18next'
import { whatsappLink } from '../data/site'
import WhatsAppLogo from './WhatsAppLogo'

/** Botón flotante fijo en la esquina: abre el chat de WhatsApp con un mensaje de saludo. */
export default function WhatsAppButton() {
  const { t } = useTranslation()

  return (
    <a
      href={whatsappLink(t('whatsapp.message'))}
      target="_blank"
      rel="noreferrer"
      aria-label={t('whatsapp.aria')}
      className="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-25" />
      <WhatsAppLogo size={34} className="relative" />
    </a>
  )
}

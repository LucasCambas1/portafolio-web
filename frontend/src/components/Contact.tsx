import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { site, whatsappLink } from '../data/site'
import { MailIcon } from './Icons'
import Reveal from './Reveal'
import Toast from './Toast'
import WhatsAppLogo from './WhatsAppLogo'

type Status = 'idle' | 'sending' | 'success' | 'error'

// En desarrollo: http://localhost:5080 (ver .env.example). En producción: la URL de tu API en .NET.
const API_URL = import.meta.env.VITE_API_URL ?? ''

// Cuánto tiempo se ve el aviso de enviado / error (ms).
const TOAST_MS = 3000

const fieldClass =
  'w-full min-w-0 rounded-[10px] border border-line2 bg-bg px-4 py-3.5 text-base text-ink placeholder:text-muted/60'

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const types = t('contact.form.types', { returnObjects: true }) as string[]
  const commitment = t('contact.commitment', { returnObjects: true }) as string[]

  // El aviso se quita solo a los 3 segundos.
  useEffect(() => {
    if (status !== 'success' && status !== 'error') return
    const timer = setTimeout(() => setStatus('idle'), TOAST_MS)
    return () => clearTimeout(timer)
  }, [status])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Sin permiso de portapapeles: el enlace mailto sigue funcionando.
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          type: data.get('type'),
          message: data.get('message'),
          website: data.get('website'), // campo trampa anti-spam: debe llegar vacío
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto flex max-w-[1160px] flex-wrap gap-10 px-4 py-16 sm:gap-14 sm:px-6 sm:py-24">
      <Reveal className="flex min-w-0 flex-[1_1_320px] flex-col gap-5 sm:flex-[1_1_380px] sm:gap-6">
        <div className="font-mono text-[13px] uppercase tracking-[0.18em] text-accent">{t('contact.eyebrow')}</div>
        <h2 className="font-display text-[1.9rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]">
          {t('contact.title')}
        </h2>
        <p className="text-muted">{t('contact.subtitle')}</p>

        <div className="relative transition-[translate] duration-300 hover:-translate-y-1">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 rounded-[14px] border border-line bg-surface p-5 pr-28 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_14px_36px_-20px_rgba(34,227,208,0.5)]"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-accent/10 text-accent">
              <MailIcon />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-display font-bold">{t('contact.emailLabel')}</span>
              <span className="break-all text-[15px] text-muted">{site.email}</span>
            </span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={t('contact.copyAria')}
            className={`absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
              copied ? 'border-green/50 bg-green/10 text-green' : 'border-line2 bg-bg text-muted hover:border-accent hover:text-ink'
            }`}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
            )}
            <span aria-live="polite">{copied ? t('contact.copied') : t('contact.copy')}</span>
          </button>
        </div>
        <a
          href={whatsappLink(t('whatsapp.message'))}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-[14px] border border-line bg-surface p-5 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#25d366] hover:shadow-[0_14px_36px_-20px_rgba(37,211,102,0.5)]"
        >
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-[#25d366]/10 text-[#25d366]">
            <WhatsAppLogo size={24} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-display font-bold">{t('whatsapp.label')}</span>
            <span className="break-all text-[15px] text-muted">{site.whatsappDisplay}</span>
          </span>
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-[14px] border border-line bg-surface p-5 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-violet hover:shadow-[0_14px_36px_-20px_rgba(167,139,250,0.5)]"
        >
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-violet/10 font-mono font-medium text-violet">
            in
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-display font-bold">{t('contact.linkedinLabel')}</span>
            <span className="break-all text-[15px] text-muted">{site.linkedinHandle}</span>
          </span>
        </a>

        <div className="mt-2 flex flex-col gap-1.5">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{t('contact.commitmentTitle')}</div>
          {commitment.map((c) => (
            <div key={c} className="text-[15px]">
              <span className="text-accent">✓</span> {c}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={150} className="min-w-0 flex-[1_1_320px] sm:flex-[1_1_440px]">
      <form
        onSubmit={handleSubmit}
        className="flex h-full flex-col gap-5 rounded-[20px] border border-line bg-surface p-5 sm:p-8"
      >
        {/* Campo trampa: los humanos no lo ven, los bots sí lo completan */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-muted">{t('contact.form.name')}</label>
          <input id="name" name="name" type="text" required maxLength={100} placeholder={t('contact.form.namePlaceholder')} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-muted">{t('contact.form.email')}</label>
          <input id="email" name="email" type="email" required maxLength={150} placeholder={t('contact.form.emailPlaceholder')} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-sm text-muted">{t('contact.form.type')}</label>
          <select id="type" name="type" defaultValue="" className={fieldClass}>
            <option value="">{t('contact.form.typeDefault')}</option>
            {types.map((ty) => (
              <option key={ty} value={ty}>{ty}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-muted">{t('contact.form.message')}</label>
          <textarea id="message" name="message" rows={4} required minLength={10} maxLength={2000} placeholder={t('contact.form.messagePlaceholder')} className={`${fieldClass} resize-y`} />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="min-h-12 flex-[1_1_160px] cursor-pointer rounded-[10px] bg-linear-to-r from-accent to-accent2 px-6 py-4 font-bold text-[#04101a] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
          >
            {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
          </button>
          <a
            href={`mailto:${site.email}`}
            className="flex min-h-12 flex-[1_1_160px] items-center justify-center rounded-[10px] border border-line2 bg-bg px-6 py-4 font-medium transition-colors hover:border-accent"
          >
            {t('contact.form.sendEmail')}
          </a>
        </div>

      </form>
      </Reveal>

      {(status === 'success' || status === 'error') && (
        <Toast
          key={status}
          variant={status}
          title={status === 'success' ? t('contact.form.successTitle') : t('contact.form.errorTitle')}
          message={status === 'success' ? t('contact.form.success') : t('contact.form.error')}
          duration={TOAST_MS}
        />
      )}
    </section>
  )
}

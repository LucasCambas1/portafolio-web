import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { site } from '../data/site'

/** Copia el link del portafolio al portapapeles y confirma con un tilde. */
export default function CopyLinkButton() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.url)
    } catch {
      // Navegadores sin API de portapapeles: se copia con un campo temporal.
      const input = document.createElement('textarea')
      input.value = site.url
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      try {
        document.execCommand('copy')
      } catch {
        /* sin soporte */
      }
      document.body.removeChild(input)
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`flex items-center gap-2 self-start rounded-[10px] border px-4 py-2.5 text-sm font-medium transition-[border-color,color] duration-300 ${
        copied ? 'border-accent text-accent' : 'border-line2 text-muted hover:border-accent hover:text-ink'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        ) : (
          <>
            <path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? t('footer.copied') : t('footer.copyLink')}</span>
    </button>
  )
}

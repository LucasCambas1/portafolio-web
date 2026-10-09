import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Status = 'idle' | 'loading' | 'done'

/**
 * Botón de descarga del CV con animación: al hacer clic se llena una barra de progreso,
 * luego aparece un tilde y vuelve a su estado normal. La descarga la hace el navegador (atributo download).
 */
export default function CvButton({ href }: { href: string }) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  function handleClick() {
    if (status !== 'idle') return
    setStatus('loading')
    timers.current.push(
      window.setTimeout(() => setStatus('done'), 900),
      window.setTimeout(() => setStatus('idle'), 3200),
    )
  }

  const labels: Record<Status, string> = {
    idle: t('hero.ctaCv'),
    loading: t('hero.cvDownloading'),
    done: t('hero.cvDone'),
  }

  return (
    <a
      href={href}
      download
      onClick={handleClick}
      className={`relative flex-1 overflow-hidden rounded-[10px] border px-7 py-[15px] text-center font-medium transition-[border-color,color,translate] duration-300 hover:-translate-y-0.5 sm:flex-none ${
        status === 'idle' ? 'border-line2 text-muted hover:border-accent hover:text-ink' : 'border-accent text-accent'
      }`}
    >
      {status === 'loading' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left animate-[cv-fill_0.9s_ease-out_forwards] bg-accent/15"
        />
      )}
      {/* Las tres etiquetas ocupan el mismo lugar, así el botón no cambia de ancho. */}
      <span className="relative grid items-center justify-items-center" aria-live="polite">
        {(['idle', 'loading', 'done'] as Status[]).map((s) => (
          <span
            key={s}
            className={`col-start-1 row-start-1 flex items-center gap-2 ${status === s ? '' : 'invisible'}`}
            aria-hidden={status !== s}
          >
            {s === 'done' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="animate-[pop-in_0.4s_ease-out_both]">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={s === 'loading' ? 'animate-[icon-bounce_0.6s_ease-in-out_infinite]' : ''}>
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
              </svg>
            )}
            {labels[s]}
          </span>
        ))}
      </span>
    </a>
  )
}

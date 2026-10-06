import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

interface Item {
  period: string
  title: string
  org: string
  desc: string
  current?: boolean
}

// Un color por entrada (clases completas para que Tailwind las detecte).
const tones = [
  { dot: 'bg-accent', ring: 'border-accent/60', hover: 'hover:border-accent hover:shadow-[0_14px_36px_-20px_rgba(34,227,208,0.5)]' },
  { dot: 'bg-violet', ring: 'border-violet/60', hover: 'hover:border-violet hover:shadow-[0_14px_36px_-20px_rgba(167,139,250,0.5)]' },
  { dot: 'bg-amber', ring: 'border-amber/60', hover: 'hover:border-amber hover:shadow-[0_14px_36px_-20px_rgba(242,184,75,0.5)]' },
]

export default function Experience() {
  const { t } = useTranslation()
  const items = t('experience.items', { returnObjects: true }) as Item[]

  return (
    <section id="experience" className="mx-auto flex max-w-[1160px] flex-col gap-10 px-4 py-16 sm:gap-14 sm:px-6 sm:py-24">
      <SectionHeader eyebrow={t('experience.eyebrow')} title={t('experience.title')} subtitle={t('experience.subtitle')} />

      <ol className="relative mx-auto w-full max-w-3xl">
        {/* Línea vertical de la trayectoria */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[11px] top-2 w-px bg-linear-to-b from-accent/70 via-line2 to-transparent"
        />

        {items.map((item, i) => {
          const tone = tones[i % tones.length]
          return (
            <li key={item.title} className="relative pb-8 pl-12 last:pb-0 sm:pb-10">
              {/* Punto de la línea (el actual late) */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-bg ${tone.ring}`}
              >
                {item.current && (
                  <span className={`absolute h-2.5 w-2.5 animate-ping rounded-full opacity-70 ${tone.dot}`} />
                )}
                <span className={`relative h-2.5 w-2.5 rounded-full ${tone.dot}`} />
              </span>

              <Reveal delay={i * 120}>
                <article
                  className={`rounded-2xl border border-line bg-surface p-5 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 sm:p-6 ${tone.hover}`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">{item.period}</span>
                    {item.current && (
                      <span className="flex items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-green">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
                        {t('experience.current')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug">{item.title}</h3>
                  <div className="mt-0.5 text-[15px] font-medium text-accent">{item.org}</div>
                  <p className="mt-3 text-[15px] text-muted">{item.desc}</p>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

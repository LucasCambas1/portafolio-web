import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import SectionHeader from './SectionHeader'
import { ClipboardIcon, CodeIcon, LayoutIcon, ServerIcon } from './Icons'

interface ServiceDef {
  key: 'web' | 'api' | 'react' | 'consulting'
  Icon: ComponentType<{ className?: string }>
  tile: string
  tags: string[]
}

const services: ServiceDef[] = [
  { key: 'web', Icon: LayoutIcon, tile: 'bg-accent/10 text-accent', tags: ['.NET', 'React', 'PostgreSQL'] },
  { key: 'api', Icon: ServerIcon, tile: 'bg-violet/10 text-violet', tags: ['C#', 'ASP.NET Core', 'REST'] },
  { key: 'react', Icon: CodeIcon, tile: 'bg-amber/10 text-amber', tags: ['React', 'Next.js', 'TypeScript'] },
  { key: 'consulting', Icon: ClipboardIcon, tile: 'bg-green/10 text-green', tags: ['Requerimientos', 'UML', 'GRASP'] },
]

export default function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="mx-auto flex max-w-[1160px] flex-col gap-10 px-4 py-16 sm:gap-14 sm:px-6 sm:py-24">
      <SectionHeader eyebrow={t('services.eyebrow')} title={t('services.title')} subtitle={t('services.subtitle')} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ key, Icon, tile, tags }, i) => (
          <Card key={key} delay={i * 110} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tile}`}>
              <Icon />
            </div>
            <h3 className="font-display text-xl font-bold leading-snug">{t(`services.items.${key}.title`)}</h3>
            <p className="text-[15px] text-muted">{t(`services.items.${key}.desc`)}</p>
            <ul className="mt-auto flex flex-wrap gap-1.5 font-mono text-[11px] text-muted">
              {tags.map((tag) => (
                <li key={tag} className="rounded-md border border-line2 px-2 py-0.5">
                  {tag}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}

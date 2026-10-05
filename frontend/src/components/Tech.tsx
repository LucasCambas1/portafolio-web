import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import SectionHeader from './SectionHeader'
import { ClipboardIcon, CodeIcon, ServerIcon } from './Icons'

const groups: { key: 'frontend' | 'backend' | 'tools'; Icon: ComponentType<{ className?: string }>; color: string }[] = [
  { key: 'frontend', Icon: CodeIcon, color: 'text-accent' },
  { key: 'backend', Icon: ServerIcon, color: 'text-violet' },
  { key: 'tools', Icon: ClipboardIcon, color: 'text-amber' },
]

export default function Tech() {
  const { t } = useTranslation()

  return (
    <section id="tech" className="mx-auto flex max-w-[1160px] flex-col gap-10 px-4 py-16 sm:gap-14 sm:px-6 sm:py-24">
      <SectionHeader eyebrow={t('tech.eyebrow')} title={t('tech.title')} subtitle={t('tech.subtitle')} />
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {groups.map(({ key, Icon, color }, i) => {
          const items = t(`tech.groups.${key}.items`, { returnObjects: true }) as string[]
          return (
            <Card key={key} delay={i * 120} className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-7 sm:last:col-span-2 lg:last:col-span-1">
              <h3 className="flex items-center gap-3 font-display text-xl font-bold">
                <Icon className={color} />
                {t(`tech.groups.${key}.title`)}
              </h3>
              <ul className="flex flex-col text-[15px] text-muted">
                {items.map((item) => (
                  <li key={item} className="border-b border-line py-3 transition-[translate,color] duration-300 first:pt-0 last:border-b-0 last:pb-0 hover:translate-x-1.5 hover:text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

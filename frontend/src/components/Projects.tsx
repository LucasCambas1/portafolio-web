import { useTranslation } from 'react-i18next'
import Card from './Card'
import SectionHeader from './SectionHeader'
import { ArrowUpRight } from './Icons'
import { projects, site, type Project } from '../data/site'

const colorStyles: Record<Project['color'], { badge: string; tag: string; cover: string; highlight: string }> = {
  accent: {
    badge: 'bg-accent/10 text-accent',
    tag: 'text-accent',
    highlight: 'border-accent/40 bg-accent/10 text-accent',
    cover: 'from-[#0e1630] to-surface',
  },
  violet: {
    badge: 'bg-violet/10 text-violet',
    tag: 'text-violet',
    highlight: 'border-violet/40 bg-violet/10 text-violet',
    cover: 'from-[#150e30] to-surface',
  },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation()
  const c = colorStyles[project.color]
  const base = `projects.items.${project.id}`
  const highlights = t(`${base}.highlights`, { returnObjects: true, defaultValue: [] }) as string[]

  return (
    <Card delay={index * 130} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      {project.image ? (
        <div className="overflow-hidden border-b border-line">
          <img
            src={project.image}
            alt={t(`${base}.title`)}
            className="h-[190px] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[220px]"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className={`flex h-[190px] items-center justify-center sm:h-[220px] border-b border-line bg-linear-to-br font-mono text-[13px] text-muted ${c.cover}`}
        >
          {t('projects.imagePlaceholder')}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-7">
        <span className={`self-start rounded-md px-2.5 py-1 font-mono text-xs ${c.badge}`}>{t(`${base}.badge`)}</span>
        <h3 className="font-display text-2xl font-bold">{t(`${base}.title`)}</h3>
        <p className="text-[15px] text-muted">{t(`${base}.desc`)}</p>
        {highlights.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {highlights.map((h) => (
              <li
                key={h}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-semibold ${c.highlight}`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21.1l1.6-7L2 9.3l7.1-.7L12 2z" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        )}
        <ul className={`flex flex-wrap gap-1.5 font-mono text-[11px] ${c.tag}`}>
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-line2 px-2 py-0.5">
              {tag}
            </li>
          ))}
        </ul>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-auto flex items-center gap-2 pt-2 font-medium transition-colors hover:text-accent"
          >
            {t('projects.details')}
            <ArrowUpRight />
          </a>
        )}
      </div>
    </Card>
  )
}

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="mx-auto flex max-w-[1160px] flex-col gap-10 px-4 py-16 sm:gap-14 sm:px-6 sm:py-24">
      <SectionHeader eyebrow={t('projects.eyebrow')} title={t('projects.title')} subtitle={t('projects.subtitle')} />
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
        <Card plain delay={projects.length * 130} className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border-[1.5px] border-dashed border-line2 p-8 text-center md:min-h-[320px]">
          <div className="font-mono text-[13px] text-muted">{t('projects.next.label')}</div>
          <h3 className="font-display text-[22px] font-bold">{t('projects.next.title')}</h3>
          <p className="text-[15px] text-muted">{t('projects.next.desc')}</p>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-[10px] border border-line2 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-accent"
          >
            {t('projects.next.cta')}
          </a>
        </Card>
      </div>
    </section>
  )
}

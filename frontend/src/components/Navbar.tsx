import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveSection } from '../hooks/useActiveSection'
import { site } from '../data/site'
import ThemeToggle from './ThemeToggle'
import { ArrowUpRight, CloseIcon, MenuIcon } from './Icons'

const links = [
  { id: 'services', key: 'nav.services' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'tech', key: 'nav.tech' },
  { id: 'contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = i18n.language === 'en' ? 'en' : 'es'
  const activeSection = useActiveSection(links.map((l) => l.id))

  const langButton = (lng: 'es' | 'en') => (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(lng)}
      aria-pressed={current === lng}
      className={`px-3.5 py-2 transition-colors sm:px-3 sm:py-1.5 ${
        current === lng ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
      }`}
    >
      {lng.toUpperCase()}
    </button>
  )

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight sm:text-[22px]">
          {site.brand.first}
          <span className="text-accent">{site.brand.highlight}</span>
          {site.brand.tld}
        </a>

        <nav className="hidden items-center gap-8 text-[15px] md:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={activeSection === l.id ? 'true' : undefined}
              className={`relative py-1 transition-colors hover:text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-linear-to-r after:from-accent after:to-accent2 after:transition-transform after:duration-300 ${
                activeSection === l.id ? 'text-ink after:scale-x-100' : 'text-ink/75 after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <div className="flex overflow-hidden rounded-full border border-line2 font-mono text-[13px]">
            {langButton('es')}
            {langButton('en')}
          </div>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-[10px] border border-line2 bg-surface px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-accent sm:flex"
          >
            {t('nav.cta')}
            <ArrowUpRight />
          </a>
          <button
            type="button"
            className="-mr-1 rounded-lg p-3 md:hidden"
            aria-label={t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line/60 px-4 pb-5 sm:px-6 md:hidden" aria-label="Móvil">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-3.5 text-[16px] transition-colors hover:text-accent"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-[10px] bg-linear-to-r from-accent to-accent2 px-5 py-3 font-bold text-on-accent"
              >
                {t('nav.cta')}
                <ArrowUpRight />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

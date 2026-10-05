import { useTranslation } from 'react-i18next'
import { site, whatsappLink } from '../data/site'

const linkClass = 'text-muted transition-colors hover:text-accent'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-10 px-4 pb-8 pt-12 sm:px-6 sm:pt-14">
        <div className="flex flex-wrap justify-between gap-x-10 gap-y-9 sm:gap-x-16 sm:gap-y-10">
          <div className="flex max-w-[360px] flex-[2_1_280px] flex-col gap-3.5">
            <div className="font-display text-[22px] font-extrabold tracking-tight">
              {site.brand.first}
              <span className="text-accent">{site.brand.highlight}</span>
              {site.brand.tld}
            </div>
            <p className="text-[15px] text-muted">{t('footer.tagline')}</p>
          </div>

          <nav className="flex flex-[1_1_140px] flex-col gap-2.5 text-[15px]" aria-label={t('footer.navigation')}>
            <div className="font-display font-bold">{t('footer.navigation')}</div>
            <a className={linkClass} href="#services">{t('nav.services')}</a>
            <a className={linkClass} href="#projects">{t('nav.projects')}</a>
            <a className={linkClass} href="#tech">{t('nav.tech')}</a>
            <a className={linkClass} href="#contact">{t('nav.contact')}</a>
          </nav>

          <div className="flex flex-[1_1_140px] flex-col gap-2.5 text-[15px]">
            <div className="font-display font-bold">{t('footer.projects')}</div>
            <a className={linkClass} href="#projects">{t('projects.items.syscar.title')}</a>
            <a className={linkClass} href="#projects">{t('projects.items.expedientes.title')}</a>
          </div>

          <div className="flex flex-[1_1_140px] flex-col gap-2.5 text-[15px]">
            <div className="font-display font-bold">{t('footer.social')}</div>
            <a className={linkClass} href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className={linkClass} href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className={linkClass} href={whatsappLink(t('whatsapp.message'))} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm text-muted">
          <span>{t('footer.rights')}</span>
          <span className="font-mono">
            {site.brand.first}{site.brand.highlight}{site.brand.tld}
          </span>
        </div>
      </div>
    </footer>
  )
}

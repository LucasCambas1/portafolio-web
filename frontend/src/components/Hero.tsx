import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import { ArrowRight } from './Icons'

interface Stat {
  value: string
  label: string
}

function Chip({ className, dot, hover, delay, children }: { className: string; dot: string; hover: string; delay: string; children: string }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={`group absolute flex animate-[float_6s_ease-in-out_infinite] cursor-default items-center gap-2.5 rounded-xl border border-line2 bg-surface px-4 py-2.5 text-sm font-medium transition-[translate,scale,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:scale-105 ${hover} ${className}`}
    >
      <span className={`h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125 ${dot}`} />
      {children}
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const stats = t('hero.stats', { returnObjects: true }) as Stat[]

  return (
    <section id="top" className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-10 px-4 pb-16 pt-10 sm:gap-12 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-20">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6 sm:gap-7">
        <div style={{ animationDelay: '0ms' }} className="hero-in flex self-start items-center gap-2.5 rounded-full border border-green/30 bg-green/10 px-4 py-1.5 text-sm font-medium text-green">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
          </span>
          {t('hero.availability')}
        </div>
        <h1 style={{ animationDelay: '60ms' }} className="hero-in font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[68px]">
          {t('hero.title1')}{' '}
          <span className="bg-linear-to-r from-accent2 to-accent bg-clip-text text-transparent">
            {t('hero.title2')}
          </span>
        </h1>
        <p style={{ animationDelay: '120ms' }} className="hero-in max-w-[520px] text-base text-muted sm:text-lg lg:text-[19px]">{t('hero.description')}</p>

        <div style={{ animationDelay: '240ms' }} className="hero-in max-w-full self-start overflow-x-auto whitespace-nowrap rounded-[10px] border border-line2 bg-surface px-4 py-3 font-mono text-sm sm:px-[18px] sm:text-[15px]">
          <span className="text-accent">$</span> build --stack=<span className="text-violet">dotnet,react</span>
          <span className="animate-pulse">|</span>
        </div>

        <div style={{ animationDelay: '360ms' }} className="hero-in flex flex-wrap gap-3.5">
          <a
            href="#contact"
            className="group flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-linear-to-r from-accent to-accent2 px-7 py-[15px] font-bold text-[#04101a] transition-[opacity,translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_10px_30px_-10px_rgba(34,227,208,0.6)] sm:w-auto"
          >
            {t('hero.ctaPrimary')}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#projects"
            className="flex-1 rounded-[10px] border border-line2 bg-surface px-7 py-[15px] text-center font-medium transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent sm:flex-none"
          >
            {t('hero.ctaSecondary')}
          </a>
          <a
            href={site.cv}
            download
            className="flex-1 rounded-[10px] border border-line2 px-7 py-[15px] text-center font-medium text-muted transition-[border-color,color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-ink sm:flex-none"
          >
            {t('hero.ctaCv')}
          </a>
        </div>

        <dl style={{ animationDelay: '480ms' }} className="hero-in mt-3 flex flex-wrap gap-x-8 gap-y-5 sm:mt-5 sm:gap-10">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-2xl font-extrabold leading-tight sm:text-[30px]">{s.value}</dt>
              <dd className="m-0 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex min-w-0 flex-[1_1_380px] justify-center" aria-hidden="true">
        <div className="relative h-[420px] w-[380px] max-w-full origin-center animate-[fade-in_1s_ease-out_both] max-[420px]:h-[380px] max-[420px]:scale-[0.88]">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-line2" />
          <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-[glow_4s_ease-in-out_infinite] border-2 border-accent/80" />
          <img
            src={site.photo}
            alt=""
            className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-[0_0_40px_rgba(108,123,255,0.35)]"
          />
          <Chip className="left-0 top-[34px]" dot="bg-accent" hover="hover:border-accent hover:shadow-[0_12px_32px_-12px_rgba(34,227,208,0.6)]" delay="0s">.NET / C#</Chip>
          <Chip className="right-0 top-[84px]" dot="bg-green" hover="hover:border-green hover:shadow-[0_12px_32px_-12px_rgba(74,222,154,0.6)]" delay="-3s">{t('hero.chipIT')}</Chip>
          <Chip className="right-0 top-[256px]" dot="bg-violet" hover="hover:border-violet hover:shadow-[0_12px_32px_-12px_rgba(167,139,250,0.6)]" delay="-2s">Full-Stack</Chip>
          <Chip className="left-[60px] top-[366px]" dot="bg-amber" hover="hover:border-amber hover:shadow-[0_12px_32px_-12px_rgba(242,184,75,0.6)]" delay="-4s">React</Chip>
        </div>
      </div>
    </section>
  )
}

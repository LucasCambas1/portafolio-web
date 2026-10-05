import Reveal from './Reveal'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <Reveal className="flex flex-col items-center gap-4 text-center">
      <div className="font-mono text-[13px] uppercase tracking-[0.18em] text-accent">{eyebrow}</div>
      <h2 className="font-display text-[1.7rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
        {title}
      </h2>
      {subtitle && <p className="max-w-xl text-[15px] text-muted sm:text-base">{subtitle}</p>}
    </Reveal>
  )
}

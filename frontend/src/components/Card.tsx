import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface Props {
  children: ReactNode
  /** Clases de aspecto (borde, fondo, padding, layout...). */
  className?: string
  /** Retraso de aparición en ms, para que las tarjetas entren una tras otra. */
  delay?: number
  /** Borde punteado "vacío": sin brillo ni elevación al pasar el mouse. */
  plain?: boolean
}

/**
 * Tarjeta con tres efectos:
 * 1. Aparece al entrar en pantalla (fade + subida), escalonada con `delay`.
 * 2. Al pasar el mouse se eleva y el borde se ilumina.
 * 3. Un resplandor sigue al cursor dentro de la tarjeta.
 */
export default function Card({ children, className = '', delay = 0, plain = false }: Props) {
  const [ref, visible] = useInView<HTMLElement>()
  const [settled, setSettled] = useState(false)

  // Cuando terminó la animación de entrada, se quita el retraso para que el hover responda al instante.
  useEffect(() => {
    if (!visible) return
    const id = window.setTimeout(() => setSettled(true), delay + 750)
    return () => window.clearTimeout(id)
  }, [visible, delay])

  function handleMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  const hover = plain
    ? 'hover:border-accent/40'
    : 'hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_50px_-24px_rgba(34,227,208,0.4)]'

  return (
    <article
      ref={ref}
      onMouseMove={plain ? undefined : handleMove}
      style={{ transitionDelay: !settled && visible ? `${delay}ms` : undefined }}
      className={`group relative transition-[opacity,translate,border-color,box-shadow] ${
        settled ? 'duration-300' : 'duration-700'
      } ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${hover} ${className}`}
    >
      {children}
      {!plain && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(34, 227, 208, 0.09), transparent 65%)',
          }}
        />
      )}
    </article>
  )
}

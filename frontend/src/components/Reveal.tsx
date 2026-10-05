import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface Props {
  children: ReactNode
  className?: string
  /** Retraso en milisegundos, para escalonar varios elementos. */
  delay?: number
}

/** Hace que el contenido aparezca (fade + subida suave) cuando entra en pantalla. */
export default function Reveal({ children, className = '', delay = 0 }: Props) {
  const [ref, visible] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
      className={`transition-[opacity,translate] duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

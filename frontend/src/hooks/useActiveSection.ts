import { useEffect, useState } from 'react'

/** Devuelve el id de la sección que está en el centro de la pantalla (para resaltar el menú). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // Franja fina en el centro del viewport: la sección que la cruza es la activa.
      { rootMargin: '-45% 0px -50% 0px' },
    )

    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    elements.forEach((el) => observer.observe(el))

    // Al volver arriba de todo, ninguna sección queda activa.
    const onScroll = () => {
      if (window.scrollY < 80) setActive(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [key])

  return active
}

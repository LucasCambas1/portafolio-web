import { useEffect, useRef, useState } from 'react'

/**
 * Devuelve [ref, visible]. `visible` pasa a true (una sola vez) cuando el elemento entra en pantalla.
 * Si el navegador no soporta IntersectionObserver o el usuario pidió menos movimiento, queda visible de entrada.
 */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible] as const
}

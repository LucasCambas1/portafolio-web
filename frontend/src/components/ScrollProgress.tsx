import { useEffect, useRef } from 'react'

/** Línea fina de color arriba de todo que se llena a medida que bajás por la página. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const el = bar.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleX(${ratio})`
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        ref={bar}
        className="h-full origin-left bg-linear-to-r from-accent via-accent2 to-violet shadow-[0_0_12px_rgba(34,227,208,0.6)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

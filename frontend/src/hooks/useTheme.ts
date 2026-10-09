import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/** Tema claro/oscuro. El valor inicial lo fija un script en index.html (preferencia guardada o del sistema). */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  // Si la persona no eligió nada a mano, acompaña los cambios del sistema.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    function onChange(e: MediaQueryListEvent) {
      try {
        if (localStorage.getItem('theme')) return
      } catch {
        /* sin almacenamiento */
      }
      apply(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function apply(next: Theme) {
    const root = document.documentElement
    root.classList.add('theme-switching')
    root.setAttribute('data-theme', next)
    setTheme(next)
    window.setTimeout(() => root.classList.remove('theme-switching'), 400)
  }

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'light' ? 'dark' : 'light'
    apply(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* sin almacenamiento */
    }
  }, [])

  return { theme, toggle }
}

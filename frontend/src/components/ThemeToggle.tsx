import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'

/** Botón sol/luna: los dos íconos se cruzan con una rotación al cambiar de tema. */
export default function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? t('nav.themeToDark') : t('nav.themeToLight')}
      title={isLight ? t('nav.themeToDark') : t('nav.themeToLight')}
      className="relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full border border-line2 bg-surface text-muted transition-[border-color,color] duration-300 hover:border-accent hover:text-accent"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`absolute transition-[transform,opacity] duration-500 ease-out ${
          isLight ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`absolute transition-[transform,opacity] duration-500 ease-out ${
          isLight ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
        }`}
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  )
}

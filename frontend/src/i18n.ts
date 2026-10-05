import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'

function savedLanguage(): 'es' | 'en' {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'es'
  } catch {
    return 'es'
  }
}

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: savedLanguage(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem('lang', lng)
  } catch {
    /* sin almacenamiento disponible: se ignora */
  }
})

document.documentElement.lang = i18n.language

export default i18n

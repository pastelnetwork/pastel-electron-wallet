import i18next from 'i18next'
import Backend from 'i18next-http-backend'

import { defaultLang } from 'common/constants/languages'

const getDefaultLang = () => {
  const lang = localStorage.getItem('pastelLang')
  return lang || defaultLang
}

export const initTranslation = async (): Promise<void> => {
  await i18next.use(Backend).init({
    debug: true,
    interpolation: { escapeValue: false },
    ns: ['messages'],
    lng: getDefaultLang(),
    fallbackLng: false,
    backend: {
      loadPath: '/static/locales/{{lng}}/{{ns}}.json',
    },
  })
}

export const changeLanguage = async (lang: string): Promise<void> => {
  const url = `/static/locales/${lang}/messages.json`
  const http = new XMLHttpRequest()
  http.open('HEAD', url, false)
  http.send()
  if (http.status === 404) {
    i18next.changeLanguage(getDefaultLang())
  } else {
    i18next.changeLanguage(lang)
    localStorage.setItem('pastelLang', lang)
  }
}

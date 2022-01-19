import i18next, { TOptions, StringMap } from 'i18next'
import log from 'electron-log'

import { defaultLang } from 'common/constants/languages'
import locales from '_locales/index.json'

const checkExistLang = (url: string) => {
  const http = new XMLHttpRequest()
  http.open('HEAD', url, false)
  http.send()
  return http.status !== 404
}

const fetchLang = async (url: string) => {
  const res = await fetch(url)
  return await res.text()
}

const getResources = async () => {
  const langs = locales.filter(l => l.active)
  let resources = {}
  for (const lang of langs) {
    const code = lang.code
    try {
      const result = await fetchLang(`/static/locales/${code}/messages.json`)
      resources = {
        ...resources,
        [code]: {
          translation: JSON.parse(result),
        },
      }
    } catch (error) {
      log.error(error.message)
    }
  }

  return resources
}

const getDefaultLang = () => {
  const lang = localStorage.getItem('pastelLang')
  if (!lang) {
    return defaultLang
  }

  const url = `/static/locales/${lang}/messages.json`
  if (!checkExistLang(url)) {
    return defaultLang
  }

  return lang || defaultLang
}

export const initTranslation = async (): Promise<void> => {
  const resources = await getResources()
  await i18next.init({
    debug: true,
    interpolation: { escapeValue: false },
    lng: getDefaultLang(),
    fallbackLng: false,
    resources,
  })
}

export const changeLanguage = (lang: string): void => {
  const url = `/static/locales/${lang}/messages.json`
  if (!checkExistLang(url)) {
    i18next.changeLanguage(defaultLang)
  } else {
    i18next.changeLanguage(lang)
    localStorage.setItem('pastelLang', lang)
  }
}

export const translate = (
  key: string,
  option?: string | TOptions<StringMap> | undefined,
): string => {
  return i18next.t(`${key}.message`, option)
}

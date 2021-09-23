import i18n from 'i18n-js'
import { memoize } from 'lodash'
import * as RNLocalize from 'react-native-localize'
import store, { SET_DEVICE_LOCALE } from '../store'

const translationGetters = {
  ru: () => require('./ru.json'),
  en: () => require('./en.json'),
}

export const translate = memoize(
  (key, config) =>
    i18n.t(key, {
      defaultValue: key,
      ...config,
    }),
  (key, config) => (config ? key + JSON.stringify(config) : key),
)

export const setI18nConfig = () => {
  const fallback = {
    languageTag: 'en',
    isRTL: false,
  }

  const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback
  store.dispatch({ type: SET_DEVICE_LOCALE, payload: { locale: languageTag } })
  translate.cache.clear()

  i18n.translations = {
    [languageTag]: translationGetters[languageTag](),
  }
  i18n.locale = languageTag
}

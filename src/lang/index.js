import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementViLocale from 'element-ui/lib/locale/lang/vi';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import viLocale from './vi';
import enLocale from './en';

Vue.use(VueI18n)

const messages = {
  vi: {
    ...viLocale,
    ...elementViLocale
  },
  en: {
    ...enLocale,
    ...elementEnLocale
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = 'vi'
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'vi'
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
  silentTranslationWarn: true
})

export default i18n

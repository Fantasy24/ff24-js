import defaultSettings from '@/settings';
import i18n from '@/lang';

const title = defaultSettings.title || process.env.VUE_APP_HEADER

export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${title} - ${pageName}`
  }
  return `${title}`
}


// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title, $this = this) {
  if (title.startsWith('../')) {
    title = title.substring(3, title.length)
  }
  const hasKey = $this.$te('route.' + title.replace('../', ''))

  if (hasKey) {
    return $this.$t('route.' + title)
  }
  return title
}

export function cutLongTitle(title) {
  const MAX = 40
  if (title && title.length >= MAX) {
    const cutTitle = title.substring(0, MAX)
    return title.substring(0, cutTitle.lastIndexOf(' ')) + '...'
  } else {
    return title
  }
}

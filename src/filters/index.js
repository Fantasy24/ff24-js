// import parseTime, formatTime and set to filter
import moment from 'moment';
import {DATE_FORMAT} from '../utils/Constant';

export { parseTime, formatTime } from '../utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function compactMenuName(menuName) {
  const INDEX = 34
  if (menuName && menuName.length >= INDEX) {
    menuName = menuName.substring(0, INDEX).concat('...')
  }
  return menuName
}

export function formatFullDateTime(value) {
  if (value) {
    return moment(String(value)).format(DATE_FORMAT.DD_MM_YYYY_TIME)
  }
}

export function formatDate(value) {
  if (value) {
    return moment(String(value)).format(DATE_FORMAT.DD_MM_YYYY)
  }
}

export function formatFullDateTime_VN(value) {
  if (!value) return ''
  return moment(String(value)).format(DATE_FORMAT.DD_MM_YYYY_TIME)
}

export function checkDate(value) {
  return ((typeof value === 'string' && value.match('^[0-9]{4}-[0-9]{2}-[0-9]{2}[A-Za-z][0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}\\+[0-9]{2}:[0-9]{2}')) || value instanceof Date)
}

export function replaceEscapeChar(value) {
  if (value === undefined || value === null) return ''
  return (typeof value === 'string' && value.match(/<br ?\/?>/ig)) ? value.replace(/<br ?\/?>/ig, '\n') : value
}

import Cookies from 'js-cookie'
import {TOKEN} from './Constant'

export function getToken() {
  return Cookies.get(TOKEN)
}

export function setToken(token) {
  return Cookies.set(TOKEN, token, { secure: location.protocol !== 'http:' })
}

export function removeToken() {
  return Cookies.remove(TOKEN)
}

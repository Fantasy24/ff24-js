import Cookies from 'js-cookie'
import {TOKEN} from './Constant'

export function getToken() {
  // return Cookies.get(TOKEN)
  return localStorage.getItem(TOKEN)
}

export function setToken(token) {
  // return Cookies.set(TOKEN, token, { secure: location.protocol !== 'http:' })
  return localStorage.setItem(TOKEN,token)
}

export function removeToken() {
  // return Cookies.remove(TOKEN)
  return localStorage.removeItem(TOKEN)
}

import {getToken, setToken} from './authCookie'
import {REFRESH_TOKEN_TIME, WHITE_LIST} from './Constant'
import getPageTitle from './get-page-title'
import apiFactory from '../api/apiFactory'
import ConstantAPI from './ConstantAPI'
import {Message} from 'element-ui'
import {ERR_MSG} from './AlertMessage'

let intvRefreshToken

export function refreshToken(to, next, store) {
  clearInterval(intvRefreshToken)
  console.log(to.path)
  console.log(getToken())
  console.log("refreshToken")
  if (WHITE_LIST.indexOf(to.path) === -1 && getToken()) {
    intvRefreshToken = setInterval(() => {
      if (getToken()) {
        apiFactory.refreshToken(ConstantAPI.LOGIN.REFRESH_TOKEN, getToken()).then(rs => {
          setToken(rs.accessToken)
          store.commit('user/SET_TOKEN', rs.accessToken)
        }).catch(err => {      
          console.log("refreshToken Ex")
          if (err.response && err.response.data && err.response.data.status === 401) {
            console.log("refreshToken Exception")
            next(`/login?redirect=/dashboard`)
          }
        })
      } else {
        clearInterval(intvRefreshToken)
      }
    }, REFRESH_TOKEN_TIME)
  }
}

export async function beforeEach(to, from, next, NProgress, store, router) {

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.name)

  if (process.env.VUE_APP_TURN_OFF_AUTH === '1') {
    store.commit('permission/SET_ROUTES', [])
    next()
  } else {
    if (to.path === '/login') {
      localStorage.clear()
      sessionStorage.clear()
    }

    refreshToken(to, next, store)

    if (getToken()) {
      if (to.path === '/login') {
        next({path: '/'})
        NProgress.done()
      } else {
        const uid = store.getters.uid
        if (uid) {
          next()
        } else {
          try {
            await store.dispatch('user/getUserInfo')
            const accessRoutes = await store.dispatch('permission/generateRoutes')
            router.addRoutes(accessRoutes)
            next({...to, replace: true})
          } catch (error) {
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      if (WHITE_LIST.indexOf(to.path) !== -1) {
        next()
      } else {
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
  sessionStorage.removeItem(ERR_MSG)
}


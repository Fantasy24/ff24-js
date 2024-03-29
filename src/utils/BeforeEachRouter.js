import {getToken, setToken} from './authCookie'
import {REFRESH_TOKEN_TIME, WHITE_LIST} from './Constant'
import getPageTitle from './get-page-title'
import apiFactory from '../api/apiFactory'
import ConstantAPI from './ConstantAPI'
import {Message} from 'element-ui'
import {ERR_MSG} from './AlertMessage'
import {Base64} from 'js-base64';
import {asyncRoutes, constantRoutes,router} from '@/router/routerFactory'

let intvRefreshToken

export function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function refreshToken(to, next, store) {
  clearInterval(intvRefreshToken)
  // console.log(to.path)
  // console.log(getToken())
  // console.log("refreshToken")
  if (WHITE_LIST.indexOf(to.path) === -1 && getToken()) {
    intvRefreshToken = setInterval(() => {
      if (getToken()) {
        apiFactory.refreshToken(ConstantAPI.LOGIN.REFRESH_TOKEN, getToken()).then(rs => {
          setToken(rs.accessToken)
          store.commit('user/SET_TOKEN', rs.accessToken)
        }).catch(err => {      
          //console.log("refreshToken Ex")
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

    // refreshToken(to, next, store)
    const token =getToken()
    if (token) {
      if (to.path === '/login') {
        next({path: '/'})
        NProgress.done()
      } else {
        // const tokenPayload = parseJwt(token)
        // console.log("payload "+ tokenPayload)
        // const isReload =sessionStorage.getItem("router")
        // let sub = undefined
        // if(isReload === '1'){
        //   sub = tokenPayload.sub
          // const {iss, uid, ufn, org, dep, pos, ema, otp, avatar, orgName, posName, depName} = tokenPayload.userinfo;
          // commit('SET_ORG_NAME', `${org} - ${orgName}`);
          // commit('SET_POS_NAME', posName);
          // commit('SET_DEP_NAME', depName);
          // commit('SET_ISS', iss);
          // commit('SET_UID', sub);
          // commit('SET_UFN', ufn);
          // commit('SET_ORG', org);
          // commit('SET_DEP', dep);
          // commit('SET_POS', pos);
          // commit('SET_EMAIL', ema);
          // commit('SET_OTP', otp);
          // commit('SET_AVATAR', avatar);
          // commit('SET_USER_INFO', tokenPayload.userinfo);

          // const accessRoutesMnu = await store.dispatch('permission/generateRoutes')

          // const mnu = sessionStorage.getItem("mn")
          // const base64Routes = Base64.decode(mnu)
          // const routes = JSON.parse(base64Routes)
          // router.addRoutes(routes)
          //Chuyen sang luu base64 router
          // store.getters.permission_routes.push(routes[1])
          // router.options.routes.push(routes[1])
          
        // }
        
        //Thieu set router nen reload khong co menu
        const uid = store.getters.uid // || sub
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

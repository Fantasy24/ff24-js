import {getToken, removeToken, setToken} from '../utils/authCookie';
import {resetRouter} from '@/router/routerFactory';
import apiFactory from '../api/apiFactory';
import Message from 'element-ui/packages/message/src/main';
import ConstantAPI from '../utils/ConstantAPI';
import {Base64} from 'js-base64';

const state = {
  token: getToken(),
  userInfo: {},
  iss: '',
  exp: '',
  nbf: '',
  iat: '',
  jti: null,
  uid: '',
  ufn: '',
  org: '',
  dep: '',
  pos: '',
  ema: '',
  otp: '',
  posName: '',
  orgName: '',
  depName: '',
  avatar: ''
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ISS: (state, iss) => {
    state.iss = iss;
  },
  SET_UID: (state, uid) => {
    state.uid = uid;
  },
  SET_UFN: (state, ufn) => {
    state.ufn = ufn;
  },
  SET_ORG: (state, org) => {
    state.org = org;
  },
  SET_DEP: (state, dep) => {
    state.dep = dep;
  },
  SET_POS: (state, pos) => {
    state.pos = pos;
  },
  SET_EMAIL: (state, ema) => {
    state.ema = ema;
  },
  SET_OTP: (state, otp) => {
    state.otp = otp;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_POS_NAME: (state, posName) => {
    state.posName = posName;
  },
  SET_ORG_NAME: (state, orgName) => {
    state.orgName = orgName;
  },
  SET_DEP_NAME: (state, depName) => {
    state.depName = depName;
  }
};

const actions = {
  login({ commit }, userInfo) {
    //console.log(userInfo)
    return new Promise((resolve, reject) => {
    //   const res = `{
    //     "jwToken": "eyJhbGciOiJIUzUxMiJ9.eyJwZXJtaXNzaW9uIjpbeyJmdW5jdGlvbklkIjoiUEFZTElOSyIsInR5cGUiOiIxIiwiYXV0aG9yaXR5IjoicG8tc2VydmljZTpwYXltZW50L3RyYW5zYWN0aW9uOlBPU1QifSx7ImZ1bmN0aW9uSWQiOiJRTE5EIiwidHlwZSI6IjEiLCJhdXRob3JpdHkiOiJwby1zZXJ2aWNlOnBheW1lbnQvdHJhbnNhY3Rpb246UE9TVCJ9XSwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NjM4Mzg4OTAsImV4cCI6MTY2Mzg1Njg5MH0.k42tdylb9a3tHNJuInQxdaN1VKOKF1a7JP22j3lHXDhqbILaISgxyoBjENe4FQVNK9gBHhjY2vI2Sgu7UQf27A",
    //     "lstMenu": [
    //         {
    //             "path": "/paylink-ui",
    //             "name": "PAYLINK",
    //             "component": "./views/paylink/index",
    //             "hidden": false,
    //             "meta": {
    //                 "icon": "nested",
    //                 "title": "Paylink"
    //             },
    //             "children": [
    //                 {
    //                     "path": "QLND",
    //                     "name": "QLND",
    //                     "component": "./views/paylink/qtht/ql-nguoi-dung/ql-nguoi-dung",
    //                     "hidden": false,
    //                     "meta": {
    //                         "icon": "nested",
    //                         "title": "Quản lý người dùng"
    //                     },
    //                     "orderNo": 1
    //                 }
    //             ],
    //             "orderNo": 0
    //         }
    //     ],
    //     "userInfo": {
    //         "iss": null,
    //         "uid": "admin",
    //         "ufn": "admin",
    //         "ema": "admin@techcombank.com.vn",
    //         "dep": "admin",
    //         "depName": "admin",
    //         "pos": "admin",
    //         "posName": "admin",
    //         "org": null,
    //         "orgName": null,
    //         "otp": null
    //     }
    // }`

    // const response = JSON.parse(res)

    // if (response.tokenType !== 'otp') {
    //   // commit('SET_TOKEN', response.accessToken);

    //   commit('SET_TOKEN', response.jwToken);
    //   setToken(response.jwToken);

    //   //Set UserInfo
    //   sessionStorage.setItem("USER_INFO", JSON.stringify(response.userInfo));
    //   //Router
    //   const menu = response.lstMenu
    //   const smnu = JSON.stringify(menu)
    //   // const mnu = Base64.encode(smnu)
    //   sessionStorage.setItem("mn", smnu);
  
    //   console.log("setToken success")
    // }
    // resolve(response);

      apiFactory.callAPI(ConstantAPI.LOGIN.SIGN_IN, userInfo).then(response => {
        //console.log(response)
        if (response.tokenType !== 'otp') {
          // commit('SET_TOKEN', response.accessToken);

          commit('SET_TOKEN', response.jwToken);
          setToken(response.jwToken);

          //Set UserInfo
          //sessionStorage.setItem("USER_INFO", JSON.stringify(response.userInfo));
          //Router
          const menu = response.lstMenu
          const smnu = JSON.stringify(menu)
          // const mnu = Base64.encode(smnu)
          localStorage.setItem("mn", smnu);
      
          //console.log("setToken success")
        }
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // get user info
  getUserInfo({commit, state}) {
    if (!state.token) throw new Error('getUserInfo: Token không hợp lệ')
    return new Promise((resolve, reject) => {

      const token =getToken()
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      const tokenPayload = JSON.parse(jsonPayload);
      let userInfo = tokenPayload.userinfo
      //JSON.parse(sessionStorage.getItem("USER_INFO"));
      // const arrDK =[undefined,null,'']
      // if(arrDK.indexOf(userInfo) > -1){
      //   userInfo = state.userInfo
      // }
      const {iss, uid, ufn, org, dep, pos, ema, otp, avatar, orgName, posName, depName} = userInfo;
      commit('SET_ORG_NAME', `${org} - ${orgName}`);
      commit('SET_POS_NAME', posName);
      commit('SET_DEP_NAME', depName);
      commit('SET_ISS', iss);
      commit('SET_UID', uid);
      commit('SET_UFN', ufn);
      commit('SET_ORG', org);
      commit('SET_DEP', dep);
      commit('SET_POS', pos);
      commit('SET_EMAIL', ema);
      commit('SET_OTP', otp);
      commit('SET_AVATAR', avatar);
      commit('SET_USER_INFO', userInfo);

      sessionStorage.removeItem("USER_INFO")
      resolve(userInfo);

      // apiFactory.getUserInfo(ConstantAPI.LOGIN.VALIDATE_JOSE, state.token).then(data => {
      //   console.log(data)
      //   const {iss, uid, ufn, org, dep, pos, ema, otp, avatar, orgName, posName, depName} = data;
      //   commit('SET_ORG_NAME', `${org} - ${orgName}`);
      //   commit('SET_POS_NAME', posName);
      //   commit('SET_DEP_NAME', depName);
      //   commit('SET_ISS', iss);
      //   commit('SET_UID', uid);
      //   commit('SET_UFN', ufn);
      //   commit('SET_ORG', org);
      //   commit('SET_DEP', dep);
      //   commit('SET_POS', pos);
      //   commit('SET_EMAIL', ema);
      //   commit('SET_OTP', otp);
      //   commit('SET_AVATAR', avatar);
      //   commit('SET_USER_INFO', data);
      //   resolve(data);
      // }).catch(error => {
      //   reject(error);
      //   Message.error(error || 'Has Error');
      // });
    });
  },

  // user logout
  logout({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_TOKEN', '');
        commit('SET_UID', null);
        removeToken();
        resetRouter();
        localStorage.clear();
        sessionStorage.clear();
        dispatch('tagsView/delAllViews', null, {root: true});        
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  },
  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
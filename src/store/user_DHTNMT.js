import {getToken, removeToken, setToken} from '../utils/authCookie';
import {resetRouter} from '@/router/routerFactory';
import apiFactory from '../api/apiFactory';
import Message from 'element-ui/packages/message/src/main';
import ConstantAPI from '../utils/ConstantAPI_DHTNMT';

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
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      apiFactory.callAPI(ConstantAPI.LOGIN.SIGN_IN, userInfo).then(response => {
        console.log(response)
        if (response.tokenType !== 'otp') {
          commit('SET_TOKEN', response.accessToken);
          setToken(response.accessToken);
          
          console.log("setToken success")
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
      apiFactory.getUserInfo(ConstantAPI.LOGIN.VALIDATE_JOSE, state.token).then(data => {
        console.log(data)
        const {iss, uid, ufn, org, dep, pos, ema, otp, avatar, orgName, posName, depName} = data;
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
        commit('SET_USER_INFO', data);
        resolve(data);
      }).catch(error => {
        reject(error);
        Message.error(error || 'Has Error');
      });
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
        dispatch('tagsView/delAllViews', null, {root: true});
        localStorage.clear();
        sessionStorage.clear();
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

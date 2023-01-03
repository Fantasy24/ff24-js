import {asyncRoutes, constantRoutes} from '@/router/routerFactory'
import {createComponent} from '@/permission'
import apiFactory from '../api/apiFactory'
import ConstantAPI from '../utils/ConstantAPI_DHTNMT'
import MasterLayout from '@/layout/MasterLayout'
import i18n from '@/lang'
import store from '@/store'

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({commit}) {
        return new Promise((resolve, reject) => {
            apiFactory.apiGetMenuByPermission(ConstantAPI.LOGIN.GET_MENU_PERMISSION, store.getters.token, {appCode: process.env.VUE_APP_APP_CODE}).then(rs => {
                const menu = rs
                let routes = []
                if (menu && menu.length) {
                    routes = addMenuToRouter(menu)
                }
                commit('SET_ROUTES', routes)
                resolve(routes)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

const menuLang = {
    route: {
        Dashboard: 'Trang chủ',
        profile: 'Trang cá nhân'
    }
}

function addMenuToRouter(listMenu) {
    // console.log("asyncRoutes FF24")
    // console.log(asyncRoutes)
    // console.log("List menu ")
    // console.log(listMenu)
    // console.log(menuLang)    
    listMenu.forEach((menuItem, i) => {
        menuItem.component = MasterLayout
        menuItem.meta.title = `${i + 1}. ${menuItem.meta.title}`.toUpperCase()
        menuItem.meta.icon = menuItem.icon || 'nested'
        menuLang.route[menuItem.name.replace('../', '')] = menuItem.meta.title
        recMenuByLv(menuItem.children)
        asyncRoutes.push(menuItem)
    })
    // console.log("After forEarch")
    // console.log(asyncRoutes)
    // console.log(menuLang)    
    i18n.mergeLocaleMessage('vi', menuLang)
    return asyncRoutes
}

function recMenuByLv(listMenuChild) {
    if (listMenuChild && listMenuChild.length > 0) {
        listMenuChild.forEach(childItem => {
            menuLang.route[childItem.name] = childItem.meta.title
            try {
                childItem.component = createComponent(childItem.component)
                recMenuByLv(childItem.children)
            } catch (e) {
                delete childItem.component
                recMenuByLv(childItem.children)
                console.warn('Không tìm thấy menu (Tạo file [.vue] theo đường dẫn):', `${childItem.name}: ${e.message.replaceAll('Cannot find module ', '')}`)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

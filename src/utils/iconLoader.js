import Vue from 'vue'
import SvgIcon from 'etc-customs-lib/src/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('@/icons/svg', false, /\.svg$/)
const reqLib = require.context('etc-customs-lib/src/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
requireAll(reqLib) /* SVG common from lib*/


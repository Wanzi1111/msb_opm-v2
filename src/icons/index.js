import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('SvgIcon', SvgIcon)

// const req = require.context('./svg', false, /\.svg$/)
// const req = import.meta.globEager('./svg/*.svg')
// // const req = import.meta.glob('./svg/*.svg', { eager: true })
// const requireAll = requireContext => Object.keys(requireContext)
// // const requireAll = requireContext => Object.keys(requireContext)
// requireAll(req)

/*
 * @Author: ZhangYeLei
 * @Date: 2022-05-07 10:08:47
 * @LastEditTime: 2022-05-27 09:38:44
 * @LastEditors: ZhangYeLei
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/icon.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import 'virtual:svg-icons-register'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import './globalConfig'

import * as filters from './filters' // global filters

import Directives from '@/directive' // vue directive entry
Vue.use(Directives)

// import * as Sentry from '@sentry/vue'
// import { Integrations } from '@sentry/tracing'
// import { version, dsn } from './settings'

// if (import.meta.env.VITE_APP_ENV === 'prod') {
//   Sentry.init({
//     Vue,
//     dsn,
//     release: `msb-admin-operation-management@${version}`,
//     environment: import.meta.env.NODE_ENV,
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 1.0
//   })
// }

import '@/components/component-automation'

Vue.prototype.$bus = new Vue()

import Api from '@/api'
Vue.prototype.$api = Api

import mixins from './mixins'
Vue.mixin(mixins.global)
// Vue.prototype.$mixins = mixins;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (import.meta.env.NODE_ENV === 'production') {
// mockXHR()
// }

Vue.use(Element, {
  size: 'small' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

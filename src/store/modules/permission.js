/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-14 16:21:46
 * @LastEditTime: 2022-05-27 09:52:48
 * @LastEditors: ZhangYeLei
 */
import store from '@/store'
import router, { asyncRoutes } from '@/router'

const state = {
  routes: []
}

const mutations = {
  UP_NEWROUTER: (state, { routes }) => {
    state['routes'] = routes
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const keys = store.getters && store.getters.keys
      // eslint-disable-next-line no-inner-declarations
      function filterItem(children) {
        let index = 0
        while (index < children.length) {
          const i = keys.indexOf(children[index].name)
          if (i === -1 && children[index].name !== '*') {
            children.splice(index, 1)
            index--
          }
          index++
        }
        for (let index = 0; index < children.length; index++) {
          if (children[index].children?.length) {
            filterItem(children[index].children)
          }
        }
      }
      const routes = [...asyncRoutes]
      filterItem(routes)
      const { options: { routes: commonRoutes }} = router
      commit('UP_NEWROUTER', { routes: commonRoutes.concat(routes) })
      resolve(routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


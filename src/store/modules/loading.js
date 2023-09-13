/*
 * @Author: ZhangYeLei
 * @Date: 2022-03-25 17:40:47
 * @LastEditTime: 2022-04-14 16:19:29
 * @LastEditors: ZhangYeLei
 */
const loading = {}
// const apiFile = require.context('@/api', true, /\.js$/)
const apiFile = import.meta.globEager('@/api/**/*.js')
// const apiFile = import.meta.glob('@/api/**/*.js', { eager: true })
Object.keys(apiFile).reduce((modules, modulePath) => {
  for (var key in apiFile[modulePath]) {
    const str1 = apiFile[modulePath][key].toString().split(`url: '`)[1]
    if (str1) {
      const str = str1.split(`',`)[0]
      const strArr = str.replace(/\//g, '_')
      loading[strArr] = false
    }
  }
}, {})

const state = {
  loadings: loading
}

const mutations = {
  SET_LOAD: (state, { key, status }) => {
    // console.log('loading -->', key, status)
    state.loadings = {
      ...state.loadings,
      [key]: status
    }
  }
}

const actions = {
  setLoad({ commit }, { key, status }) {
    return new Promise((resolve, reject) => {
      commit('SET_LOAD', { key, status })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

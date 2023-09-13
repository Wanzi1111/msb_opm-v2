import { umsLogin, getInfo, ssoLogin } from '@/api/login/index'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import store from '@/store'

const state = {
  token: getToken('token'),
  name: getToken('cname'),
  userId: getToken('userId'),
  avatar: '',
  introduction: '',
  keys: ''
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_KEYS: (state, keys) => {
    state.keys = keys
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // sig, token, csessionid 滑块验证所需参数
    const { phoneOrEmail, password, sig, token, csessionid } = userInfo
    return new Promise((resolve, reject) => {
      umsLogin({ password: password, platform: 'OPM', userName: phoneOrEmail.trim(), sig, token, csessionid }).then(async (response) => {
        const { data: { token, name, id, keys }} = response

        commit('SET_TOKEN', token)
        commit('SET_KEYS', keys)
        commit('SET_USERID', id)
        setToken('token', token)
        setToken('cname', name || '')
        setToken('userId', id || '')

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  ssoLogin({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      try {
        ssoLogin(params)
          .then(({ token }) => {
            setToken('token', token)
            commit('SET_TOKEN', token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { keys, id, name } = data
        setToken('cname', name || '')
        setToken('userId', id || '')
        commit('SET_KEYS', keys)
        commit('SET_USERID', id)
        commit('SET_NAME', name)
        resolve(keys)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // - ***** - ***** - ***** -
      // 退出登录，清空token和权限，重置路由权限
      // - ***** - ***** - ***** -

      commit('SET_TOKEN', '')
      commit('SET_KEYS', '')
      commit('SET_USERID', '')
      removeToken('token')
      removeToken('BIToken')
      removeToken('cname')
      removeToken('userId')
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      store.commit('permission/UP_NEWROUTER', { routes: [] })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken('token')
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken('token', token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

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

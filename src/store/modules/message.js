import { getMessageDict } from '@/api/system-message'

const state = {
  dict: null,
  dictMap: null
}

const mutations = {
  SET_MESSAGE_DICT: (state, data) => {
    state.dict = data
  },
  SET_MESSAGE_DICT_MAP: (state, data) => {
    state.dictMap = data
  }
}

const actions = {
  getMessageDict({ commit }) {
    return new Promise((resolve) => {
      if (state.dict) {
        resolve()
        return
      }
      getMessageDict().then(dincRes => {
        const dincMap = {}
        Object.keys(dincRes.payload).forEach(v => {
          const map = {}
          dincRes.payload[v].forEach(val => {
            val.label = val.value
            val.value = val.code
            map[val.value] = val.label
          })
          dincMap[`${v}_map`] = map
        })
        commit('SET_MESSAGE_DICT', dincRes.payload)
        commit('SET_MESSAGE_DICT_MAP', dincMap)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

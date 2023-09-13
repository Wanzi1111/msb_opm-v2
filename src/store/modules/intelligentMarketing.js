/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-21 14:31:16
 * @LastEditTime: 2022-05-25 14:05:54
 * @LastEditors: ZhangYeLei
 */
import {
  getBIToken,
  getRootList,
  getPushDinc,
  getMarketingCallDict,
  listAllEventDropdownWithBiz,
  listAllUserPropDropdownWithBiz,
  ivrDict
} from '@/api/intelligentMarketing'
import { setToken, getToken } from '@/utils/auth'
import { transferAllPropData } from '@/views/intelligent-marketing/user-group/utils'

const transferData = (tree) => {
  if (tree.length) {
    tree.map(v => {
      v.label = v.name
      v.value = v.id + ''
      if (v.childList?.length) {
        v.children = transferData(v.childList)
      }
      return v
    })
  }
  return tree
}

const state = {
  rootList: null, // 业务线
  eventData: null, // 行为规则属性列表
  userPropData: null, // 用户基本属性列表
  pushDinc: null, // 营销push相关枚举
  pushDincMap: null, // 营销push相关枚举map映射
  callDinc: null, // 营销外呼相关枚举
  callDincMap: null, // 营销外呼相关枚举map映射
  ivrDinc: null, // IVR管理枚举
  ivrDincMap: null // IVR管理相关枚举map映射
}

const mutations = {
  SET_ROOTLIST: (state, data) => {
    state.rootList = data
  },
  SET_EVENTDATA: (state, data) => {
    state.eventData = data
  },
  SET_USERPROPDATA: (state, data) => {
    state.userPropData = data
  },
  SET_PUSHDINC: (state, data) => {
    state.pushDinc = data
  },
  SET_PUSHDINC_MAP: (state, data) => {
    state.pushDincMap = data
  },
  SET_BI_TOKEN: (state, data) => {
    state.BIToken = data
  },
  SET_CALL_DICT: (state, data) => {
    state.callDinc = data
  },
  SET_CALL_DICT_MAP: (state, data) => {
    state.callDincMap = data
  },
  SET_IVR_DICT: (state, data) => {
    state.ivrDinc = data
  },
  SET_IVR_DICT_MAP: (state, data) => {
    state.ivrDincMap = data
  }
}

const actions = {
  getBIToken({ commit }) {
    return new Promise(resolve => {
      if (getToken('BIToken')) {
        resolve()
        return
      }
      getBIToken().then(res => {
        const { accessToken } = res.result
        setToken('BIToken', `Bearer ${accessToken}`)
        resolve()
      })
    })
  },
  // 业务线
  getRootList({ commit }) {
    return new Promise(resolve => {
      if (state.rootList) {
        resolve()
        return
      }
      getRootList().then(res => {
        const data = transferData(res.result)
        commit('SET_ROOTLIST', data)
        resolve()
      })
    })
  },
  // 行为规则属性列表
  getEventData({ commit }) {
    return new Promise(resolve => {
      if (state.eventData) {
        resolve(state.eventData)
        return
      }
      listAllEventDropdownWithBiz()
        .then(res => {
          const data = transferAllPropData('event', res.result)
          commit('SET_EVENTDATA', data)
          resolve(data)
        })
    })
  },
  // 用户基本属性列表
  getUserPropData({ commit }) {
    return new Promise(resolve => {
      if (state.userPropData) {
        resolve(state.userPropData)
        return
      }
      listAllUserPropDropdownWithBiz()
        .then(res => {
          const data = transferAllPropData('basics', res.result)
          commit('SET_USERPROPDATA', data)
          resolve(data)
        })
    })
  },
  getPushDinc({ commit }) {
    return new Promise(resolve => {
      if (state.pushDinc) {
        resolve()
        return
      }
      getPushDinc().then(dincRes => {
        const dincMap = {}
        Object.keys(dincRes.payload).forEach(v => {
          const map = {}
          dincRes.payload[v].forEach(val => {
            val.label = val.desc
            val.value = val.code
            map[val.code] = val.desc
          })
          dincMap[`${v}_map`] = map
        })
        commit('SET_PUSHDINC', dincRes.payload)
        commit('SET_PUSHDINC_MAP', dincMap)
        resolve()
      })
    })
  },
  getMarketingCallDict({ commit }) {
    return new Promise(resolve => {
      if (state.callDinc) {
        resolve()
        return
      }
      getMarketingCallDict().then(dincRes => {
        const dincMap = {}
        Object.keys(dincRes.payload).forEach(v => {
          const map = {}
          dincRes.payload[v].forEach(val => {
            val.label = val.value
            val.value = val.code
            map[val.code] = val.label
          })
          dincMap[`${v}_map`] = map
        })
        commit('SET_CALL_DICT', dincRes.payload)
        commit('SET_CALL_DICT_MAP', dincMap)
        resolve()
      })
    })
  },
  getIvrDict({ commit }) {
    return new Promise(resolve => {
      if (state.ivrDinc) {
        resolve()
        return
      }
      ivrDict().then(dincRes => {
        const dincMap = {}
        Object.keys(dincRes.payload).forEach(v => {
          const map = {}
          dincRes.payload[v].forEach(val => {
            val.label = val.value
            val.value = val.code
            map[val.code] = val.label
          })
          dincMap[`${v}_map`] = map
        })
        commit('SET_IVR_DICT', dincRes.payload)
        commit('SET_IVR_DICT_MAP', dincMap)
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

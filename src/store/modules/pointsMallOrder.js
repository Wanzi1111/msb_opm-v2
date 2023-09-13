import {
  // getChannelList,
  getDiscountTypeIdAndShowName
} from '@/api/point-order/point-order'

const state = {
  baseData: {},
  baseDataMap: {}
}

const mutations = {
  UP_BASEDATA: (state, { baseData }) => {
    state['baseData'] = baseData
  },
  UP_BASEDATAMAP: (state, { baseDataMap }) => {
    state['baseDataMap'] = baseDataMap
  },
  CODE_SCREENSHOT: (state, codeScreenshot) => {
    state['codeScreenshot'] = codeScreenshot
  }
}

const actions = {
  getPointMallOrderBaseData({ commit, state }, data) {
    return new Promise((resolve) => {
      if (JSON.stringify(state.baseData) !== '{}') {
        resolve()
        return
      }
      // Promise.all([getChannelList(), getDiscountTypeIdAndShowName()])
      //   .then(([{ payload }, { payload: disCountPayload }]) => {
      Promise.all([getDiscountTypeIdAndShowName()])
        .then(([{ payload: disCountPayload }]) => {
          const baseData = {}
          const baseDataMap = {
            channel: {},
            disCount: {}
          }

          // baseData.channel = payload.map(v => {
          //   baseDataMap.channel[v.id] = v.channelName
          //   return { label: v.channelName, value: v.id }
          // })

          baseData.disCount = Object.keys(disCountPayload).map(v => {
            baseDataMap.disCount[v] = disCountPayload[v]
            return { label: disCountPayload[v], value: v }
          })
          commit('UP_BASEDATA', { baseData })
          commit('UP_BASEDATAMAP', { baseDataMap })
          resolve()
        })
    })
    // commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

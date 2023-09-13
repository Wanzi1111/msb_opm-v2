import {
  getBusinessList,
  getCouponSendWayList
} from '@/api/community-coupon-code-manage'

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
  }
}

const actions = {
  handleBaseData({ commit, state }, data) {
    return new Promise((resolve) => {
      if (JSON.stringify(state.baseData) !== '{}') {
        resolve()
        return
      }
      // Promise.all([getChannelList(), getDiscountTypeIdAndShowName()])
      //   .then(([{ payload }, { payload: disCountPayload }]) => {
      Promise.all([getBusinessList(), getCouponSendWayList()])
        .then(([{ payload }, { payload: sendWayPayload }]) => {
          const baseData = {}
          const baseDataMap = {
            business_map: {},
            sendWay_map: {}
          }

          baseData.business = payload.map(v => {
            baseDataMap.business_map[v.businessType] = v.businessName
            return { label: v.businessName, value: v.businessType }
          })
          baseData.sendWay = sendWayPayload.map(v => {
            baseDataMap.sendWay_map[v.sendType] = v.sendName
            return { label: v.sendName, value: v.sendType + '' }
          })

          commit('UP_BASEDATA', { baseData })
          commit('UP_BASEDATAMAP', { baseDataMap })
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

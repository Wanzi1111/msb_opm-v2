import baseData from '@/utils/enum'
import {
  codeScreenshotApproval
} from '@/api/operate/screenshot-approval'

const state = {
  baseData: {},
  baseDataMap: {},
  codeScreenshot: {}
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
  handleBaseData({ commit }, data) {
    return new Promise((resolve) => {
      if (baseData) {
        const baseDataMap = {}
        Object.keys(baseData).forEach(v => {
          let obj = {}
          if (Array.isArray(baseData[v])) {
            baseData[v].forEach(val => {
              obj[val.value] = val.label
            })
          } else {
            obj = { ...baseData[v] }
          }
          baseDataMap[`${v}_map`] = obj
        })
        window.baseData = baseData
        window.baseDataMap = baseDataMap
        commit('UP_BASEDATA', { baseData })
        commit('UP_BASEDATAMAP', { baseDataMap })
      }
      resolve()
    })
    // commit('CHANGE_SETTING', data)
  },
  // 转介绍截图审核字典 1v1
  async codeScreenshotApproval({ commit }, data) {
    // 获取字典
    const res = await codeScreenshotApproval()
    const { activityRewardType, activityType, turndownMsgType } = res.payload
    commit('CODE_SCREENSHOT', {
      activityRewardType: activityRewardType.map(item => { return { label: item.name, value: item.code } }),
      activityType: activityType.map(item => { return { label: item.name, value: item.code } }),
      turndownMsgType: turndownMsgType.map(item => { return { label: item.name, value: item.code } })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

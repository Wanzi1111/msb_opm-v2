import Cookies from 'js-cookie'
import { advertDin } from '@/api/ad-center/ad-input'
import { advertConfig } from '@/api/ad-center/ad-position'
import { positionConfig } from '@/api/ad-center/operat'
import { getBizLine } from '@/api/questionnaire/index'
import { rActivityBusinessList } from '@/api/operate/activity-api.js'
import { listCommentLabel } from '@/api/operate/class-evaluate'
import { line } from '@/api/points-mall/mall-admin'

const state = {
  artConfig: {},
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  adConfig: null,
  activityConfig: null,
  operatConfig: null,
  bizLine: null, // 问卷中心 获取业务线和问卷类型
  labelData: null,
  mallConfig: null,
  btnName: '新增'
}

const mutations = {
  SET_BTNNAME: (state, res) => {
    state.btnName = res
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_ACONFIG: (state, res) => {
    state.activityConfig = res
  },
  SET_ARTCONFIG: (state, res) => {
    state.artConfig = res
  },
  SET_CONFIG: (state, res) => {
    state.adConfig = res
  },
  SET_OPERAT: (state, res) => {
    state.operatConfig = res
  },
  SET_BIZLINE: (state, res) => {
    state.bizLine = res
  },
  SET_LABEL: (state, res) => {
    state.labelData = res
  },
  SET_MALL: (state, res) => {
    state.mallConfig = res
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize ({ commit }, size) {
    commit('SET_SIZE', size)
  },
  getClassLabel ({ commit }, { cb }) {
    let dataLabel = []
    listCommentLabel().then(res => {
      dataLabel = res.data
      localStorage.setItem('dataLabel', JSON.stringify(dataLabel))
      commit('SET_LABEL', dataLabel)
      cb && cb()
    })

    // state.labelData = dataLabel;
    // resolve();
  },

  // 获取活动中心的业务线，这里的业务线根其他页面的不一样
  async getActivityConfig({ commit, state }) {
    if (state.activityConfig) return
    const res = await rActivityBusinessList({ page: 1, size: 1000 })
    const businessType = res.payload.content.map(item => {
      const one = {
        label: item.businessName,
        value: item.id
      }
      return one
    })
    commit('SET_ACONFIG', {
      businessType: businessType
    })
  },
  getArtConfig({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.adConfig) {
        resolve()
        return
      }
      advertConfig().then(res => {
        const business = res.data.businessType || []
        const advert = res.data.advertType || []
        const lopp = type => {
          const list = []
          type.map(item => {
            list.push({
              label: item,
              value: item
            })
          })
          return list
        }
        const businessType = lopp(business)
        const advertType = lopp(advert)
        commit('SET_CONFIG', {
          advertType,
          businessType,
          userType: res.data.userType || {},
          clientType: res.data.clientType || {}
        })
        resolve()
      })
    })
  },
  getAdConfig ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.artConfig && JSON.stringify(state.artConfig) !== '{}') {
        resolve()
        return
      }
      advertDin().then(res => {
        const subjectStatusListMap = new Map()
        res.data.subjectStatusList.forEach(element => {
          subjectStatusListMap.set(element.code, element.desc)
        })
        commit('SET_ARTCONFIG', {
          subjectStatusListMap
        })
        resolve()
      })
    })
  },
  getMallConfig ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.mallConfig) {
        resolve()
        return
      }
      line().then(res => {
        const businessType = res.payload
        commit('SET_MALL', {
          businessType
        })
        resolve()
      })
    })
  },
  getOperatConfig ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.operatConfig) {
        resolve()
        return
      }
      positionConfig().then(res => {
        const busData = res.data
        const business = res.data.businessType || []
        // const client = res.data.clientType['小熊美术'] || []
        const client = ['学生端App'] // 部分业务只支持学生端app

        const lopp = type => {
          const list = []
          type.map(item => {
            list.push({
              label: item,
              value: item
            })
          })
          return list
        }
        const businessType = lopp(business)
        const clientType = lopp(client) // 除了Artworld 所有的业务线的客户端都对接学生端app

        // 所有业务线客户端的枚举
        let clientTypeData = {}
        business.forEach(val => {
          clientTypeData = {
            ...clientTypeData,
            [val]: lopp(res.data.clientType[val])
          }
        })
        commit('SET_OPERAT', {
          busData,
          businessType,
          clientType,
          clientTypeData
          // userType: res.data.userType || {},
          // clientType: res.data.clientType || {}
        })
        resolve()
      })
    })
  },

  /**
   * 问卷中心获取业务线和问卷类型
   */
  getBizLineConfig ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.bizLine) {
        resolve()
        return
      }
      getBizLine().then(res => {
        const { data = {}} = res
        const { bizLine = [], surveyType = [] } = data
        const lopp = type => {
          const list = []
          for (const key in type) {
            if (type.hasOwnProperty(key)) {
              const ele = type[key]
              list.push({
                label: ele,
                value: key
              })
            }
          }
          return list
        }
        const bizLineList = lopp(bizLine)
        const surveyTypeList = lopp(surveyType)
        // console.log(data)
        commit('SET_BIZLINE', {
          ...data,
          bizLineList,
          surveyTypeList
        })
      })
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

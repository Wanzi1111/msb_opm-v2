import { listFrameTypeAll } from '@/api/operate/framing-admin'
import { getToken } from '@/utils/auth'

const state = {
  frameType: null // 裱框业务-所有裱框分类
}

const mutations = {
  SET_FRAME_TYPE: (state, res) => {
    state.frameType = res
  }
}

const actions = {
  // 运营维护-框表
  getListFrameTypeAll ({ commit }) {
    return new Promise((resolve, reject) => {
      const params = { uid: getToken('userId') }
      listFrameTypeAll(params).then(res => {
        const frameType = res.data
        commit('SET_FRAME_TYPE', frameType)
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

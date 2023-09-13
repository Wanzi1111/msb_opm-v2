const state = {
  poinstMallDiamond: null // 裱框业务-所有裱框分类
}

const mutations = {
  SET_POINST_MALL: (state, res) => {
    state.poinstMallDiamond = res
  }
}

const actions = {
  // 运营维护-框表
  getPoinstMall ({ commit }, data) {
    commit('SET_POINST_MALL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

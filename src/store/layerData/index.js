// import Vue from 'vue'
// import Vuex from 'vuex'

const laydata = {
  namespaced: true,
  state: {
    layerData: [],
    token: '',
    syskey: '',
    bimid: '',
    queryData: []
  },
  mutations: {
    setLayerData(state, val) {
      state.layerData = val
    },
    setToken(state, val) {
      state.token = val
    },
    setBimid(state, val) {
      state.bimid = val
    },
    setSyskey(state, val) {
      state.syskey = val
    },
    setQueryData(state, val) {
      state.queryData.push(val)
    },
    clearQueryData(state) {
      state.queryData.splice(0)
    }
  }

}
export default laydata
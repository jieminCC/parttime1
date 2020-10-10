import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
Vue.use(Vuex)
const mapStatus = {
  namespaced: true,
  state: {
    mapTypeStatus: '',
    opacity:{}// 透明度
  },
  getters: {

  },
  mutations: {
    setMapTypeStatus(state, value) {
      state.mapTypeStatus = value
    },
    setOpacity(state, value) {
      state.opacity = value
    },
  }
}

_.merge(mapStatus)
export default mapStatus
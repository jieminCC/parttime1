import Vue from 'vue'
import Vuex from 'vuex'
import mapStatus from './mapStatus'
import layerData from './layerData'
Vue.use(Vuex)
const global = {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  }
}

export default new Vuex.Store({
  modules: {
    global,
    mapStatus,
    layerData
  }
})
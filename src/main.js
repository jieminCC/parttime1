import Vue from 'vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import './assets/css/public.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue'

Vue.use(Vant);
// Vue.prototype.$Toast = Toast

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
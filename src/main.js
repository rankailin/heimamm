import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/api'
import './plugins/element.js'
import '@/utils/md5'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

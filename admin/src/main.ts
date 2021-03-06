import Vue from 'vue'
import axios from "axios"
import App from './App.vue'
import router from './router'
import './plugins/element'
import './plugins/avue'

// 用avue就可以替换掉了
// import EleForm from 'vue-ele-form'
// Vue.use(EleForm)

Vue.config.productionTip = false

const http = axios.create({
  baseURL:'http://localhost:3000'
})
Vue.prototype.$httpajax= http
Vue.prototype.$http= http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

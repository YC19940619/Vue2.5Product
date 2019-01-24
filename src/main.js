// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import interfaces from 'javascript/interface.js'
import permissions from 'javascript/permissions.js'
import axios from 'javascript/axios.js'
import token from 'javascript/token.js'
import store from '@/store'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import 'styles/reset.css'
import 'styles/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$token = token
Vue.prototype.$interfaces = interfaces
Vue.prototype.$permissions = permissions
Vue.use(ElementUi)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

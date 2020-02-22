import Vue from 'vue'
import App from './App'
import router from './router'
import ANTD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(ANTD)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

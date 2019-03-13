// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

const dev = process.env.NODE_ENV === 'development'

const vueMultiDrag = dev
  ? require('../src/vue-multi-drag.js')
  : require('../dist/vue-multi-drag.js')

Vue.config.productionTip = false

// Using plugin
if(dev) {
  Vue.use(vueMultiDrag.default)
} else {
  Vue.use(vueMultiDrag)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

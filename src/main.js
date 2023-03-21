// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from '@/App'
import router from '@/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from '@/api/index';
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$api = api;
/* eslint-disable no-new */


Vue.directive('inputChange', (ele,val) => {
  console.log(11111111111111111,ele,val);
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

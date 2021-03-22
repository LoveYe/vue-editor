import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

// 引入自定义工具函数
const $tool = require('js-method');
Vue.prototype.$tool = $tool;


import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

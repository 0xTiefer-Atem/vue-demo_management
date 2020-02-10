import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from "./store";

import XLSX from 'xlsx'


//导入全局样式表
import './assets/css/global.css'


Vue.use(ElementUI);
Vue.use(XLSX)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

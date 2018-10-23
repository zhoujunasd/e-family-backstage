import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js'
// import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'    //样式的初始化

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

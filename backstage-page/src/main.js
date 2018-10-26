import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js'
// import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'    //样式的初始化

import $axios from './axios'
Vue.prototype.$axios = $axios

// 引入富文本编辑器以及样式文件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js'
// import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css' //样式的初始化

import $axios from './axios'
Vue.prototype.$axios = $axios

// 引入富文本编辑器以及样式文件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.config.productionTip = false;

// 绑定滚动事件
Vue.directive('loadmore', {
  // bind(el, binding) {
  //   const selectWrap = el.querySelector('.el-table__body-wrapper')
  //   selectWrap.addEventListener('scroll', function() {
  //     let sign = 100
  //     const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
  //     if (scrollDistance <= sign) {
  //       binding.value()
  //     }
  //   })
  // }

  bind(el, binding) {
    var p = 0;
    var t = 0;
    var down = true;
    var selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
      //判断是否向下滚动
      p = this.scrollTop;
      // if ( t < p){down=true}else{down=false}
      if (t < p) {
        down = true;
      } else {
        down = false;
      }
      t = p;
      //判断是否到底
      const sign = 5;
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign && down) {
        binding.value()
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
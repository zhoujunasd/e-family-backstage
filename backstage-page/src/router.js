import Vue from "vue";
import Router from "vue-router";
import Layout from "./views/Layout";

const components = {
  Login: () => import('@/views/Login/index.vue'),
  Layout: () => import('@/views/Layout')
}

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: components.Login,
    },
  ]
});

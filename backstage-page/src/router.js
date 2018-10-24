import Vue from "vue";
import Router from "vue-router";
// import Layout from "./views/Layout";
import store from './store'

const components = {
  Login: () => import('@/views/Login'),
  Layout: () => import('@/views/Layout'),
  Home: () => import('@/views/Home'),
  Admin: () => import('@/views/Admin'),
  addAdmine: () => import('@/views/Admin/addAdmine'),
}

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: "/login",
  }, {
    path: "/login",
    name: "login",
    meta: { title: '登录页' },
    component: components.Login,
  }, {
    path: '/layout',
    redirect: '/layout/home',
    component: components.Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '首页' },
        component: components.Home
      },{
        path: 'admin',
        name: 'admin',
        meta: { title: '管理员' },
        component: components.Admin
      },{
        path: 'addAdmine',
        name: 'addAdmine',
        meta: { title: '添加管理员' },
        component: components.addAdmine
      }
    ]
  }]
});

router.beforeEach((to, from, next) => {
  // 修改标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '未定义标题'
  }
  // 登陆拦截
  // if (to.meta.requireAuth) {
  //   // 判断对象是否为空 
  //   // obj = {}
  //   // 一、JSON.stringify(obj) === '{}'
  //   // 二、Object.keys(obj) // [] 
  //   //     Object.keys(obj).length === 0
  //   if (JSON.stringify(store.state.userInfo) === '{}') {
  //     next({
  //       path: '/login',
  //       // 将跳转的路由path作为参数，登录成功后跳转至改路由
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
  next()
})

export default router
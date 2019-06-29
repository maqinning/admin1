import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home', // 主页
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'article', // 文章列表
          path: '/article',
          component: () => import('@/views/articlelist')
        },
        {
          name: 'publish', // 发布文章
          path: '/publish',
          component: () => import('@/views/publishArticle')
        },
        {
          name: 'edit', // 编辑文章
          path: '/publish/:id',
          component: () => import('@/views/publishArticle')
        },
        {
          name: 'comment', // 编辑文章
          path: '/comment',
          component: () => import('@/views/comment')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
router.beforeEach((to, from, next) => {
  Nprogress.start()
  if (to.path === '/login') {
    if (window.localStorage.getItem('user_infor')) {
      return next('/')
    }
    next()
  } else {
    if (window.localStorage.getItem('user_infor')) {
      return next()
    }
    next('/login')
  }
})
router.afterEach(() => {
  Nprogress.done()
})
export default router

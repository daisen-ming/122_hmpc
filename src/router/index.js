import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/Login/Login'
import LayoutView from '@/views/Layout/Layout'
import Page404 from '@/views/404/404'
import HomeView from '@/views/Home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayoutView,
    redirect: '/layout/home',

    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        component: () => import('@/views/Article/ArticleAdd')
      },

      {
        path: 'articleList',
        name: 'articleList',
        component: () => import('@/views/Article/ArticleList')
      }

    ]
  },
  {
    path: '*',
    name: '404',
    component: Page404

  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !sessionStorage.getItem('token')) {
    next('/login')
  } else {
    next()
  }
})

export default router

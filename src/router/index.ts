import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UserHome from '../views/user/home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/Users',
  },
  {
    path: '/Users',
    component:UserHome,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

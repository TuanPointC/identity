import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UserHome from '../views/user/home.vue'
import RolesrHome from '../views/roles/home.vue'
import DetailsUser from '../views/user/details.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/Users',
  },
  {
    path: '/Users',
    component:UserHome,
  },
  {
    path:'/Users/details',
    component:DetailsUser,
  },
  {
    path: '/Roles',
    component:RolesrHome,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

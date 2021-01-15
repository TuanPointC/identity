import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UserHome from '../views/user/home.vue'
import RolesrHome from '../views/roles/home.vue'
import UsersRoles from '../views/roles/users.vue'
import TitleRoles from '../views/roles/title.vue'
import DetailsRoles from '../views/roles/details.vue'
import DetailsUser from '../views/user/details.vue'
import TitleUser from '../views/user/title.vue'
import RolesUser from '../views/user/roles.vue'

//import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/Users',
  },
  {
    path: '/Users',
    component: TitleUser,
    children: [
      {
        path: '/',
        component: UserHome
      },
      {
        path: 'details',
        component: DetailsUser
      },
      {
        path: 'roles',
        component: RolesUser
      },
      {
        path: 'additionalDetails',

      },
      {
        path: 'application',

      },
    ]
  },


  {
    path: '/Roles',
    component: TitleRoles,
    children: [
      {
        path: '/',
        component: RolesrHome
      },
      {
        path: 'details',
        component: DetailsRoles
      },
      {
        path: 'users',
        component: UsersRoles
      },

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

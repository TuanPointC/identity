import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import UserHome from '../views/user/home.vue'
import ClaimsUser from '../views/user/claims.vue'
import DetailsUser from '../views/user/details.vue'
import TitleUser from '../views/user/title.vue'
import RolesUser from '../views/user/roles.vue'

import RolesrHome from '../views/roles/home.vue'
import UsersRoles from '../views/roles/users.vue'
import TitleRoles from '../views/roles/title.vue'
import DetailsRoles from '../views/roles/details.vue'


import TitleClaim from '../views/claim/title.vue'
import ClaimHome from '../views/claim/home.vue'
import DetailsClaims from '../views/claim/details.vue'

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
        path: 'claims',
        component: ClaimsUser
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

  {
    path: '/ClaimTypes',
    component: TitleClaim,
    children: [
      {
        path: '/',
        component: ClaimHome
      },
      {
        path: 'details',
        component: DetailsClaims
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

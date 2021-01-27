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

import { BreakCrumbModule } from '../store/modules/breakCrumb'

import TitleClient from '../views/client/title.vue'
import ClientHome from '../views/client/home.vue'
import DetailsClient from '../views/client/detail.vue'
import SecretsClient from '../views/client/secret.vue'

import IdentityResourcesHome from '../views/resources/identityResources/home.vue'
import TitleIdentityResources from '../views/resources/identityResources/title.vue'
import DetailsIdentity from '../views/resources/identityResources/detail.vue'
import ClaimsIdentity from '../views/resources/identityResources/claims.vue'

import ProtectResourcesHome from '../views/resources/protectedResources/home.vue'
import TitleProtectResources from '../views/resources/protectedResources/title.vue'
import DetailsProtected from '../views/resources/protectedResources/detail.vue'
import ClaimsProtected from '../views/resources/protectedResources/claims.vue'
import ScopesProtected from '../views/resources/protectedResources/scopes.vue'
import SecretsProtected from '../views/resources/protectedResources/secret.vue'

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
        component: DetailsUser,
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
  },
  {
    path: '/Clients',
    component: TitleClient,
    children: [
      {
        path: '/',
        component: ClientHome
      },
      {
        path: 'details',
        component: DetailsClient,
      },
      {
        path: 'secrets',
        component: SecretsClient,
      },
    ]
  },
  {
    path: '/IdentityResources',
    component: TitleIdentityResources,
    children: [
      {
        path: '/',
        component: IdentityResourcesHome
      },
      {
        path: 'details',
        component: DetailsIdentity,
      },
      {
        path: 'claims',
        component: ClaimsIdentity,
      },
    ]
  },
  {
    path: '/ProtectedResources',
    component: TitleProtectResources,
    children: [
      {
        path: '/',
        component: ProtectResourcesHome
      },
      {
        path: 'details',
        component: DetailsProtected,
      },
      {
        path: 'claims',
        component: ClaimsProtected,
      },
      {
        path: 'scopes',
        component: ScopesProtected,
      },
      {
        path: 'secrets',
        component: SecretsProtected,
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  if (to.fullPath.split('/')[1] == 'ProtectedResources') {
    BreakCrumbModule.changeBorder('4px solid orangered')
  }
  else {
    BreakCrumbModule.changeBorder('')
  }
  if (to.fullPath.split('/').length > 2) {
    BreakCrumbModule.changeRouter(to.fullPath.split('/')[2]);
  }
  else {
    BreakCrumbModule.changeRouter('');
  }


})

export default router

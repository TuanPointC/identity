import Vue from 'vue'
import Vuex from 'vuex'

import {UserState} from './modules/user'
import {RoleState} from './modules/roles'
import {BreakCrumbState} from './modules/breakCrumb'
import {IdentityState} from '../store/modules/resources/identity'

export interface RootState {
  user: UserState;
  role: RoleState;
  breakCrumb: BreakCrumbState;
  identity: IdentityState;
}
Vue.use(Vuex)

export default new Vuex.Store<RootState>({})
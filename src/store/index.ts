import Vue from 'vue'
import Vuex from 'vuex'

import {UserState} from './modules/user'
import {RoleState} from './modules/roles'
import {BreakCrumbState} from './modules/breakCrumb'

export interface RootState {
  user: UserState;
  role: RoleState;
  breakCrumb: BreakCrumbState;
}
Vue.use(Vuex)

export default new Vuex.Store<RootState>({})
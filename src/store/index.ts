import Vue from 'vue'
import Vuex from 'vuex'

import {UserState} from './modules/user'
import {RoleState} from './modules/roles'

export interface RootState {
  user: UserState;
  role: RoleState;
}
Vue.use(Vuex)

export default new Vuex.Store<RootState>({})
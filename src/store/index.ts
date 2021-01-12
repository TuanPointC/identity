import Vue from 'vue'
import Vuex from 'vuex'

import {UserState} from './modules/user'

export interface RootState {
  user: UserState;
}
Vue.use(Vuex)

export default new Vuex.Store<RootState>({})
import { MutationTree } from 'vuex'
import { UserStateInterface } from './state'

const mutations: MutationTree<UserStateInterface> = {
  setLogin(state: UserStateInterface) {
    state.isLogin = true
  },
  setLogout(state: UserStateInterface) {
    state.isLogin = false
  },
}

export default mutations

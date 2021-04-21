import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { UserStateInterface } from './state'

const getters: GetterTree<UserStateInterface, StateInterface> = {
  isLogin(state: UserStateInterface): boolean {
    return state.isLogin
  },
}

export default getters

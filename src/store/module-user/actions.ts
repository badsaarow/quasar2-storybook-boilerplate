import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { UserStateInterface } from './state'

const actions: ActionTree<UserStateInterface, StateInterface> = {
  setLogin(context) {
    context.commit('setLogin')
  },
  setLogout(context) {
    context.commit('setLogout')
  },
}

export default actions

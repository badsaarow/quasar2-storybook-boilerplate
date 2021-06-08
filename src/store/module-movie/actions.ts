import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { MovieStateInterface } from './state'

const actions: ActionTree<MovieStateInterface, StateInterface> = {
  loadStarted(context) {
    context.commit('loadStarted')
  },
  loadCompleted(context) {
    context.commit('loadCompleted')
  },
}

export default actions

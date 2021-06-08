import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { MovieStateInterface } from './state'

const getters: GetterTree<MovieStateInterface, StateInterface> = {
  isLoadInProgress(state: MovieStateInterface): boolean {
    return state.isLoadInProgress
  },
  data(state: MovieStateInterface): any {
    return state.data
  },
}

export default getters

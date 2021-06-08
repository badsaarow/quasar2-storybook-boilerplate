import { MutationTree } from 'vuex'
import { MovieStateInterface } from './state'

const mutations: MutationTree<MovieStateInterface> = {
  loadStarted(state: MovieStateInterface) {
    state.isLoadInProgress = true
  },
  loadCompleted(state: MovieStateInterface, payload: any) {
    state.isLoadInProgress = false
    state.data = payload
  },
}

export default mutations

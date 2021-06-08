import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { MovieStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const movieModule: Module<MovieStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export const mutationNames = {
  loadStarted: 'loadStarted',
  loadCompleted: 'loadCompleted',
}

export default movieModule

import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { NavItemStateInterface } from './state'

const navItemModule: Module<NavItemStateInterface, StateInterface> = {
  namespaced: true,
  state,
}

export default navItemModule

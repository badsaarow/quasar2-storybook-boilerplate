import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import user from './module-user'
import { UserStateInterface } from './module-user/state'

import movie from './module-movie'
import { MovieStateInterface } from './module-movie/state'

export interface StateInterface {
  user: UserStateInterface
  movie: MovieStateInterface
}

export const moduleNames = {
  user: 'search',
  movie: 'movie',
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      user,
      movie,
    },
    // plugins: [createPersistedState()],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
  })

  return Store
})

export function useStore() {
  return vuexUseStore(storeKey)
}

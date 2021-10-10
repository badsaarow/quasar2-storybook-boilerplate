import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

import user from './module-user'
import { UserStateInterface } from './module-user/state'

import movie from './module-movie'
import { MovieStateInterface } from './module-movie/state'

import navItem from './module-nav-item'
import { NavItemStateInterface } from './module-nav-item/state'

export interface StateInterface {
  usePageTransition: boolean
  iosBrowserSwipingBack: boolean
  user: UserStateInterface
  movie: MovieStateInterface
  navItem: NavItemStateInterface
}

export const moduleNames = {
  user: 'search',
  movie: 'movie',
  navItem: 'navItem',
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

const secureLs = new SecureLS({ isCompression: false })

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      user,
      movie,
      navItem,
    },
    plugins: [
      createPersistedState({
        storage: {
          getItem: (key) => secureLs.get(key),
          setItem: (key, value) => secureLs.set(key, value),
          removeItem: (key) => secureLs.remove(key),
        },
      }),
    ],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
  })

  return Store
})

export function useStore() {
  return vuexUseStore(storeKey)
}

<template>
  <div class="page absolute-top fit bg-white shadow-4">
    <div
      v-touch-swipe.mouse.right="handleSwipeRight"
      class="page-nudger fit"
      :class="{ 'nudge-left': hasActiveChildPage }"
    >
      <slot />
    </div>

    <router-view v-slot="{ Component }">
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
        :css="$store.state.usePageTransition && !$store.state.iosBrowserSwipingBack"
      >
        <keep-alive>
          <component
            @pageActivated="hasActiveChildPage = true"
            @pageDeactivated="hasActiveChildPage = false"
            :is="Component"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { ref, onActivated, onDeactivated, computed } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'Page',
  setup(props, { emit }) {
    /*
      quasar
    */

    let $q = useQuasar()

    /*
      nudge left class
    */

    let hasActiveChildPage = ref(false)

    onActivated(() => {
      emit('pageActivated')
    })

    onDeactivated(() => {
      emit('pageDeactivated')
      if (isIosBrowser.value) {
        $store.state.iosBrowserSwipingBack = false
      }
    })

    /*
      handle swipe right
    */

    const handleSwipeRight = () => {
      if (isIosBrowser.value) {
        $store.state.iosBrowserSwipingBack = true
      } else {
        // GoBack
      }
    }

    /*
      detect ios device using browser (not cordova or capacitor)
    */

    const isIosBrowser = computed(() => {
      if ($q.platform.is.ios && !$q.platform.is.cordova && !$q.platform.is.capacitor) {
        return true
      }
      return false
    })

    /*
      return
    */

    return {
      store,
      hasActiveChildPage,
      useGoBack,
      handleSwipeRight,
      isIosBrowser,
    }
  },
}
</script>

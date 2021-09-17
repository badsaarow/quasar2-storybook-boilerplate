<template>
  <q-page class="row items-center justify-evenly">
    <q-select
      filled
      v-model="selectedAnimation"
      :options="lottieSamples"
      label="Choose Lottie sample"
    />
    <lottie
      ref="animation"
      :key="componentKey"
      :options="lottieOptions"
      width="400px"
      height="400px"
      @animCreated="handleAnimation"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Lottie from 'components/Lottie.vue'
import * as ani01 from 'assets/lottie/lottie.json'
import * as ani02 from 'assets/lottie/astrolottie.json'

const lottieFiles = [ani01, ani02]

export default defineComponent({
  name: 'LottieSample',
  components: { Lottie },

  setup() {
    const componentKey = ref(0)
    const selectedAnimation = ref(0)
    const animation = ref<HTMLElement>()
    const lottieSamples = [...lottieFiles.keys()]
    const lottieOptions = {
      animationData: null as any,
      loop: true,
      autoplay: true,
    }

    const handleAnimation = (anim: any) => {
      animation.value = anim
    }

    watch(selectedAnimation, () => {
      lottieOptions.animationData = lottieFiles[selectedAnimation.value]
      componentKey.value++
    })

    return {
      componentKey,
      selectedAnimation,
      animation,
      lottieSamples,
      lottieOptions,
      handleAnimation,
    }
  },
})
</script>

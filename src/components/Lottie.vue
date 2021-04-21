<template>
  <div>
    <lottie-animation
      ref="anim"
      :animation-data="animationData"
      :loop="true"
      :auto-play="true"
      :speed="1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LottieAnimation from 'lottie-web-vue'
import animationData from '../assets/cash-or-card.json'

export default defineComponent({
  name: 'Lottie',
  components: {
    LottieAnimation,
  },
  setup() {
    console.log('return animationData')
    return {
      animationData,
    }
  },
})
</script>

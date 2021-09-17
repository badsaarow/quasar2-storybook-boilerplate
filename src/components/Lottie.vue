<template>
  <div ref="aniContainer" :style="style"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import lottie from 'lottie-web'

export default defineComponent({
  name: 'Lottie',
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: {
      type: String,
      default: '100%',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
  setup(props, ctx) {
    const aniContainer = ref<Element>()
    const style = {
      width: props.width,
      height: props.height,
      overflow: 'hidden',
      margin: '0 auto',
    }

    onMounted(() => {
      const anim = lottie.loadAnimation({
        container: aniContainer.value as Element,
        renderer: 'svg',
        loop: !!props.options.loop,
        autoplay: !!props.options.autoplay,
        animationData: props.options.animationData,
        rendererSettings: props.options.renderSettings,
      })
      ctx.emit('animCreated', anim)
    })

    return {
      aniContainer,
      style,
    }
  },
})
</script>

<template>
  <div>
    <p class="textContent">{{ input }}</p>
    <span>{{ counter }}</span>
    <button id="mybutton" @click="increment()">{{ input }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ButtonDemo',
  setup() {
    const counter = ref(0)
    const input = ref('rocket muffin')
    const increment = () => {
      counter.value++
    }

    return {
      counter,
      input,
      increment,
    }
  },
})
</script>

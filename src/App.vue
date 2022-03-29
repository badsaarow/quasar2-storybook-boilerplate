<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { MockServer } from './mock-server/mock-server'
export default defineComponent({
  name: 'App',
  setup() {
    const environment = process.env.NODE_ENV

    if (environment !== 'production') {
      MockServer({ environment })
    }
  },
})
</script>

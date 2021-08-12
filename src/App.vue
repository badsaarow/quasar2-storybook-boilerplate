<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import createMockServer from '../mock-server/index'

export default defineComponent({
  name: 'App',
  // setup() {
  //   if (process.env.NODE_ENV === 'development') {
  //     createMockServer()
  //     console.log('API Mock Server started')
  //   }
  // },
})
</script>

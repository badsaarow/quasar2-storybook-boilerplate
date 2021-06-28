<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import createMockServer from '../mock-server/index'

if (process.env.NODE_ENV === 'development') {
  createMockServer()
  console.log('API Mock Server started')
}

export default defineComponent({
  name: 'App',
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <h1>Swipe Home</h1>
    <q-btn :to="{ path: '/swipe/next' }">Go Next</q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SwipeHome',
  setup() {
    const router = useRouter()

    return { router }
  },
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <h1>Swipe Next</h1>
    <q-btn @click="router.back()">Go back</q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SwipeNext',
  setup() {
    const router = useRouter()

    return { router }
  },
})
</script>

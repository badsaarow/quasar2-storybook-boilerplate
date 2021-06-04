<template>
  <q-page class="row items-center justify-evenly">
    <p>current Id {{ id }}</p>
    <p>
      <button @click="id--">prev</button>
      <button @click="id++">next</button>
    </p>
    <p v-if="loading">loading...</p>
    <div v-else>
      <p>Status: {{ status }}</p>
      {{ data }}
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useAxios } from '@vue-composable/axios'

export default defineComponent({
  name: 'Home',
  setup() {
    const id = ref(1)
    const { data, loading, exec, status } = useAxios()

    watch(id, (id) => {
      exec({
        method: 'GET',
        url: 'https://reqres.in/api/user/' + id,
      })
    })
    return { id, data, loading, status }
  },
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <h1>Movie Sample</h1>

    <article v-if="movieInfo">
      <h1>{{ movieInfo.original_title }}</h1>
      <h2>{{ movieInfo.title }}</h2>
      <img :src="movieInfo.posterPath" :alt="movieInfo.original_title" />
      <div>
        <p>
          {{ movieInfo.tagline }}
          <br />
          <small>{{ movieInfo.release_date }}</small>
        </p>
        <p>
          {{ movieInfo.overview }}
        </p>
      </div>
    </article>
    <q-btn label="Add to Store" @click="addToStore" />
    <q-btn label="Clear Store" @click="clearStore" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue'
import { useStore } from '../store'
import getDefault from '../models/movie'

export default defineComponent({
  name: 'PersistedStore',
  setup() {
    const store = useStore()
    const movieInfo = ref<any>()

    watch(store.state.movie, (curr: any) => {
      console.log('watch:', curr)
      movieInfo.value = curr.data
    })

    const addToStore = () => {
      console.log('addToStore')
      store.dispatch('movie/loadCompleted', getDefault())
    }
    const clearStore = () => {
      console.log('clearStore')
      store.dispatch('movie/loadCompleted', null)
    }

    onMounted(() => {
      movieInfo.value = store.state.movie.data
    })

    return {
      movieInfo,
      addToStore,
      clearStore,
    }
  },
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <h1>Movie Sample</h1>
    <div v-if="!isLoadInProgress">
      <h1>Loaded</h1>
      <h1>{{ movieInfo.original_title }}</h1>
      <h2>{{ movieInfo.title }}</h2>
      <article>
        <img :src="posterPath" :alt="movieInfo.original_title" />
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useStore } from '../store'
import * as movieService from '../services/movie-service'

export default defineComponent({
  name: 'Service',
  setup() {
    const store = useStore()
    const movieInfo = ref({})
    const isLoadInProgress = ref(false)
    console.log(store)

    watch(
      [() => store.getters['movie/isLoadInProgress'], () => store.getters['movie/data']],
      ([loadInProgress, data]) => {
        console.log('loadInProgress', loadInProgress)
        isLoadInProgress.value = loadInProgress
        console.log('data', data)
        movieInfo.value = data.data
      }
    )
    const posterPath = ''

    onMounted(async () => {
      console.log('mounted!')
      await movieService.getMovieAsync(store.commit, '337404')
    })

    return {
      movieInfo,
      isLoadInProgress,
      posterPath,
    }
  },
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-btn to="persisted" label="Go to PersistedStore" />
    <q-btn to="modal" label="Go to DialogSample" />
    <q-btn to="lottie">Lottie Animation Sample</q-btn>
    <hr />
    <example-component title="Landing Page" active :todos="todos" :meta="meta"></example-component>
    <p>lodash random number: {{ lodashRandom() }}</p>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from '../components/models'
import ExampleComponent from '../components/CompositionComponent.vue'
import { defineComponent, ref } from 'vue'
import _ from 'lodash'

export default defineComponent({
  name: 'Home',
  components: { ExampleComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ])
    const meta = ref<Meta>({
      totalCount: 1200,
    })
    const lodashRandom = () => {
      return _.random(20)
    }
    return { todos, meta, lodashRandom }
  },
})
</script>

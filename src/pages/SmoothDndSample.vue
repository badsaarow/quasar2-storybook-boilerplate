<template>
  <div>
    <span>Studio Ghibli Tier List</span>
    <container @drop="onDrop">
      <draggable v-for="(item, i) in items.value" :key="item.id">
        <div class="draggable">{{ i + 1 }} -> {{ item.data }}</div>
      </draggable>
    </container>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { DropResult } from 'smooth-dnd'

interface SampleItem {
  id: number
  data: string
}

type SampleItemList = Array<SampleItem>

export default {
  name: 'App',
  components: { Container, Draggable },
  setup() {
    const items = reactive({
      value: [
        { id: 1, data: 'Princess Mononoke' },
        { id: 2, data: 'Spirited Away' },
        { id: 3, data: 'My Neighbor Totoro' },
        { id: 4, data: "Howl's Moving Castle" },
      ] as SampleItemList,
    })

    const onDrop = (dropResult: DropResult) => {
      items.value = applyDrag(items.value, dropResult)
    }

    const applyDrag = (arr: SampleItemList, dragResult: DropResult) => {
      console.log('applyDrag', dragResult)
      const { removedIndex, addedIndex, payload } = dragResult

      if (removedIndex === null && addedIndex === null) return arr
      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }
      return result
    }

    return {
      items,
      onDrop,
      applyDrag,
    }
  },
}
</script>

<style scoped>
.draggable {
  background-color: blueviolet;
}
</style>

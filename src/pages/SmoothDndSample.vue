<script setup lang="ts">
import { reactive } from 'vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { DropResult } from 'smooth-dnd'

interface SampleItem {
  id: number
  data: string
}

type SampleItemList = Array<SampleItem>

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

defineExpose({
  Container,
  Draggable,
  onDrop,
  applyDrag,
  items,
})
</script>

<template>
  <div>
    <span>Studio Ghibli Tier List</span>
    <component :is="Container" @drop="onDrop">
      <component :is="Draggable" v-for="(item, i) in items.value" :key="item.id">
        <div class="draggable">{{ i + 1 }} -> {{ item.data }}</div>
      </component>
    </component>
  </div>
</template>

<style scoped>
.draggable {
  background-color: blueviolet;
}
</style>

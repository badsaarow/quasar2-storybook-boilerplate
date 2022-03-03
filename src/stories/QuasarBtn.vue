<template>
  <q-btn
    :label="label"
    :color="color"
    :flat="flat"
    :dense="dense"
    :round="round"
    :icon="icon"
    @click="onClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const onClick = () => {
  console.log('clicked')
}

export default defineComponent({
  name: 'MyButton',
  props: {
    label: {
      type: String,
      default: 'Button',
    },
    color: {
      type: String,
      default: 'Primary',
    },
    flat: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    round: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: 'menu',
    },
  },
  setup(props) {
    return {
      ...props,
      onClick,
    }
  },
})
</script>

<style>
.q-btn .q-btn--actionable::before {
  background-color: rgba(var(--q-accent), 0.8);
  border-bottom: 1px solid var(--q-accent);
}
</style>

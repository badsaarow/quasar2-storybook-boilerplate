<template>
  <q-btn :label="label" :flat="flat" :dense="dense" :round="round" :icon="icon" @click="onClick" />
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

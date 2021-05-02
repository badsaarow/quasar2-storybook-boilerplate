<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script lang="ts">
import './button.css'
import { reactive, computed, defineComponent } from 'vue'

interface Props {
  label: string
  primary: boolean
  size: string
  backgroundColor: string
}

export default defineComponent({
  name: 'MyButton',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function (value: string) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      },
    },
    backgroundColor: {
      type: String,
      default: 'white',
    },
  },

  emits: ['click'],

  setup(props: Props, { emit }) {
    props = reactive(props)
    return {
      // label: props.label,
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': props.primary,
        'storybook-button--secondary': !props.primary,
        [`storybook-button--${props.size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick() {
        emit('click')
      },
    }
  },
})
</script>

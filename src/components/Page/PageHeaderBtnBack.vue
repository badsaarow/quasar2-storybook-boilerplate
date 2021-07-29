<template>
  <q-btn @click="useGoBack" icon="chevron_left" color="primary" flat rounded dense no-caps />
</template>

<script>
import useGoBack from 'src/use/useGoBack'

export default {
  name: 'PageHeaderBtnBack',
  setup() {
    return {
      useGoBack,
    }
  },
}
</script>

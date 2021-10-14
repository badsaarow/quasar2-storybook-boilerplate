<template>
  <q-page class="row items-center justify-evenly">
    <h1>Movie Sample</h1>
    <q-dialog :model-value="dialog">
      <q-card>
        <h1>Hello Dialog</h1>
      </q-card>
    </q-dialog>
    <q-btn label="Close Modal" @click="closeModal" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useModal from '../composables/useModal'

export default defineComponent({
  name: 'DialogSample',
  setup() {
    const { closeQDialogElementIfExist } = useModal()
    const dialog = ref(true)
    const closeModal = () => {
      closeQDialogElementIfExist()
    }

    return {
      closeModal,
      dialog,
    }
  },
})
</script>

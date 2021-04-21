<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar2 Storybook Boilerplate
        </q-toolbar-title>

        <div>Quasar2</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Full pages
        </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition-group>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Home',
    caption: 'Home',
    icon: 'school',
    link: '/',
  },
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false)
    const essentialLinks = ref(linksData)

    return { leftDrawerOpen, essentialLinks }
  },
})
</script>

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

        <q-toolbar-title> Quasar2 Storybook Boilerplate </q-toolbar-title>

        <div>Swipe Page</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Full pages </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <swiper
        :space-between="50"
        :slides-per-view="1"
        :history="{
          key: 'slide',
        }"
        class="mySwiper"
      >
        <swiper-slide data-history="1">Slide 1</swiper-slide>
        <swiper-slide data-history="Slide 2">Slide 2</swiper-slide>
        <swiper-slide data-history="3">Slide 3</swiper-slide>
        <swiper-slide data-history="Slide 4">Slide 4</swiper-slide>
        <swiper-slide data-history="5">Slide 5</swiper-slide>
        <swiper-slide data-history="Slide 6">Slide 6</swiper-slide>
        <swiper-slide data-history="7">Slide 7</swiper-slide>
        <swiper-slide data-history="Slide 8">Slide 8</swiper-slide>
        <swiper-slide data-history="9">Slide 9</swiper-slide>
      </swiper>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import EssentialLink from 'components/EssentialLink.vue'

import 'swiper/swiper.scss'
import SwiperCore, { History } from 'swiper/core'

SwiperCore.use([History])

const linksData = [
  {
    title: 'Home',
    caption: 'Home',
    icon: 'school',
    link: '/',
  },
]

export default defineComponent({
  name: 'SwipeLayout',
  components: { EssentialLink, Swiper, SwiperSlide },
  setup() {
    const leftDrawerOpen = ref(false)
    const essentialLinks = ref(linksData)

    return { leftDrawerOpen, essentialLinks }
  },
})
</script>

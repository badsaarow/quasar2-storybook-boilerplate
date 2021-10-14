import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'restful', component: () => import('pages/Restful.vue') },
      { path: 'service', component: () => import('pages/Service.vue') },
      { path: 'service', component: () => import('pages/Service.vue') },
      { path: 'persisted', component: () => import('pages/PersistedStore.vue') },
      { path: 'modal', component: () => import('pages/DialogSample.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes

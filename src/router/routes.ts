import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'restful', component: () => import('pages/Restful.vue') },
      { path: 'service', component: () => import('pages/Service.vue') },
      { path: 'lottie', component: () => import('pages/LottieSample.vue') },
      {
        path: 'swipe',
        component: () => import('layouts/SwipeLayout.vue'),
        children: [
          { path: '', component: () => import('pages/SwipeHome.vue') },
          { path: 'next', component: () => import('pages/SwipeNext.vue') },
        ],
      },
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

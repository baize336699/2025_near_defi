import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
/*     { path: '/posts', component: () => import('../views/PostView.vue') },
    { path: '/analytics', component: () => import('../views/AnalyticsView.vue') }, */
  ]
})

export default router
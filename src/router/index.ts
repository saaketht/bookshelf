import { createRouter, createWebHistory } from 'vue-router'
import Bookshelf from '@/components/Bookshelf.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Bookshelf
    }
    // We can add more routes here as we develop additional views
    // For example:
    // {
    //   path: '/book/:id',
    //   name: 'bookDetails',
    //   component: () => import('@/components/BookDetails.vue')
    // }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Bookshelf from '@/components/Bookshelf.vue'
import Reader from '@/components/Reader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Bookshelf
    },
{
  path: '/reader',
  name: 'ReaderView',
  component: Reader,
  props: (route) => ({ book: route.params.book }) // Pass the book data as a prop
}
  ]
})

export default router


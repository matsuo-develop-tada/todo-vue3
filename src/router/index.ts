import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/todo-list',
    name: 'TodoList',
    component: () => import('../views/TodoList.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: () => import('../views/Update.vue'),
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/todo-list',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

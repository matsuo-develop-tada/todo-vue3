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
    component: () => import ('../views/Register.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

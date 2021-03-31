import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodoList from '../views/TodoList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/todo-list',
    name: 'TodoList',
    component: () => import('../views/TodoList.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

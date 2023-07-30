import { createRouter, createWebHashHistory } from 'vue-router'
import Calculator from '../views/Calculator.vue'
import SpeedTier from '../views/SpeedTier.vue'

const routes = [
  {
    path: '/',
    component: Calculator,
    meta: { keepAlive: true }
  },
  {
    path: '/SpeedTier',
    component: SpeedTier
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '../views/Calculator.vue'
import SpeedTier from '../views/SpeedTier.vue'

const routes = [
  {
    path: '/DamageCalculator',
    component: Calculator,
    meta: { keepAlive: true }
  },
  {
    path: '/SpeedTier',
    component: SpeedTier
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

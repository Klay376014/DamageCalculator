<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const NEW_URL = 'https://pokemon-tool-damage-calculator.vercel.app'
const countdown = ref(5)
let timer = null

function redirect() {
  window.location.href = NEW_URL
}

onMounted(() => {
  timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      clearInterval(timer)
      redirect()
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="deprecation-overlay">
    <div class="deprecation-box">
      <h2 class="fw-bold mb-3">此網站已遷移至新版本</h2>
      <p class="text-muted mb-4">將於 {{ countdown }} 秒後自動跳轉...</p>
      <button class="btn btn-primary px-4" @click="redirect">
        立即前往新版本
      </button>
    </div>
  </div>
</template>

<style scoped>
.deprecation-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.deprecation-box {
  max-width: 400px;
  padding: 2rem;
}
</style>

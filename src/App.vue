<script setup>
</script>

<template>
  <nav class="navbar navbar-dark bg-primary position-sticky top-0 mb-2">
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <h1 class="mb-0 fs-4 fw-bold" href="#">寶可夢工具網</h1>
      <ul class="list-unstyled d-flex mb-0">
        <li>
          <router-link
            to="/DamageCalculator"
            class="text-white fw-bold text-decoration-none"
            >傷害計算機</router-link
          >
        </li>
        <li class="ms-4">
          <router-link
            to="/SpeedTier"
            class="text-white fw-bold text-decoration-none"
            >速線表</router-link
          >
        </li>
      </ul>
    </div>
  </nav>

  <router-view v-if="!$route.meta?.keepAlive" />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-if="$route.meta?.keepAlive" :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>

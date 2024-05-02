<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from './components/Shared/Menu.vue'
</script>

<template>
  <header>
    <Menu />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 999;
}
</style>

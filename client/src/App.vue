<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from './components/Shared/MenuTopo.vue'
import footerSite from './components/Shared/footerSite.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header :class="route.name">
    <Menu />
  </header>

  <RouterView />
  <footerSite />
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

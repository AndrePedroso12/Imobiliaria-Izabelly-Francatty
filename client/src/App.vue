<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from './components/Shared/MenuTopo.vue'
import footerSite from './components/Shared/footerSite.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const route = useRoute()

const entriesHandler = (entries: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(entriesHandler, { rootMargin: '0px 0px 90% 0px' })

  document.querySelectorAll('.animated').forEach((section) => {
    observer.observe(section)
  })
})
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

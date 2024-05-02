<template>
  <div class="wrapper">
    <img
      alt="Izabelly Francati Logo"
      class="logo"
      src="@/assets/logo-branco.svg"
      width="250"
      height="80"
    />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">Sobre nós</RouterLink>
      <RouterLink to="/about">Alugar</RouterLink>
      <RouterLink to="/about">Comprar</RouterLink>
      <RouterLink to="/about">Fale conosco</RouterLink>
    </nav>

    <a href="http://" target="_blank" rel="noopener noreferrer" class="whatsapp">
      <Icon icon="fa-brands:whatsapp" width="1.7em" height="1.7em" /> (19) 99999-9999</a
    >
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;
  flex-direction: row;
  color: white;

  nav a {
    padding: 6px 25px 6px 25px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease-in-out 0s;
  }

  .whatsapp {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    font-size: 16px;
    font-weight: 500;
    & svg {
      margin-right: 1rem;
    }
  }
}
</style>

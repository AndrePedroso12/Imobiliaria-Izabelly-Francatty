<template>
  <div class="wrapper">
    <button class="hamburger" @click="toggleMenu">
      <Icon icon="fa-solid:bars" width="1.7em" height="1.7em" />
    </button>
    <img
      alt="Izabelly Francati Logo"
      class="logo desktop"
      src="@/assets/logo-branco.svg"
      width="250"
      height="80"
    />
    <img
      alt="Izabelly Francati Logo"
      class="logo mobile"
      src="@/assets/logo-preto.svg"
      width="250"
      height="80"
    />

    <nav class="desktop">
      <RouterLink to="/">Home</RouterLink>
      <a href="/#sobre">Sobre nós</a>
      <RouterLink :to="{ name: 'pesquisa', params: { modelo: 'Alugar' } }">Alugar</RouterLink>
      <RouterLink :to="{ name: 'pesquisa', params: { modelo: 'Compra' } }">Comprar</RouterLink>
      <a
        href="https://api.whatsapp.com/send/?phone=5519974148500&type=phone_number&app_absent=0"
        target="_blank"
        >Fale conosco</a
      >
    </nav>
    <nav class="mobile" :class="{ active: isMenuOpen }">
      <button class="close" @click="toggleMenu">X</button>
      <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
      <a href="/#sobre" @click="toggleMenu">Sobre nós</a>
      <RouterLink :to="{ name: 'pesquisa', params: { modelo: 'Alugar' } }" @click="toggleMenu"
        >Alugar</RouterLink
      >
      <RouterLink :to="{ name: 'pesquisa', params: { modelo: 'Comprar' } }" @click="toggleMenu"
        >Comprar</RouterLink
      >
      <a
        href="https://api.whatsapp.com/send/?phone=5519974148500&type=phone_number&app_absent=0"
        target="_blank"
        >Fale conosco</a
      >
      <a
        href="https://api.whatsapp.com/send/?phone=5519974148500&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp"
      >
        <Icon icon="fa-brands:whatsapp" width="1.7em" height="1.7em" /> (19) 97414-8500
      </a>
    </nav>
    <div class="overlay" v-if="isMenuOpen" :class="{ active: isMenuOpen }"></div>

    <a
      href="https://api.whatsapp.com/send/?phone=5519974148500&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp desktop"
    >
      <Icon icon="fa-brands:whatsapp" width="1.7em" height="1.7em" /> (19) 97414-8500</a
    >
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
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
  background: #0000007d;
  backdrop-filter: blur(10px);

  .home & {
    background: transparent;
  }
  @media (max-width: 768px) {
    color: var(--color-text);
    background-color: white;
    display: flex;
    justify-content: flex-start;
  }

  nav {
    display: flex;
    flex-direction: row;

    a {
      padding: 6px 25px 6px 25px;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease-in-out 0s;
      @media screen and (max-width: 768px) {
        color: var(--color-text);
      }
    }
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
    @media (max-width: 768px) {
      color: var(--color-text);
    }
  }

  .hamburger {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  .desktop {
    display: flex;
  }

  .mobile {
    display: none;
  }

  .close {
    position: absolute;
    top: 0;
    right: -10px;
  }

  .overlay {
    opacity: 0;
    background: #000000b0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
  }

  .overlay.active {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: flex;
    }
    nav.mobile {
      display: flex;
      position: fixed;
      flex-direction: column;
      top: 0;
      background: white;
      color: var(--color-text);
      height: 100vh;
      width: 56%;
      padding: 12rem 0;
      border-right: 10px solid var(--color-background);
      justify-content: space-around;
      transform: translateX(-100%);
      transition: 0.5s;
    }

    nav.active {
      transform: translateX(0) !important;
    }

    .hamburger {
      display: block;
    }
  }
}
</style>

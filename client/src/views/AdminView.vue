<template>
  <div class="container">
    <LoaderSpinner v-if="loading" />

    <button class="hamburger mobile" @click="toggleMenu">
      <Icon icon="fa-solid:bars" width="1.7em" height="1.7em" />
    </button>

    <!-- Menu lateral -->
    <div class="sidebar" :class="{ active: isMenuOpen }" v-if="!loading && userInfos">
      <div class="user-info">
        <div class="user-picture">
          <img alt="Izabelly Francati Logo" src="@/assets/logo-preto-top.svg" />
        </div>
        <div class="user-name">{{ userInfos.name }}</div>
        <div class="user-email">{{ userInfos.email }}</div>
      </div>

      <div
        class="menu-icon"
        :class="{ active: isCurrentPage(HomePage) }"
        @click="changePage(HomePage)"
      >
        <Icon icon="bx:home" width="1.2em" height="1.2em" />
        <p>Dashboard</p>
      </div>
      <div
        class="menu-icon"
        :class="{ active: isCurrentPage(CreatePosts) }"
        @click="changePage(CreatePosts)"
      >
        <Icon icon="gridicons:create" width="1.2em" height="1.2em" />
        <p>Cadastrar</p>
      </div>
      <div class="menu-icon" @click="changePage(ManagePosts)">
        <Icon icon="fluent:board-16-regular" width="1.2em" height="1.2em" />
        <p>Gerenciar</p>
      </div>

      <div class="menu-icon" @click="changePage(AccountPage)">
        <Icon icon="material-symbols:manage-accounts-outline" width="1.2em" height="1.2em" />
        <p>Minha Conta</p>
      </div>
      <div class="menu-icon" @click="logOut()">
        <Icon icon="ic:round-logout" width="1.2em" height="1.2em" />
        <p>Logout</p>
      </div>

      <div class="divider"></div>
      <img alt="Izabelly Francati Logo" class="logo" src="@/assets/logo-branco2.svg" />
    </div>
    <div
      class="overlay mobile"
      v-if="isMenuOpen"
      :class="{ active: isMenuOpen }"
      @click="toggleMenu"
    ></div>
    <!-- Conteúdo dinâmico -->
    <div class="content" v-if="!loading">
      <div class="header" v-if="userInfos && currentComponent.__name">
        <p>{{ getPageName(currentComponent.__name) }}</p>
      </div>
      <component
        :is="currentComponent"
        :user="userInfos"
        :selectedCard="selectedCard"
        @edit="editImovel"
        @saved="savedSucces"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Component } from 'vue'
import { Icon } from '@iconify/vue'
import { useAuth } from '@/composables'
import router from '@/router'
import HomePage from '@/components/Admin/HomePage.vue'
import CreatePosts from '@/components/Admin/CreatePosts.vue'
import ManagePosts from '@/components/Admin/ManagePosts.vue'
import LoaderSpinner from '@/components/Shared/LoaderSpinner.vue'
import AccountPage from '@/components/Admin/AccountPage.vue'

const currentComponent = ref<Component>(HomePage)
const currentPageName = ref('HomePage')
const authFunction = useAuth()
const token = ref('')
const userId = ref('')
const userInfos = ref()
const loading = ref(false)
const selectedCard = ref()
const isMenuOpen = ref(false)

onMounted(async () => {
  loading.value = true
  token.value = authFunction.checkLogin()
  userId.value = authFunction.loggedUserId()
  if (!token.value) {
    router.push({ name: 'login' })
  }
  userInfos.value = await authFunction.getUserById(userId.value, token.value)
  loading.value = false
})

function logOut() {
  authFunction.logout()
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function editImovel(card: number) {
  selectedCard.value = card
  currentComponent.value = CreatePosts
}

function savedSucces() {
  selectedCard.value = undefined
  currentComponent.value = ManagePosts
}

function changePage(component: Component) {
  selectedCard.value = undefined
  toggleMenu()
  currentComponent.value = component
  if (component.name) currentPageName.value = component.name
}

function isCurrentPage(component: Component) {
  return currentComponent.value.__name === component.__name
}

function getPageName(value: string) {
  switch (value) {
    case 'HomePage':
      return 'Dashboard'
    case 'CreatePosts':
      return 'Cadastrar / Editar um imóvel'
    case 'ManagePosts':
      return 'Gerenciar Imóveis'
    case 'AccountPage':
      return 'Gerenciar sua conta'

    default:
      return 'Pagina invalida'
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  color: black;
  height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
  @media (max-width: 768px) {
    padding: 0;
  }
}
.loader {
  top: 50%;
}

.content {
  flex: 1;
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
  @media (max-width: 768px) {
    padding: 15px;
  }
}

.header p {
  font-size: 26px;
  text-transform: capitalize;
  margin: 0 0 8px;
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: 500;
  line-height: 1.2;
}

.overlay {
  opacity: 0;
  background: rgba(0, 0, 0, 0.6901960784);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
}

.overlay.active {
  opacity: 1;
}

.hamburger {
  position: fixed;
  bottom: 0;
  left: 40%;
  z-index: 9;
}

.sidebar {
  width: 19rem;
  height: 100vh;
  background-color: #282828;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.6s;
  overflow: hidden;
  align-items: flex-start;
  border-radius: 24px;
  margin-right: 60px;

  @media (max-width: 768px) {
    position: fixed;
    transform: translateX(-135%);
    margin: 0;
    left: 0;
    top: 0;
    border-radius: 0 25px 25px 0;
    z-index: 99;

    &.active {
      transform: translateX(0) !important;
    }
  }

  .menu-icon {
    display: flex;
    align-content: center;
    align-items: center;
    text-align: left;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 12px;
    padding: 14px 20px;
    margin: 0 auto;
    width: 75%;

    svg {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
      padding: 0 20px;

      transition: 0.6s;
    }
    &:hover,
    &.active {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .logo {
    width: 80%;
    margin: 4rem auto;
  }

  hr {
    width: 71%;
    margin: 0 auto;
    border-radius: 50px;
    opacity: 0.5;
  }
}
.inner {
  background: #1c1c1c;
  padding: 1.5rem;
  border-radius: 13px;
}

.user-info {
  margin: 0 auto;
  background: #242424;
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  @media screen {
    margin: 0 auto;
    background: #242424;
    width: 100%;
    padding: 1rem 0;
    text-align: center;
  }
  .user-picture {
    background: var(--color-background);
    height: 7rem;
    width: 7rem;
    border-radius: 50px;
    overflow: hidden;
    margin: 0 auto;
    @media screen {
      height: 3rem;
      width: 3rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-name {
    font-size: 36px;
    font-weight: bold;
    @media screen {
      font-size: 21px;
    }
  }

  .user-email {
    font-size: 15px;
    @media screen {
      font-size: 11px;
    }
  }
}
</style>

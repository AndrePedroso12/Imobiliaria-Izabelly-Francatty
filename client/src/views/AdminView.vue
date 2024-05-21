<template>
  <div class="container">
    <LoaderSpinner v-if="loading" />
    <!-- Menu lateral -->
    <!-- Menu lateral -->
    <div class="sidebar">
      <img
        alt="Izabelly Francati Logo"
        class="logo"
        src="@/assets/logo-branco.svg"
        width="250"
        height="80"
      />
      <div class="menu-icon" @click="currentComponent = HomePage">
        <Icon icon="bx:home" width="1.2em" height="1.2em" />
        <p>Home</p>
      </div>
      <div class="menu-icon" @click="currentComponent = CreatePosts">
        <Icon icon="gridicons:create" width="1.2em" height="1.2em" />
        <p>Cadastrar Imóveis</p>
      </div>
      <div class="menu-icon" @click="currentComponent = ManagePosts">
        <Icon icon="fluent:board-16-regular" width="1.2em" height="1.2em" />
        <p>Gerencia Imóveis</p>
      </div>

      <hr />
      <div class="menu-icon" @click="currentComponent = ManagePosts">
        <Icon icon="material-symbols:manage-accounts-outline" width="1.2em" height="1.2em" />
        <p>Gerenciar conta</p>
      </div>
      <div class="menu-icon" @click="logOut()">
        <Icon icon="ic:round-logout" width="1.2em" height="1.2em" />
        <p>Logout</p>
      </div>
    </div>

    <!-- Conteúdo dinâmico -->
    <div class="content" v-if="!loading">
      <div class="header" v-if="userInfos">
        <h1>Olá, {{ userInfos.name }}</h1>
      </div>
      <component :is="currentComponent"></component>
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

const currentComponent = ref<Component>(HomePage)
const authFunction = useAuth()
const token = ref('')
const userInfos = ref()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  token.value = authFunction.checkLogin()
  if (!token.value) {
    router.push({ name: 'login' })
  }
  userInfos.value = await authFunction.getUserById('1', token.value)
  loading.value = false
})

function logOut() {
  authFunction.logout()
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  background: #212121;
  color: white;
  height: 100vh;
}
.loader {
  top: 50%;
}

.content {
  flex: 1;
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
  border: 7px solid #212121;
  border-radius: 18px;
  background: #1c1c1c;
}

h1 {
  font-size: 52px;
  font-weight: 900;
}

.sidebar {
  width: 95px;
  height: 100vh;
  background-color: #282828;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.6s;
  overflow: hidden;
  &:hover {
    width: 200px;
  }

  .menu-icon {
    display: flex;
    align-content: center;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
    cursor: pointer;
    svg {
      font-size: 3rem;
      border: 5px solid white;
      border-radius: 50px;
      padding: 0.5rem;
    }
    p {
      font-size: 0;
      opacity: 0;
      transition: 0.6s;
    }
  }

  &:hover .menu-icon p {
    font-size: 16px;
    opacity: 1;
  }

  .logo {
    width: 100%;
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
</style>

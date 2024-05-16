<template>
  <div class="container">
    <!-- Menu lateral -->
    <div class="sidebar">
      <div class="menu-icon" @click="currentComponent = HomePage">
        <Icon icon="lucide:bed" width="1.2em" height="1.2em" />
        <p>Home</p>
      </div>
      <div class="menu-icon" @click="currentComponent = CreatePosts">
        <Icon icon="lucide:bed" width="1.2em" height="1.2em" />
        <p>Cadastrar Imóveis</p>
      </div>
      <div class="menu-icon" @click="currentComponent = ManagePosts">
        <Icon icon="lucide:bed" width="1.2em" height="1.2em" />
        <p>Gerencia Imóveis</p>
      </div>
      <div class="menu-icon" @click="currentComponent = ManagePosts">
        <Icon icon="lucide:bed" width="1.2em" height="1.2em" />
        <p>Gerenciar Informações</p>
      </div>

      <hr />
      <div class="menu-icon" @click="logOut()">
        <Icon icon="lucide:bed" width="1.2em" height="1.2em" />
        <p>Logout</p>
      </div>
    </div>

    <!-- Conteúdo dinâmico -->
    <div class="content">
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

const currentComponent = ref<Component>(HomePage)
const authFunction = useAuth()
const token = ref('')
const userInfos = ref()

onMounted(async () => {
  token.value = authFunction.checkLogin()
  if (!token.value) {
    router.push({ name: 'login' })
  }
  userInfos.value = await authFunction.getUserById('1', token.value)
})

function logOut() {
  authFunction.logout()
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  background: #161616;
  color: white;
}

.sidebar {
  width: 57px;
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
}

.content {
  flex: 1;
  padding: 20px;
}

h1 {
  font-size: 52px;
  font-weight: 900;
}
</style>

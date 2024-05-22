<template>
  <div class="container">
    <LoaderSpinner v-if="loading" />
    <!-- Menu lateral -->
    <div class="sidebar" v-if="!loading && userInfos">
      <div class="user-info">
        <div class="user-picture">
          <img alt="Izabelly Francati Logo" src="@/assets/logo-preto-top.svg" />
        </div>
        <div class="user-name">{{ userInfos.name }}</div>
        <div class="user-email">{{ userInfos.email }}</div>
      </div>

      <div
        class="menu-icon"
        :class="{ active: currentComponent == HomePage }"
        @click="currentComponent = HomePage"
      >
        <Icon icon="bx:home" width="1.2em" height="1.2em" />
        <p>Dashboard</p>
      </div>
      <div
        class="menu-icon"
        :class="{ active: currentComponent == CreatePosts }"
        @click="currentComponent = CreatePosts"
      >
        <Icon icon="gridicons:create" width="1.2em" height="1.2em" />
        <p>Cadastrar</p>
      </div>
      <div class="menu-icon" @click="currentComponent = ManagePosts">
        <Icon icon="fluent:board-16-regular" width="1.2em" height="1.2em" />
        <p>Gerenciar</p>
      </div>

      <div class="menu-icon" @click="currentComponent = ManagePosts">
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

    <!-- Conteúdo dinâmico -->
    <div class="content" v-if="!loading">
      <div class="header" v-if="userInfos">
        <p>Dashboard</p>
      </div>
      <component :is="currentComponent" :user="userInfos"></component>
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
  color: black;
  height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}
.loader {
  top: 50%;
}

.content {
  flex: 1;
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
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
    &:hover {
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
  .user-picture {
    background: orange;
    height: 7rem;
    width: 7rem;
    border-radius: 50px;
    overflow: hidden;
    margin: 0 auto;
  }

  .user-name {
    font-size: 36px;
    font-weight: bold;
  }

  .user-email {
    font-size: 15px;
  }
}
</style>

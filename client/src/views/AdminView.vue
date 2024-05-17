<template>
  <div class="container">
    <LoaderSpinner v-if="loading" />
    <!-- Menu lateral -->
    <v-card v-if="!loading">
      <v-layout>
        <v-navigation-drawer expand-on-hover rail color="grey-darken-4">
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :subtitle="userInfos.email"
              :title="userInfos.name"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-folder"
              title="Home"
              @click="currentComponent = HomePage"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-multiple"
              title="Cadastrar Imóveis"
              @click="currentComponent = CreatePosts"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-multiple"
              title="Gerencia Imóveis"
              @click="currentComponent = ManagePosts"
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-star"
              title="Gerenciar conta"
              @click="currentComponent = ManagePosts"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item prepend-icon="mdi-star" title="Logout" @click="logOut()"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 250px"></v-main>
      </v-layout>
    </v-card>

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
</style>

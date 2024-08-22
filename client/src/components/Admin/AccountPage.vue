<template>
  <LoaderDots v-if="loading" />
  <p class="error-text" v-if="errorText">
    <span v-if="!errorText.errors">{{ errorText }}</span>
    <span v-for="erros in errorText.errors" :key="erros">
      {{ erros }}
    </span>
  </p>
  <p class="success-text" v-if="successText">{{ successText.message }}</p>
  <div class="account-container" v-if="!loading && userInfo">
    <div class="user-info">
      <h5>Informações basicas</h5>
      <div class="info-box">
        <label for="">Nome</label>
        <input type="text" v-model="userInfo.name" />
      </div>
      <div class="info-box">
        <label for="">E-mail</label>
        <input type="text" v-model="userInfo.email" />
      </div>
      <button @click="saveChanges()">Salvar mudanças</button>
    </div>

    <div class="user-info">
      <h5>Mudar Senha</h5>
      <div class="info-box">
        <label for="">Senha antiga</label>
        <input type="password" v-model="oldPassword" />
      </div>
      <div class="info-box">
        <label for="">Senha nova</label>
        <input type="password" v-model="newPassword" />
      </div>
      <div class="info-box">
        <label for="">Repita a senha</label>
        <input type="password" v-model="newCopyPassword" />
      </div>
      <button @click="savePassword()">Mudar senha</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/interfaces/interfaces'
import { onMounted, ref } from 'vue'
import LoaderDots from '../Shared/LoaderDots.vue'
import { useAuth } from '@/composables'

const userInfo = ref<User>()
const oldPassword = ref('')
const newPassword = ref('')
const newCopyPassword = ref('')
const errorText = ref()
const successText = ref()

const authFunction = useAuth()
const token = ref('')
const userId = ref('')
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  token.value = authFunction.checkLogin()
  userId.value = authFunction.loggedUserId()

  userInfo.value = await authFunction.getUserById(userId.value, token.value)
  loading.value = false
})

async function saveChanges() {
  successText.value = ''
  errorText.value = ''
  if (!userInfo.value) return
  loading.value = true

  const data = await authFunction.updateUser(
    userId.value,
    userInfo.value.name,
    userInfo.value.email
  )
  if (data.message) successText.value = data
  else if (data.errors) errorText.value = data
  loading.value = false
}

async function savePassword() {
  successText.value = ''
  errorText.value = ''
  if (newPassword.value !== newCopyPassword.value) {
    errorText.value =
      'As senhas não coincidem, por favor digite a senha nova e repita no campo abaixo'
    return
  }

  if (!newPassword.value || !newCopyPassword.value || !oldPassword.value) {
    errorText.value = 'Preencha todos os campos'
    return
  }

  if (!userInfo.value) return
  loading.value = true

  const data = await authFunction.updatePassword(
    userId.value,
    oldPassword.value,
    newCopyPassword.value
  )
  if (data.message) successText.value = data
  else if (data.errors) errorText.value = data
  loading.value = false
}
</script>

<style lang="scss" scoped>
.account-container {
  .user-info {
    border-radius: 24px;
    padding: 35px 40px 40px;
    margin-bottom: 1.875rem;
    background-color: #fff;
    border: 1px solid #bab9b9;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  h5 {
    font-size: 21px;
    padding: 0;
    margin: 0 0 5px 0;
    font-weight: 500;
    width: 100%;
  }

  label {
    width: 100%;
    padding: 0;
    font-size: 0.9375rem;
    font-weight: 400;
    margin: 0 0 7px;
    color: #222;
    float: left;
    vertical-align: top;
  }

  input,
  select {
    height: calc(1.9em + (1.5rem + 2px));
    margin: 0;
    display: block;
    width: 100%;
    padding: 0.75rem 1.29rem;
    font-size: 0.9375rem;
    line-height: 1.9;
    color: #1a1a1a;
    border: 1px solid #bab9b9;
    background-color: #fff;
    background-image: none;
    border-radius: 12px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
  .info-box {
    margin-bottom: 20px;
    width: 100%;
  }
}

.error-text,
.success-text {
  margin: 1rem auto;
  color: white;
  text-align: center;
  padding: 0.55rem;
  border-radius: 9px;
}

.error-text {
  background: #ff3333;
  -webkit-animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}
.success-text {
  background: #059f0d;
}
</style>

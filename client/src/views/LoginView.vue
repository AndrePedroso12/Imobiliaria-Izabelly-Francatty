<template>
  <section class="login-page">
    <div class="image-side">
      <img
        src="https://oneluxo.com.br/wp-content/uploads/2022/08/Pininfarina-blog-quarta-1-scaled-e1660151420613.jpg"
        alt=""
      />
    </div>

    <div class="login-content">
      <img alt="Izabelly Francati Logo" class="logo" src="@/assets/logo.svg" width="250" />
      <div class="error" v-if="hasError">{{ errorText }}</div>
      <LoaderDots v-if="loading" />
      <form @submit.prevent="Login()" method="POST" v-else>
        <h1 class="">Faça Login abaixo</h1>
        <div>
          <label class="">Email</label>
          <input
            type="email"
            name="email"
            v-model="email"
            placeholder="Seu Email "
            class=""
            autofocus
            required
          />
        </div>

        <div class="mt-4">
          <label class="">Senha</label>
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="Sua Senha"
            minlength="6"
            required
          />
        </div>

        <div class="text-right mt-2">
          <a href="#" class="">Esqueceu sua senha?</a>
        </div>

        <button type="submit" @submit="Login()">Log In</button>
      </form>

      <div class="copyright">
        <p>&copy; 2024 Izabelly Francatti - All Rights Reserved.</p>
        <p>
          Desenvolvolvido por
          <a href="https://andrepedroso.netlify.app" target="_blank" rel="noopener noreferrer">
            &copy; 2024 André Pedroso.</a
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LoaderDots from '@/components/Shared/LoaderDots.vue'
import { useAuth } from '@/composables'
import router from '@/router'
import { onMounted, ref } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorText = ref('')
const hasError = ref(false)

const authFunction = useAuth()
const token = ref('')
async function Login() {
  loading.value = true
  hasError.value = false
  try {
    const data = await authFunction.login(email.value, password.value)

    if (data) router.push({ name: 'admin' })
  } catch (error: any) {
    errorText.value = error
    hasError.value = true
  }
  loading.value = false
}

onMounted(() => {
  token.value = authFunction.checkLogin()
  if (token.value) {
    router.push({ name: 'admin' })
    return
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-wrap: nowrap;
  min-height: 100vh;
}

.image-side {
  /* height: 100vh; */
  min-height: 100%;
  width: 100%;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.login-content {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  padding: 4rem;
  text-align: left;
  width: 60%;
  justify-content: center;
  background: var(--color-text);
  position: relative;
}

input {
  padding: 0.95rem 1rem;
  border-radius: 0.5rem;
  font-size: 18px;
  width: 100%;
  background-color: #edf2f7;
  margin-top: 0.5rem;
  border: 1px solid #e2e8f0;
  color: black;
}

button {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-top: 1.5rem;
  background-color: #4299e1;
  color: white;
}

form {
  width: 100%;
  margin-top: 1.5rem;
}

label {
  color: #ffffff;
  font-size: 18px;
}

h1 {
  font-size: 1.5rem;
  margin-top: 3rem;
  line-height: 1.25;
  font-weight: 700;
  color: white;
  text-align: center;
}

p {
  color: #9e9e9e;
}

hr {
  width: 100%;
}

.text-right.mt-2 {
  margin-top: 10px;
  text-align: right;

  a {
    font-size: 0.975rem;
    color: white;
    font-weight: 600;
    text-align: right;
  }
}

.mt-4 {
  margin-top: 1rem;
}

.logo {
  width: 60%;
  margin: 0 auto;
}

.copyright {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  width: 70%;
}

.error {
  color: white;
  text-align: center;
  background: #ff3333;
  padding: 0.55rem;
  border-radius: 9px;
  margin: 25px auto -2rem;

  -webkit-animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}

@media (max-width: 1024px) {
  .login-page {
    flex-direction: column;
    background: var(--color-text);
  }

  .image-side {
    height: 33vh;
    min-height: none;
    width: 100%;
    overflow: hidden;
    object-fit: cover;
  }

  .image-side img {
    width: 100%;
  }
  .login-content {
    width: 100%;
  }
}

@-webkit-keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
    transform: translateX(-8px);
  }
}
@keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
    transform: translateX(-8px);
  }
}
</style>

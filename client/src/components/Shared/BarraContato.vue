<template>
  <div class="contato">
    <div class="contato__text">
      <h4>Ainda não encontrou o que procura?</h4>
      <p>Entre em contato conosco e encontraremos uma solução perfeita para você</p>
    </div>
    <div class="button">
      <button>
        <a href="https://api.whatsapp.com/send/?phone=5519974148500&type=phone_number&app_absent=0"
          >Entre em contato <Icon icon="mingcute:arrow-right-line" width="1.2em" height="1.2em"
        /></a>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped lang="scss">
.contato {
  background: var(--color-text);
  margin: 0 auto;
  width: 90%;
  border-radius: 16px;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 4rem;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 4rem 2rem;
  }

  h4 {
    font-size: 30px;
    font-weight: 500;
  }

  p {
    font-size: 17px;
  }

  a {
    font-size: 21px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: var(--color-text);
    font-weight: 500;
  }
  .button {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  button {
    @media (max-width: 768px) {
      margin: 1rem auto;
      float: left;
    }
  }
}
</style>

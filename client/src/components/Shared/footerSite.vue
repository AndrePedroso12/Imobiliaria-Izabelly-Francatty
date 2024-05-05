<template>
  <div class="footer">
    <div class="back-to-top">
      <a href="#">
        <Icon icon="tabler:arrow-up" width="1.5em" height="1.5em" />
      </a>
    </div>
    <div class="copyright">
      <p>Copyright © 2024. Izabelly Francatti</p>
    </div>
    <div class="logo">
      <img src="@/assets/logo-preto.svg" alt="Izabelly Francatti logo" srcset="" />
    </div>
    <div class="midias_sociais">
      <a href="http://" target="_blank" rel="noopener noreferrer">
        <Icon icon="ri:facebook-fill" width="1.5em" height="1.5em" />
      </a>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        <Icon icon="ri:instagram-line" width="1.5em" height="1.5em" />
      </a>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        <Icon icon="ri:whatsapp-line" width="1.5em" height="1.5em" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped lang="scss">
.footer {
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem 0;

  .back-to-top {
    position: absolute;
    background: var(--color-text);
    color: white;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 50%;
    margin: 0 auto;
    top: -20%;
    svg {
      margin-top: 25%;
      color: white;
    }
  }

  .copyright,
  .logo,
  .midias_sociais {
    margin: 0 auto;
  }

  .logo {
    margin-left: 3% !important;
  }

  .midias_sociais {
    svg {
      color: var(--color-text);
      margin: 0 10px;
    }
  }
}
</style>

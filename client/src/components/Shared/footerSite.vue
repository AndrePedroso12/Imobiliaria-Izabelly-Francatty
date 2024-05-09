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
      <RouterLink to="/">
        <img src="@/assets/logo-preto.svg" alt="Izabelly Francatti logo" srcset="" />
      </RouterLink>
    </div>
    <div class="midias_sociais">
      <span>Siga-nos nos:</span>
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
  width: 100%;
  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column-reverse;
  }

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
    @media (max-width: 768px) {
      top: -11%;
      right: 10px;
    }
  }

  .copyright,
  .logo,
  .midias_sociais {
    margin: 0 auto;
    @media (max-width: 768px) {
      margin: 0;
    }
  }

  .logo {
    margin-left: 3% !important;
    @media (max-width: 768px) {
      order: 1;
    }
  }

  .midias_sociais {
    span {
      font-size: 19px;
      font-weight: 500;
      line-height: 1;
    }
    svg {
      color: var(--color-text);
      margin: 0 10px;
    }
    @media (max-width: 768px) {
      order: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 1rem;
    }
  }

  .copyright {
    @media (max-width: 768px) {
      margin: 0 1rem;
    }
  }
}
</style>

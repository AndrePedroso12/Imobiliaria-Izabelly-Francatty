<template>
  <div>
    <div class="card">
      <p class="title">Lista de usuários</p>
      <div class="inner" v-for="card in 5" :key="card">nome</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.card {
  background-color: #282828;
  border-radius: 13px;
  padding: 1.5rem;
}

.title {
  font-weight: 600;
  font-size: 30px;
}
.inner {
  background: #1c1c1c;
  padding: 1.5rem;
  border-radius: 13px;
}
</style>

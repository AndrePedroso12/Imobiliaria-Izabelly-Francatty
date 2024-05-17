<template>
  <div>
    <div class="card">
      <p class="title">Lista de usuários</p>
      <div class="inner" v-for="card in 5" :key="card">nome</div>
    </div>

    <v-card title="Lista de usuários" variant="tonal">
      <v-card-text>
        <v-list lines="three">
          <v-list-item
            v-for="n in 3"
            :key="n"
            :title="'Item ' + n"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
            prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
          ></v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
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

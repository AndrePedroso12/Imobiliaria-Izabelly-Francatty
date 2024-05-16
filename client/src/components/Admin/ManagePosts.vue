<template>
  <div>Manage Posts</div>

  <LoaderSpinner v-if="loading" />
  <div class="error" v-if="hasError">{{ errorText }}</div>

  <div class="card all-imoveis" v-if="!loading && allImoveis">
    <p class="title">Lista de usuários</p>
    <div class="inner" v-for="card in allImoveis" :key="card">{{ card }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoaderSpinner from '@/components/Shared/LoaderSpinner.vue'
import { useImoveis } from '@/composables'

const loading = ref(false)
const imoveisFunctions = useImoveis()
const allImoveis = ref()
const errorText = ref('')
const hasError = ref(false)

onMounted(async () => {
  loading.value = true

  try {
    allImoveis.value = await imoveisFunctions.carregarImoveis()
  } catch (error: any) {
    errorText.value = error
    hasError.value = true
  }
  loading.value = false
})
</script>

<style lang="sass" scoped></style>

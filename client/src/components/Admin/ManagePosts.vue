<template>
  <div>Manage Posts</div>

  <LoaderSpinner v-if="loading" />
  <div class="error" v-if="hasError">{{ errorText }}</div>

  <div class="card all-imoveis" v-if="!loading && allImoveis">
    <p class="title">Todos os Imóveis</p>
    <div class="inner" v-for="card in allImoveis" :key="card.id">
      <p>{{ card.id }}</p>
      <p><Icon icon="ic:baseline-star" width="1.2em" height="1.2em" /> {{ card.isfavourite }}</p>
      <p>{{ card.location.city }}</p>
      <p>{{ card.location.neighborhood }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoaderSpinner from '@/components/Shared/LoaderSpinner.vue'
import { useImoveis } from '@/composables'
import type { ImovelType } from '@/interfaces/interfaces'

const loading = ref(false)
const imoveisFunctions = useImoveis()
const allImoveis = ref<ImovelType[]>()
const errorText = ref('')
const hasError = ref(false)

onMounted(async () => {
  loading.value = true

  try {
    allImoveis.value = await imoveisFunctions.carregarImoveisAdmin()
  } catch (error: any) {
    errorText.value = error
    hasError.value = true
  }
  loading.value = false
})
</script>

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

<template>
  <div class="container">
    <v-card title="Cadastrar um novo imóvel" variant="tonal" class="cadastro">
      <v-card-text class="inner">
        <Icon icon="gridicons:create" width="8em" height="8em" />
      </v-card-text>
    </v-card>

    <v-card title="Cadastros Recentes" variant="tonal" class="imoveis">
      <v-card-text class="inner">
        <LoaderSpinner v-if="loadingImoveis" />
        <Carousel
          v-bind="settings"
          :breakpoints="breakpoints"
          v-if="imoveisList && !loadingImoveis"
        >
          <Slide v-for="card in imoveisList" :key="card.id">
            <CardPrincipal :infos="card" />
          </Slide>
        </Carousel>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Carousel, Slide } from 'vue3-carousel'
import CardPrincipal from '../Shared/CardPrincipal.vue'
import type { ImovelType, SnapAlign } from '@/interfaces/interfaces'
import { ref } from 'vue'
import { useImoveis } from '@/composables'
import { onMounted } from 'vue'

const ImoveisFunction = useImoveis()
const imoveisList = ref<ImovelType>()
const loadingImoveis = ref(false)

async function getImoveis() {
  loadingImoveis.value = true
  try {
    const data = await ImoveisFunction.carregarImoveis()
    if (data) imoveisList.value = data
  } catch (error) {
    console.error('Erro ao carregar imóveis:', error)
  }
  loadingImoveis.value = false
}

onMounted(() => {
  getImoveis()
})

const settings = ref({
  itemsToShow: 1.2,
  snapAlign: 'center' as SnapAlign
})

const breakpoints = ref({
  700: {
    itemsToShow: 1,
    snapAlign: 'center' as SnapAlign
  },
  1024: {
    itemsToShow: 4.5,
    snapAlign: 'start' as SnapAlign
  }
})
</script>

<style lang="scss" scoped>
.cadastro {
  width: 30%;
  text-align: center;
  margin: 0 1rem;
}
</style>

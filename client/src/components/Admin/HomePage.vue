<template>
  <div class="home-container">
    <LoaderDots v-if="loadingFrase" />
    <div class="hello-container" v-if="user && fraseDoDia">
      <div class="text">
        <h1>Olá, {{ user.name }}</h1>
        <p class="title">Frase motivacional do dia:</p>
        <p class="frase">{{ fraseDoDia.resposta[0].frase }}</p>
        <p class="author">- {{ fraseDoDia.resposta[0].nomeAutor }}</p>
      </div>
      <div class="icon"><Icon icon="iconamoon:home-thin" width="1.2em" height="1.2em" /></div>
    </div>

    <div class="card-container" v-if="imoveisList">
      <div class="card">
        <div class="infos">
          <div class="number">{{ imoveisList.length }}</div>
          <div class="text">Imóveis cadastrados</div>
        </div>

        <div class="icon">
          <Icon icon="fluent:check-24-regular" width="1.2em" height="1.2em" />
        </div>
      </div>
      <div class="card">
        <div class="infos">
          <div class="number">{{ imoveisList.length }}</div>
          <div class="text">Imóveis cadastrados</div>
        </div>

        <div class="icon">
          <Icon icon="fluent:check-24-regular" width="1.2em" height="1.2em" />
        </div>
      </div>
      <div class="card">
        <div class="infos">
          <div class="number">{{ imoveisList.length }}</div>
          <div class="text">Imóveis cadastrados</div>
        </div>

        <div class="icon">
          <Icon icon="fluent:check-24-regular" width="1.2em" height="1.2em" />
        </div>
      </div>
    </div>

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
import { useAuth, useImoveis } from '@/composables'
import { onMounted } from 'vue'
import LoaderDots from '../Shared/LoaderDots.vue'
import LoaderSpinner from '../Shared/LoaderSpinner.vue'

const ImoveisFunction = useImoveis()
const authFunction = useAuth()
const imoveisList = ref<ImovelType[]>()
const fraseDoDia = ref()
const loadingImoveis = ref(false)
const loadingFrase = ref(false)

const props = defineProps<{
  user?: any
}>()

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
async function getFrases() {
  loadingFrase.value = true
  try {
    const data = await authFunction.getFrases()
    if (data) fraseDoDia.value = data
  } catch (error) {
    console.error('Erro ao carregar frases:', error)
  }
  loadingFrase.value = false
}

onMounted(() => {
  getImoveis()
  getFrases()
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
.hello-container {
  padding: 45px 40px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #e9e9e9;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 40px;
    font-weight: 500;
    margin: 0;
    line-height: 1.6;
  }

  .title {
    font-size: 11px;
  }

  .frase {
    font-style: italic;
  }

  .author {
    text-align: right;
  }

  .icon {
    font-size: 50px;
    margin-left: auto;
    position: relative;
    z-index: 1;
    &:before {
      -webkit-transition: all 0.2s ease-in-out 0s;
      -o-transition: all 0.2s ease-in-out 0s;
      transition: all 0.2s ease-in-out 0s;
      width: 45px;
      height: 45px;
      background: #e7c873;
      content: '';
      border-radius: 50%;
      position: absolute;
      left: -15px;
      bottom: 20px;
      z-index: -1;
    }
  }
}

.card-container {
  width: 100%;
  display: flex;
  gap: 0 20px;
  padding-bottom: 20px;

  .card {
    padding: 45px 40px;
    border-radius: 24px;
    background: #fff;
    border: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
    width: 50%;

    .number {
      font-size: 40px;
      font-weight: 500;
      margin: 0;
      line-height: 1.6;
    }
    .text {
      font-size: 16px;
      margin: 0;
      font-weight: 400;
    }
    .icon {
      font-size: 50px;
      margin-left: auto;
      position: relative;
      z-index: 1;

      &:before {
        left: -20px;
        width: 50px;
        height: 50px;
        -webkit-transition: all 0.2s ease-in-out 0s;
        -o-transition: all 0.2s ease-in-out 0s;
        transition: all 0.2s ease-in-out 0s;
        width: 45px;
        height: 45px;
        background: #e7c873;
        content: '';
        border-radius: 50%;
        position: absolute;
        left: -15px;
        bottom: 20px;
        z-index: -1;
      }
    }
  }
}
</style>

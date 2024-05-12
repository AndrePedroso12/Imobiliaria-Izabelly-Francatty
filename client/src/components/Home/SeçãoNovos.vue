<template>
  <div class="novos">
    <div class="novos__topo">
      <div class="novos__text">
        <h2 class="novos__title">Novos Imóveis na sua região</h2>
        <span class="novos__subtitle">Descubra o seu lar ideal</span>
      </div>

      <div class="novos__buttons">
        <button class="active">Comprar</button>
        <button>Alugar</button>
      </div>
    </div>
    <div class="novos__wrapper">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="card in cards" :key="card.id">
          <CardPrincipal :infos="card" />
        </Slide>
      </Carousel>
    </div>

    <button class="novos__button">
      <RouterLink :to="{ name: 'pesquisa' }">
        Ver todo nosso catálogo
        <Icon icon="eva:diagonal-arrow-right-up-outline" width="1.2em" height="1.2em" />
      </RouterLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import CardPrincipal from '../Shared/CardPrincipal.vue'
import type { ImovelType } from '@/interfaces/interfaces'
import { defineComponent, ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import type { SnapAlign } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const props = defineProps<{
  novosCadastros: ImovelType[]
}>()

const cards = ref(props.novosCadastros)

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

defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide
  }
})
</script>

<style scoped lang="scss">
.novos {
  text-align: center;
  padding: 4rem 0;
  background-color: #181a20;
  color: white;
  text-align: left;
  overflow: hidden;

  &__topo {
    padding: 0 8rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    @media (max-width: 768px) {
      padding: 1rem;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__wrapper {
    margin: 2rem 0 2rem 4rem;
    @media (max-width: 768px) {
      margin: 2rem 0;
    }
  }

  &__title {
    font-size: 40px;
    line-height: 1.3em;
    font-weight: 500;
  }

  &__subtitle {
    font-size: 17px;
  }

  &__buttons {
    display: flex;
    @media (max-width: 768px) {
      margin-top: 1rem;
    }
    button {
      margin: 0 1rem;
      background: #ffffff1a;
      color: white;
      &.active {
        background: white;
        color: black;
      }
      &:first-of-type {
        @media (max-width: 768px) {
          margin: 0;
        }
      }
    }
  }

  &__button {
    margin: 1rem auto;
    a {
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
      display: flex;
      align-items: center;
    }
  }

  .carousel__next,
  .carousel__prev {
    border-color: transparent;
    color: black;
    font-weight: 300;
    background: white;
    backdrop-filter: blur(50px);
    opacity: 0.8;
    border-radius: 40px;
    width: 60px;
    height: 40px;
  }
}
</style>

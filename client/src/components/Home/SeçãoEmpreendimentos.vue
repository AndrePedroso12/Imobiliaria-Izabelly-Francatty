<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="empreendimentos">
    <h2 class="empreendimentos__title">Últimos Empreendimentos</h2>
    <span class="empreendimentos__subtitle"
      >Descubra os empreendimentos mais promissores da cidade</span
    >

    <div class="empreendimentos__wrapper">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(card, index) in EmpreendimentosRef" :key="index">
          <CardEmpreendimentos :card="card" />
        </Slide>
        <template #addons>
          <Navigation>
            <template #next>
              <span class="carousel__next"> > </span>
            </template>
            <template #prev>
              <span class="carousel__prev"> < </span>
            </template>
          </Navigation>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardEmpreendimentos from './CardEmpreendimentos.vue'
import { defineComponent, ref } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import type { SnapAlign } from '@/interfaces/interfaces'
import { EmpreendimentosTeste } from '@/components/Shared/dataEmpreendimentos.js'

import 'vue3-carousel/dist/carousel.css'

const EmpreendimentosRef = ref(EmpreendimentosTeste)

const settings = ref({
  itemsToShow: 1.3,
  snapAlign: 'center' as SnapAlign,
  autoplay: 5000,
  wrapAround: true
})

const breakpoints = ref({
  700: {
    itemsToShow: 2,
    snapAlign: 'center' as SnapAlign
  },
  1024: {
    itemsToShow: 6,
    snapAlign: 'start' as SnapAlign
  }
})

defineComponent({
  name: 'SliderEmpreendimentos',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  }
})
</script>

<style scoped lang="scss">
.empreendimentos {
  text-align: center;
  margin-top: 4rem;
  padding: 4rem 0;
  background-color: #f7f7f7;

  &__title {
    font-size: 40px;
    line-height: 1.3em;
    font-weight: 500;
  }

  &__subtitle {
    font-size: 17px;
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

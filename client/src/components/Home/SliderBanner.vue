<template>
  <Carousel :autoplay="5000" :wrap-around="true" :transition="2500">
    <Slide v-for="slide in banners" :key="slide.id">
      <div class="carousel__overlay"></div>
      <div class="carousel__item" :style="{ backgroundImage: `url(${slide.mainImage})` }">
        <div class="carousel__text">
          <div class="carousel__description">
            {{ slide.details.rooms }} Quartos - {{ slide.details.bathrooms }} Banheiros -
            {{ slide.details.area }}m²
          </div>
          <div class="carousel__title">
            Oportunidade em <br />
            {{ slide.location.neighborhood }}
          </div>
          <div class="carousel__price">R$ {{ slide.price }}</div>
          <RouterLink :to="{ name: 'imovel', params: { id: slide.id } }">
            <button class="carousel__button">
              Saiba Mais <Icon icon="lets-icons:arrow-right" width="1.5em" height="1.5em" />
            </button>
          </RouterLink>
        </div>
      </div>
    </Slide>

    <template #addons>
      <!-- <Navigation /> -->
      <navigation>
        <template #next>
          <span class="carousel__next"> > </span>
        </template>
        <template #prev>
          <span class="carousel__prev"> < </span>
        </template>
      </navigation>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { Icon } from '@iconify/vue'

import 'vue3-carousel/dist/carousel.css'
import type { ImovelType } from '@/interfaces/interfaces'

const props = defineProps<{
  imoveis: ImovelType[]
}>()

const banners = ref(props.imoveis)

defineComponent({
  name: 'SliderBanner',
  components: {
    Carousel,
    Slide,
    Navigation
  }
})
</script>

<style scoped lang="scss">
.carousel {
  &__item {
    min-height: 200px;
    width: 100%;
    height: 100%;
    background-color: var(--vc-clr-white);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__slide {
    min-height: 43rem;
    background: white;
  }

  &__prev,
  &__next {
    box-sizing: content-box;
    border: 5px solid white;
  }

  &__overlay {
    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &__text {
    position: absolute;
  }

  &__title {
    font-size: 60px;
    line-height: normal;
    font-weight: 500;
    padding: 3rem 0;
    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  &__description {
    font-size: 17px;
    font-weight: 400;
  }

  &__price {
    font-size: 21px;
    font-weight: 600;
    span {
      font-weight: 400;
      font-size: 70%;
    }
  }

  &__button {
    margin: 20px auto;
    transition: 0.4s;
    &:hover {
      transform: scale(1.3);
      background-color: white;
    }
  }

  &__prev,
  &__next {
    border-color: transparent;
    color: #fff;
    font-weight: 300;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(50px);
    opacity: 0.8;
    border-radius: 40px;
    width: 60px;
    height: 40px;
  }

  a {
    color: var(--color-text);
  }
}
</style>

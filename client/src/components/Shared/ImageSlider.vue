<template>
  <Carousel :autoplay="5000" :wrap-around="true">
    <Slide v-for="slide in slides" :key="slide">
      <div class="carousel__item">
        <figure>
          <img :src="slide" alt="" srcset="" />
        </figure>
      </div>
    </Slide>

    <template #addons>
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

import 'vue3-carousel/dist/carousel.css'

const props = defineProps<{
  imagens: string[]
}>()

const slides = ref(props.imagens)

defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Navigation
  }
})
</script>

<style scoped lang="scss">
.carousel {
  height: 100%;
  width: 100%;

  :deep(.carousel__viewport),
  :deep(.carousel__track) {
    max-height: inherit;
  }

  &__item {
    min-height: 200px;
    width: 100%;
    height: 100%;
  }
  &__slide {
    background: white;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__prev,
  &__next {
    box-sizing: content-box;
    border: 5px solid white;
  }

  &__prev,
  &__next {
    border-color: transparent;
    color: #fff;
    font-weight: 300;
    background: rgba(26, 26, 26, 0.2);
    backdrop-filter: blur(50px);
    opacity: 0.8;
    border-radius: 40px;
    width: 60px;
    height: 40px;
  }
}
</style>

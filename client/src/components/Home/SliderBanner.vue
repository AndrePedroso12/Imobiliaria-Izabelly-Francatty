<template>
  <Carousel :autoplay="5000" :wrap-around="true">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__overlay"></div>
      <div
        class="carousel__item"
        style="
          background-image: url(https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg);
        "
      >
        <div class="carousel__text">
          {{ slide }}
          <div class="carousel__description">4 Quartos - 2 Banheiros - 180m²</div>
          <div class="carousel__title">Oportunidade em <br />Nova Jaguariúna</div>
          <div class="carousel__price">R$ 300<span>mil</span></div>
          <div class="carousel__button">Saiba Mais</div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  }
})
</script>

<style scoped lang="scss">
.carousel__item {
  min-height: 200px;
  width: 100%;
  height: 100%;
  background-color: var(--vc-clr-white);
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.carousel__slide {
  min-height: 41rem;
  background: white;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.carousel__overlay {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  width: 100%;
  height: 100%;
  position: absolute;
}

.carousel__text {
  position: absolute;
}

.carousel__title {
  font-size: 60px;
  line-height: normal;
  font-weight: 500;
  padding: 3rem 0;
}

.carousel__description {
  font-size: 17px;
  font-weight: 100;
}
</style>

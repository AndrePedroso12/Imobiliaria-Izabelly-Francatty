<template>
  <div class="imovel-page">
    <div class="pagetop" id="top">
      <div class="top_description">
        <div class="breadcrumbs">
          <RouterLink to="/">Home / </RouterLink>
          <RouterLink to="/">{{ imovel.location.city }} / </RouterLink>
          <RouterLink to="/">{{ imovel.location.neighborhood }}</RouterLink>
        </div>

        <div class="share">
          <Icon icon="solar:share-outline" width="1.2em" height="1.2em" />Compartilhar
          <Icon icon="carbon:copy-link" width="1.2em" height="1.2em" /> Copiar Link
          <Icon icon="formkit:bookmark" width="1.2em" height="1.2em" /> Salavr nos favoritos
        </div>
      </div>
      <div class="title_section">
        <div class="title">
          <h1>{{ imovel.category }} em {{ imovel.location.neighborhood }}</h1>
          <p>
            <Icon icon="arcticons:mapsgo" width="2em" height="2em" /> {{ imovel.location.city }}
          </p>
        </div>

        <div class="price">
          <p>{{ imovel.details.area }}m²</p>
          <p class="price_num">R${{ imovel.price }}</p>
        </div>
      </div>
    </div>
    <div class="galeria">
      <Carousel
        id="gallery"
        :items-to-show="1"
        :wrap-around="false"
        :transition="500"
        v-model="currentSlide"
      >
        <Slide v-for="(image, index) in imovel.images" :key="index">
          <div class="carousel__item">
            <img :src="image" alt="Imagem do Imóvel" class="carousel__item" />
          </div>
        </Slide>
      </Carousel>

      <Carousel
        id="thumbnails"
        :items-to-show="4"
        v-model="currentSlide"
        :transition="500"
        snapAlign="start"
        ref="carousel"
      >
        <Slide v-for="(image, index) in imovel.images" :key="index">
          <div class="carousel__item" @click="slideTo(index - 1)">
            <img :src="image" alt="Imagem do Imóvel" class="carousel__item" />
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImoveisTeste } from '@/components/Shared/dataTest'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const imovel = ref(ImoveisTeste[0])
const currentSlide = ref(0)

function slideTo(val: number) {
  currentSlide.value = val
}
</script>

<style lang="scss">
.imovel-page {
  padding: 2rem;
}

.pagetop {
  padding: 10rem 0 30px;
  .breadcrumbs a {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
  }
}

.title_section {
  display: flex;
  justify-content: space-between;
  .title {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    gap: 12px;
  }
  h1 {
    margin: 0;
    line-height: 1.2;
    font-size: 26px;
    font-weight: 500;
  }
  svg {
    vertical-align: middle;
    font-size: 20px;
    margin-right: 10px;
  }
  p {
    font-size: 1rem;
  }
  .price {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    gap: 8px;
    p {
      text-align: right;
    }
    .price_num {
      font-size: 26px;
      font-weight: 500;
      line-height: 1.5;
    }
  }
}

.top_description {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  flex-wrap: wrap;
}

.galeria {
  width: 75%;
  .carousel__item {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    margin-right: 18px;
    overflow: hidden;
  }
  #thumbnails {
    margin: 1rem 0;
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

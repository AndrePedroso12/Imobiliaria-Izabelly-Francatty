<template>
  <div class="mais_buscados">
    <h2 class="mais_buscados__title">Mais Buscados</h2>
    <span class="mais_buscados__subtitle"
      >Encontre as jóias mais cobiçadas da nossa imobiliária</span
    >
    <div class="mais_buscados__buttons">
      <ul>
        <li :class="{ active: filterType === 'todos' }" @click="filter('todos')">
          Todos os Imóveis
        </li>
        <li :class="{ active: filterType === 'comprar' }" @click="filter('comprar')">Comprar</li>
        <li :class="{ active: filterType === 'alugar' }" @click="filter('alugar')">Alugar</li>
      </ul>
    </div>
    <div class="mais_buscados__wrapper">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(chunk, index) in chunkedCards" :key="index">
          <!-- Iterate over items in each chunk -->
          <template v-for="card in chunk" :key="card.id">
            <CardMaisBuscados :card-infos="card" />
          </template>
        </Slide>
      </Carousel>
    </div>

    <button class="mais_buscados__button round">
      <RouterLink :to="{ name: 'pesquisa' }"
        >Ver Todos <Icon icon="lets-icons:arrow-right" width="1.5em" height="1.5em"
      /></RouterLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import CardMaisBuscados from './CardMaisBuscados.vue'
import type { ImovelType, SnapAlign } from '@/interfaces/interfaces'
import { computed, defineComponent, ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const props = defineProps<{
  maisBuscados: ImovelType[]
}>()

const cards = ref(props.maisBuscados)
const chunkSize = 6

const chunkedCards = computed(() => {
  const chunks: ImovelType[][] = []
  for (let i = 0; i < filteredCards.value.length; i += chunkSize) {
    chunks.push(filteredCards.value.slice(i, i + chunkSize))
  }
  return chunks
})

const filterType = ref<'todos' | 'comprar' | 'alugar'>('todos')

const filter = (type: 'todos' | 'comprar' | 'alugar') => {
  filterType.value = type
}

const filteredCards = computed(() => {
  if (filterType.value === 'comprar') {
    return cards.value.filter((card) => card.model === 'Compra')
  } else if (filterType.value === 'alugar') {
    return cards.value.filter((card) => card.model === 'Alugar')
  } else {
    return cards.value
  }
})

const settings = ref({
  itemsToShow: 2,
  snapAlign: 'start' as SnapAlign,
  touchDrag: false,
  transition: 2500
})

const breakpoints = ref({
  700: {
    itemsToShow: 2,
    snapAlign: 'center' as SnapAlign
  },
  1024: {
    itemsToShow: 1,
    snapAlign: 'start' as SnapAlign,
    autoplay: 7000,
    wrapAround: true
  }
})

defineComponent({
  name: 'SliderEmpreendimentos',
  components: {
    Carousel,
    Slide
  }
})
</script>

<style scoped lang="scss">
.mais_buscados {
  text-align: center;
  margin-top: 8rem;

  &__title {
    font-size: 40px;
    line-height: 1.3em;
    font-weight: 500;
  }

  &__subtitle {
    font-size: 17px;
  }

  &__buttons {
    margin: 2rem auto;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    li {
      cursor: pointer;
      color: var(--color-text);
      border-radius: 40px;
      padding: 4px 20px;
      font-size: 1rem;
      font-weight: 500;
    }

    li.active {
      border-color: var(--color-text);
      border: 2px solid;
      background: var(--color-background);
      border-radius: 40px;
      padding: 4px 20px;
      font-size: 1rem;
      font-weight: 500;
    }
    li::marker {
      content: '';
    }
  }

  &__wrapper {
    .carousel__slide {
      display: flex;
      flex-wrap: wrap;
      @media (max-width: 768px) {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
        min-width: 100%;
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
}
</style>

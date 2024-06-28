<template>
  <div class="mais_buscados">
    <h2 class="mais_buscados__title" v-motion-slide-visible-once-top>Mais Buscados</h2>
    <span class="mais_buscados__subtitle" v-motion-slide-visible-once-top>
      Encontre as jóias mais cobiçadas da nossa imobiliária</span
    >
    <div class="mais_buscados__buttons" v-motion-slide-visible-once-top>
      <ul>
        <li :class="{ active: filterType === 'todos' }" @click="filter('todos')">
          Todos os Imóveis
        </li>
        <li :class="{ active: filterType === 'comprar' }" @click="filter('comprar')">Comprar</li>
        <li :class="{ active: filterType === 'alugar' }" @click="filter('alugar')">Alugar</li>
      </ul>
    </div>
    <div class="mais_buscados__wrapper">
      <!-- <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(chunk, index) in chunkedCards" :key="index"> -->
      <!-- Iterate over items in each chunk -->
      <template v-for="card in chunkedCards" :key="card.id">
        <CardMaisBuscados :card-infos="card" />
      </template>
      <!-- </Slide> 
      </Carousel>-->
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
  return filteredCards.value.slice(0, chunkSize) // Return the first 6 cards as a flat array
})

const filterType = ref<'todos' | 'comprar' | 'alugar'>('todos')

const filter = (type: 'todos' | 'comprar' | 'alugar') => {
  filterType.value = type
}

const filteredCards = computed(() => {
  if (filterType.value === 'comprar') {
    return cards.value.filter((card) => card.model === 'Compra' || card.model === 'Compra e Aluga')
  } else if (filterType.value === 'alugar') {
    return cards.value.filter((card) => card.model === 'Alugar' || card.model === 'Compra e Aluga')
  } else {
    return cards.value
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
      transition: 0.3s;
      &:hover {
        outline: 1px solid var(--color-background);
        outline-offset: 5px;
        background: white;
        border-color: white;
        color: var(--color-text);
        transform: scale(1.1);
      }
    }

    li.active {
      cursor: auto;
      border-color: var(--color-text);
      border: 2px solid;
      background: var(--color-background);
      border-radius: 40px;
      padding: 4px 20px;
      font-size: 1rem;
      font-weight: 500;
      &:hover {
        outline: none;
        transform: none;
      }
    }
    li::marker {
      content: '';
    }
  }

  &__wrapper {
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
  .cards_mais_buscados {
    &:hover {
      outline: 1px solid var(--color-background);
      outline-offset: 10px;
      background: white;
      transform: translateY(-10px);
    }
  }
}
</style>

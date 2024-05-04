<template>
  <div class="mais_buscados">
    <h2 class="mais_buscados__title">Mais Buscados</h2>
    <span class="mais_buscados__subtitle"
      >Encontre as jóias mais cobiçadas da nossa imobiliária</span
    >
    <div class="mais_buscados__buttons">
      <ul>
        <li class="active">Todos os Imóveis</li>
        <li>Comprar</li>
        <li>Alugar</li>
      </ul>
    </div>
    <div class="mais_buscados__wrapper">
      <CardMaisBuscados v-for="card in cards" :key="card.id" :card-infos="card" />
    </div>

    <button class="mais_buscados__button round">
      Ver Todos <Icon icon="lets-icons:arrow-right" width="1.5em" height="1.5em" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import CardMaisBuscados from './CardMaisBuscados.vue'
import type { ImovelType } from '@/interfaces/interfaces'
import { ref } from 'vue'

const props = defineProps<{
  maisBuscados: ImovelType[]
}>()

const cards = ref(props.maisBuscados)
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  &__button {
    margin: 1rem auto;
  }
}
</style>

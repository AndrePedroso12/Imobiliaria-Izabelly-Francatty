<template>
  <div class="categorias">
    <h3>De acordo com sua nescessidade</h3>
    <p>Encontre o imóvel perfeito para você:</p>
    <div class="categorias__wrapper">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(count, category) in categoryCounts" :key="category">
          <a class="categorias__item">
            <Icon :icon="getCategoryIcon(category)" width="2em" height="2em" />
            <span class="title">{{ category }}s</span>
            <span class="subtitle">{{ count }} Propriedades</span>
          </a>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImovelType } from '@/interfaces/interfaces'
import { Icon } from '@iconify/vue'
import { computed, defineComponent, ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const props = defineProps<{
  categorias: ImovelType[]
}>()

const categorias = ref(props.categorias)

const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}

  categorias.value.forEach((obj) => {
    if (obj.category in counts) {
      counts[obj.category]++
    } else {
      counts[obj.category] = 1
    }
  })

  return counts
})
function getCategoryIcon(category: string) {
  switch (category) {
    case 'Casa':
      return 'solar:home-broken'
    case 'Apartamento':
      return 'clarity:building-line'
    case 'Terreno':
      return 'mdi:surface-area'
    case 'Area':
      return 'mdi:surface-area'
    case 'Condomínio':
      return 'bi:houses'
    case 'Galpão':
      return 'ph:warehouse'

    default:
      return ''
  }
}

const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center',
  autoplay: '2000'
})

const breakpoints = ref({
  700: {
    itemsToShow: 2,
    snapAlign: 'center'
  },
  1024: {
    itemsToShow: 6,
    snapAlign: 'start'
  }
})

defineComponent({
  name: 'CategoriasSldie',
  components: {
    Carousel,
    Slide
  }
})
</script>

<style scoped lang="scss">
.categorias {
  background: var(--color-text);
  width: 90%;
  border-radius: 16px;
  margin: 0 auto;
  color: white;
  padding: 7rem 6rem;
  margin-bottom: 7rem;

  @media (max-width: 768px) {
    width: 95%;
    padding: 3rem 0;
    margin-bottom: 3rem;
  }

  h3 {
    color: #ffffff;
    font-size: 40px;
    line-height: 1.3em;
    font-weight: 500;
    @media (max-width: 768px) {
      padding: 0 2rem;
    }
  }

  p {
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      padding: 0 2rem;
    }
  }

  &__wrapper {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // flex-wrap: nowrap;
    // flex-direction: row;
  }

  &__item {
    padding: 60px 30px 50px;
    border-radius: 16px;
    margin: 20px 15px;
    background: white;
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    align-items: center;
    width: 90%;

    .title {
      font-size: 19px;
      margin: 0 0 4px;
      line-height: 1.2;
      font-weight: 500;
    }

    .subtitle {
      font-size: 13px;
    }

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>

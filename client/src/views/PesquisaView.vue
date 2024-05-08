<template>
  <div class="pagetop" id="top">
    <h1>Resultados da Pesquisa</h1>

    <div class="breadcrumbs">
      <RouterLink to="/">Home</RouterLink><span v-if="shouldDisplayBar()"> /</span>
      <RouterLink to="/" v-if="$route.params.cidade">{{ $route.params.cidade }} /</RouterLink>
      <RouterLink to="/" v-if="$route.params.categoria">{{ $route.params.categoria }} /</RouterLink>
      <RouterLink to="/" v-if="$route.params.modelo">{{ $route.params.modelo }}</RouterLink>
    </div>
    <!-- Filtros ativos em formato de tags -->
    <div class="active-filters">
      <span v-for="(value, key) in activeFilters" :key="key" class="active-filter">
        {{ value.value }}
        <button @click="removeFilter(value.key)" class="remove-filter">x</button>
      </span>
    </div>
  </div>
  <div class="search_results">
    <!-- Sua barra de filtro lateral -->
    <div class="filter-bar">
      <h2>Filtros</h2>
      <!-- Filtro por cidade -->
      <select v-model="selectedCity" @change="applyFilters">
        <option value="" selected>Todas as cidades</option>
        <option v-for="city in uniqueCities" :key="city">{{ city }}</option>
      </select>
      <!-- Filtro por modelo -->
      <select v-model="selectedModel" @change="applyFilters">
        <option value="" selected>Todos os modelos</option>
        <option v-for="model in uniqueModels" :key="model">{{ model }}</option>
      </select>
      <!-- Filtro por categoria -->
      <select v-model="selectedCategory" @change="applyFilters">
        <option value="" selected>Todas as categorias</option>
        <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
      </select>
      <!-- Filtro por preço (slider) -->
      <span>Filtrar por preço:</span>
      <Slider :min="minPrice" :max="maxPrice" v-model="priceRange" />

      <!-- Filtro por quartos -->
      <select v-model="selectedRooms" @change="applyFilters">
        <option :value="0" selected>Qtd. quartos</option>
        <option v-for="room in uniqueRoomsSorted" :key="room" :value="room">{{ room }}</option>
      </select>
      <!-- Filtro por banheiros -->
      <select v-model="selectedBathrooms" @change="applyFilters">
        <option :value="0" selected>Qtd. banheiros</option>
        <option v-for="bathroom in uniqueBathroomsSorted" :key="bathroom" :value="bathroom">
          {{ bathroom }}
        </option>
      </select>
      <!-- Filtro por vagas de garagem -->
      <select v-model="selectedGarage" @change="applyFilters">
        <option :value="0" selected>Qtd. vagas</option>
        <option v-for="garage in uniqueGaragesSorted" :key="garage" :value="garage">
          {{ garage }}
        </option>
      </select>
    </div>

    <div class="results" v-if="paginatedImovies.length">
      <!-- Seletor de ordenação -->
      <div class="order-select">
        <p>
          Mostrando {{ paginatedImovies.length }} resultados de {{ totalResults }}
          <span v-if="totalPages >= 2"> - Página {{ currentPage }} de {{ totalPages }}</span>
        </p>
        <select v-model="selectedOrder" @change="applyFilters">
          <option value="precoMenor">Preço: Menor para Maior</option>
          <option value="precoMaior">Preço: Maior para Menor</option>
          <option value="maisRecentes">Mais Recentes</option>
        </select>
      </div>
      <Slide v-for="card in paginatedImovies" :key="card.id">
        <CardPrincipal :infos="card" />
      </Slide>
      <!-- Paginação -->
    </div>
    <div class="no_results" v-else>
      <p>Ops, parece que no momento não temos nenhum resultado em sua busca</p>
      <p>
        Entre em contato, talvez possamos achar algo especial para você e que atenda suas
        nescessidades
      </p>
      <button><a href="">Entre em contato</a></button>
    </div>
  </div>
  <div class="pagination" v-if="totalPages >= 2">
    <a href="#"> <button @click="previousPage" :disabled="currentPage === 0">Anterior</button></a>
    <span>{{ currentPage }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages - 1">Próxima</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ImoveisTeste } from '../components/Shared/dataTest.js'
import { ref, computed } from 'vue'
import Slider from '../components/Shared/Slider.vue'

import CardPrincipal from '@/components/Shared/CardPrincipal.vue'

const ImoviesRef = ref(ImoveisTeste)
const route = useRoute()

// Filtros selecionados
const selectedCity = ref(route.params.cidade)
const selectedModel = ref(route.params.modelo)
const selectedCategory = ref(route.params.categoria)
const selectedRooms = ref(0)
const selectedBathrooms = ref(0)
const selectedGarage = ref(0)
const priceRange = ref([0, 1000000]) // Initial price range
const minPrice = computed(() => Math.min(...ImoviesRef.value.map((imovel) => imovel.price)))
const maxPrice = computed(() => Math.max(...ImoviesRef.value.map((imovel) => imovel.price)))
const selectedOrder = ref('precoMenor') // Default to sorting by lowest price
// Paginação
const perPage = 10
const currentPage = ref(0)

// Calcular o total de páginas
const totalPages = computed(() => Math.ceil(filteredImovies.value.length / perPage))

// Filtrar imóveis com base nos filtros selecionados
const filteredImovies = computed(() => {
  let filtered = ImoviesRef.value

  // Filtro por cidade
  if (selectedCity.value) {
    filtered = filtered.filter((imovel) => imovel.location.city === selectedCity.value)
  }

  // Filtro por modelo
  if (selectedModel.value) {
    filtered = filtered.filter((imovel) => imovel.model === selectedModel.value)
  }

  // Filtro por categoria
  if (selectedCategory.value) {
    filtered = filtered.filter((imovel) => imovel.category === selectedCategory.value)
  }

  // Filtro por preço
  filtered = filtered.filter(
    (imovel) => imovel.price >= priceRange.value[0] && imovel.price <= priceRange.value[1]
  )

  // Filtro por quartos
  if (selectedRooms.value) {
    filtered = filtered.filter((imovel) => imovel.details.rooms === selectedRooms.value)
  }

  // Filtro por banheiros
  if (selectedBathrooms.value) {
    filtered = filtered.filter((imovel) => imovel.details.bathrooms === selectedBathrooms.value)
  }

  // Filtro por vagas de garagem
  if (selectedGarage.value) {
    filtered = filtered.filter((imovel) => imovel.details.garage === selectedGarage.value)
  }

  switch (selectedOrder.value) {
    case 'precoMenor':
      filtered = filtered.sort((a, b) => a.price - b.price)
      break
    case 'precoMaior':
      filtered = filtered.sort((a, b) => b.price - a.price)
      break
    // case 'maisRecentes':
    //   filtered = filtered.sort((a, b) => new Date(b.id) - new Date(a.id))
    //   break
  }

  return filtered
})

const totalResults = computed(() => {
  return totalPages.value * filteredImovies.value.length
})

// Imóveis paginados
const paginatedImovies = computed(() => {
  const startIndex = currentPage.value * perPage
  return filteredImovies.value.slice(startIndex, startIndex + perPage)
})

// Funções de navegação de página
function nextPage() {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

function previousPage() {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

// Lista única de cidades para o filtro
const uniqueCities = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.location.city))]
})

// Lista única de modelos para o filtro
const uniqueModels = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.model))]
})

// Lista única de categorias para o filtro
const uniqueCategories = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.category))]
})

// Lista única de quartos para o filtro
const uniqueRooms = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.details.rooms || 0))]
})

// Lista única de banheiros para o filtro
const uniqueBathrooms = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.details.bathrooms || 0))]
})

// Lista única de vagas de garagem para o filtro
const uniqueGarages = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.details.garage || 0))]
})

// Function to sort values from smallest to largest
function sortValues(values: number[]): number[] {
  return values.slice().sort((a, b) => a - b)
}

// Compute sorted lists of rooms, bathrooms, and garage for selects
const uniqueRoomsSorted = computed(() => sortValues(uniqueRooms.value))
const uniqueBathroomsSorted = computed(() => sortValues(uniqueBathrooms.value))
const uniqueGaragesSorted = computed(() => sortValues(uniqueGarages.value))

function shouldDisplayBar() {
  return route.params.cidade || route.params.categoria || route.params.modelo
}
// Obtenha os filtros ativos
const activeFilters = computed(() => {
  const filters = []

  if (selectedCity.value) filters.push({ key: 'city', value: selectedCity.value })
  if (selectedModel.value) filters.push({ key: 'model', value: selectedModel.value })
  if (selectedCategory.value) filters.push({ key: 'category', value: selectedCategory.value })
  if (maxPrice.value !== null) filters.push({ key: 'price', value: `Preço até ${maxPrice.value}` })

  return filters
})

// Remover um filtro selecionado
function removeFilter(key: any) {
  console.log(key)
  switch (key) {
    case 'city':
      selectedCity.value = ''
      break
    case 'model':
      selectedModel.value = ''
      break
    case 'category':
      selectedCategory.value = ''
      break
    case 'price':
      maxPrice.value = null
      break
  }
}

// Aplicar os filtros selecionados
function applyFilters() {
  // Redirecione ou atualize a rota conforme necessário
  // Exemplo:
  // router.push({ query: { cidade: selectedCity.value, modelo: selectedModel.value, categoria: selectedCategory.value, precoMin: priceRange.value[0], precoMax: priceRange.value[1], quartos: selectedRooms.value, banheiros: selectedBathrooms.value, garagem: selectedGarage.value }})
}
</script>

<style scoped lang="scss">
.pagetop {
  margin: 0 auto;
  color: var(--color-text);
  text-align: center;
  margin-top: 10rem;
  h1 {
    font-size: 40px;
    font-weight: 500;
  }

  a {
    font-size: 16px;
    color: var(--color-text);
  }
}

.search_results {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 2rem;
  min-height: 82vh;
  .results {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    align-items: stretch;
    align-content: space-around;
    justify-content: space-between;
    gap: 40px 0;
    padding: 0 15px 15px 65px;
    width: 79%;

    slide {
      width: 48%;

      article.card {
        width: 100% !important;
        margin: 0;
      }
    }
  }
}

.no_results {
  text-align: center;
  margin: 0 auto;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    text-align: center;
    margin: 0 auto;
    font-size: 26px;
    font-weight: bold;
  }
  button {
    margin: 2rem auto;
    font-size: 25px;
    a {
      color: black;
      font-weight: 500;
    }
  }
}
.filter-bar {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 58%;
  max-width: 18rem;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 16px;
  border: 1px solid #ebebeb;
  justify-content: flex-start;
  gap: 20px;
  height: fit-content;
  position: sticky;
  top: 6rem;
}

.order-select {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #545454;
  select {
    width: 28%;
  }
}

.pagination {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  width: 33%;
  margin: 4rem auto;
}

select {
  appearance: none;
  outline: 0;
  font: inherit;
  background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E);
  background-size: 0.6em;
  background-position: calc(100% - 1.3em) center;
  background-repeat: no-repeat;
  color: var(--color-text);
  cursor: pointer;
  display: block;
  width: 100%;
  padding: 0.75rem 1.29rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.9;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e9e9e9;
  appearance: none;
  border-radius: 12px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
  /* <option> colors */
  option {
    color: inherit;
    background-color: var(--option-bg);
  }

  /* Arrow */
  &::after {
    content: '\25BC';
    position: absolute;
    top: 0;
    right: 0;
    padding: 1em;
    background-color: #34495e;
    transition: 0.25s all ease;
    pointer-events: none;
  }
}

:root {
  --arrow-bg: rgba(255, 255, 255, 0.3);
  --arrow-icon: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg);
  --option-bg: white;
  --select-bg: rgba(255, 255, 255, 0.2);
}
</style>

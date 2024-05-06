<template>
  <div class="pagetop">
    <h1>Resultados da Pesquisa</h1>

    <div class="breadcrumbs">
      <RouterLink to="/">Home</RouterLink><span v-if="shouldDisplayBar()"> /</span>
      <RouterLink to="/" v-if="$route.params.cidade">{{ $route.params.cidade }} /</RouterLink>
      <RouterLink to="/" v-if="$route.params.categoria">{{ $route.params.categoria }} /</RouterLink>
      <RouterLink to="/" v-if="$route.params.modelo">{{ $route.params.modelo }}</RouterLink>
    </div>
  </div>
  <div class="search_results">
    <!-- Sua barra de filtro lateral -->
    <div class="filter-bar">
      <h2>Filtros</h2>
      <!-- Filtro por cidade -->
      <select v-model="selectedCity" @change="applyFilters">
        <option value="">Todas as cidades</option>
        <option v-for="city in uniqueCities" :key="city">{{ city }}</option>
      </select>
      <!-- Filtro por modelo -->
      <select v-model="selectedModel" @change="applyFilters">
        <option value="">Todos os modelos</option>
        <option v-for="model in uniqueModels" :key="model">{{ model }}</option>
      </select>
      <!-- Filtro por categoria -->
      <select v-model="selectedCategory" @change="applyFilters">
        <option value="">Todas as categorias</option>
        <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
      </select>
      <!-- Filtro por preço (slider) -->
      <Slider :min="minPrice" :max="maxPrice" v-model="priceRange" />

      <!-- Filtro por quartos -->
      <select v-model="selectedRooms" @change="applyFilters">
        <option value="">Qtd. quartos</option>
        <option v-for="room in uniqueRooms" :key="room">{{ room }}</option>
      </select>
      <!-- Filtro por banheiros -->
      <select v-model="selectedBathrooms" @change="applyFilters">
        <option value="">Qtd. banheiros</option>
        <option v-for="bathroom in uniqueBathrooms" :key="bathroom">{{ bathroom }}</option>
      </select>
      <!-- Filtro por vagas de garagem -->
      <select v-model="selectedGarage" @change="applyFilters">
        <option value="">Qtd. vagas</option>
        <option v-for="garage in uniqueGarages" :key="garage">{{ garage }}</option>
      </select>
    </div>

    <div class="results">
      <!-- Seletor de ordenação -->
      <div class="order-select">
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
  </div>
  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 0">Anterior</button>
    {{ currentPage }}
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
const perPage = 9
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
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.details.rooms))]
})

// Lista única de banheiros para o filtro
const uniqueBathrooms = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.details.bathrooms))]
})

// Lista única de vagas de garagem para o filtro
const uniqueGarages = computed(() => {
  return [...new Set(ImoviesRef.value.map((imovel) => imovel.details.garage))]
})

function shouldDisplayBar() {
  return route.params.cidade || route.params.categoria || route.params.modelo
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
  .results {
    display: flex;
    position: relative;
    padding-top: 2rem;
    flex-wrap: wrap;
    align-items: stretch;
    align-content: space-around;
    justify-content: space-around;
  }
}
.filter-bar {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 58%;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 16px;
  border: 1px solid #ebebeb;
  justify-content: flex-start;
  gap: 20px;
}

.order-select {
  position: absolute;
  top: 0;
  right: 0;
}

.pagination {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  width: 33%;
  margin: 4rem auto;
}
</style>

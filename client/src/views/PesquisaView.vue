<template>
  <LoaderDots v-if="loading" />

  <div class="results-page" v-if="!loading && ImoviesRef">
    <div class="pagetop" id="top">
      <h1>Resultados da Pesquisa</h1>

      <div class="breadcrumbs">
        <RouterLink to="/">Home</RouterLink><span v-if="shouldDisplayBar()"> /</span>
        <RouterLink to="/" v-if="$route.params.cidade">{{ $route.params.cidade }} /</RouterLink>
        <RouterLink to="/" v-if="$route.params.categoria"
          >{{ $route.params.categoria }} /</RouterLink
        >
        <RouterLink to="/" v-if="$route.params.modelo">{{ $route.params.modelo }}</RouterLink>
      </div>
      <!-- Filtros ativos em formato de tags -->
      <div class="active-filters">
        <span v-if="activeFilters.length" class="active-filter">
          Remover filtros
          <span @click="removeFilter('todos')" class="remove-filter">x</span>
        </span>
        <span v-for="(value, key) in activeFilters" :key="key" class="active-filter">
          {{ value.value }}
          <span @click="removeFilter(value.key)" class="remove-filter">x</span>
        </span>
      </div>
    </div>
    <div class="search_results">
      <!-- Sua barra de filtro lateral -->
      <button class="filter-button" @click="toggleFilters()">Filtrar resultados</button>
      <div class="filter-bar" :class="{ active: filterBar }">
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
        <!-- Filtro por preço  -->

        <!-- Campos de entrada para preço mínimo e máximo -->
        <div class="price-filter">
          <span>Filtrar por preço:</span>
          <input
            type="number"
            step="1000"
            v-model="minPrice"
            @change="applyFilters"
            placeholder="Min"
            min="0"
          />
          <input
            type="number"
            step="1000"
            v-model="maxPrice"
            @change="applyFilters"
            placeholder="Max"
            min="0"
          />
        </div>

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

      <div class="results" v-if="paginatedImovies?.length">
        <!-- Seletor de ordenação -->
        <div class="order-select">
          <p>
            Mostrando {{ paginatedImovies?.length }} resultados de {{ totalResults }}
            <span v-if="totalPages >= 2"> - Página {{ currentPage }} de {{ totalPages }}</span>
          </p>
          <select v-model="selectedOrder" @change="applyFilters">
            <option value="precoMenor">Preço: Menor para Maior</option>
            <option value="precoMaior">Preço: Maior para Menor</option>
            <option value="maisRecentes">Mais Recentes</option>
          </select>
        </div>
        <div class="slide" v-for="card in paginatedImovies" :key="card.id">
          <RouterLink :to="{ name: 'imovel', params: { id: card.id } }">
            <CardPrincipal :infos="card" />
          </RouterLink>
        </div>
        <!-- Paginação -->
        <div class="pagination" v-if="totalPages >= 2">
          <a href="#">
            <button @click="previousPage" :disabled="currentPage === 0">Anterior</button></a
          >

          <span
            v-for="page in totalPages"
            :key="page"
            @click="gotoPage(page)"
            :class="{ active: page == currentPage + 1 }"
            >{{ page }}</span
          >
          <a href="#">
            <button @click="nextPage" :disabled="currentPage === totalPages - 1">Próxima</button></a
          >
        </div>
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
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useImoveis } from '@/composables'
import CardPrincipal from '@/components/Shared/CardPrincipal.vue'

import LoaderDots from '@/components/Shared/LoaderDots.vue'
import type { ImovelType } from '@/interfaces/interfaces.js'

const ImoviesRef = ref<ImovelType[]>()
const ImoveisFunction = useImoveis()
const loading = ref(false)

const route = useRoute()
const router = useRouter()
const filterBar = ref(false)
// Filtros selecionados
const selectedCity = ref(route.params.cidade)
const selectedModel = ref(route.params.modelo)
const selectedCategory = ref(route.params.categoria)
const selectedEmpreendimento = ref<string>(route.params.empreendimento as string)
const selectedRooms = ref(parseInt(router.currentRoute.value.query.quartos as string) || 0)
const selectedBathrooms = ref(parseInt(router.currentRoute.value.query.banheiros as string) || 0)
const selectedGarage = ref(parseInt(router.currentRoute.value.query.garagem as string) || 0)
const minPrice = ref(parseInt(router.currentRoute.value.query.precoMin as string) || 0)
const maxPrice = ref(parseInt(router.currentRoute.value.query.precoMax as string) || 0)

const selectedOrder = ref('precoMenor') // Default to sorting by lowest price
// Paginação
const perPage = 10
const currentPage = ref(0)

// Calcular o total de páginas
const totalPages = computed(() => {
  if (filteredImovies.value) return Math.ceil(filteredImovies.value.length / perPage)
  else return 0
})

// Filtrar imóveis com base nos filtros selecionados
const filteredImovies = computed(() => {
  let filtered = ImoviesRef.value
  if (!filtered) return
  // Filtro por cidade
  if (selectedCity.value) {
    filtered = filtered.filter((imovel: any) => imovel.location.city === selectedCity.value)
  }

  // Filtro por modelo
  if (selectedModel.value) {
    filtered = filtered.filter(
      (imovel: any) => imovel.model === selectedModel.value || imovel.model == 'Compra e Aluga'
    )
  }

  // Filtro por categoria
  if (selectedCategory.value) {
    filtered = filtered.filter((imovel: any) => imovel.category === selectedCategory.value)
  }

  // Filtro por Empreendimento
  if (selectedEmpreendimento.value) {
    filtered = filtered.filter((imovel: ImovelType) =>
      imovel.location.neighborhood.includes(selectedEmpreendimento.value)
    )
  }

  // Filtro por preço mínimo
  if (minPrice.value !== null && minPrice.value) {
    filtered = filtered.filter((imovel: any) => imovel.price >= minPrice.value)
  }

  // Filtro por preço máximo
  if (maxPrice.value !== null && maxPrice.value) {
    filtered = filtered.filter((imovel: any) => imovel.price <= maxPrice.value)
  }

  // Filtro por quartos
  if (selectedRooms.value) {
    filtered = filtered.filter((imovel: any) => imovel.details.rooms === selectedRooms.value)
  }

  // Filtro por banheiros
  if (selectedBathrooms.value) {
    filtered = filtered.filter(
      (imovel: any) => imovel.details.bathrooms === selectedBathrooms.value
    )
  }

  // Filtro por vagas de garagem
  if (selectedGarage.value) {
    filtered = filtered.filter((imovel: any) => imovel.details.garage === selectedGarage.value)
  }

  switch (selectedOrder.value) {
    case 'precoMenor':
      filtered = filtered.sort((a: any, b: any) => a.price - b.price)
      filtered = filtered.sort((a: any, b: any) => a.rent - b.rent)
      break
    case 'precoMaior':
      filtered = filtered.sort((a: any, b: any) => b.price - a.price)
      filtered = filtered.sort((a: any, b: any) => a.rent - b.rent)
      break
    case 'maisRecentes':
      filtered = filtered.sort((a: any, b: any) => b.id - a.id)
      break
  }

  return filtered
})

const totalResults = computed(() => {
  if (!filteredImovies.value) return
  if (totalPages.value == 1) return totalPages.value * filteredImovies.value.length
  else return (totalPages.value - 1) * filteredImovies.value.length
})

// Imóveis paginados
const paginatedImovies = computed(() => {
  if (!filteredImovies.value) return
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

function gotoPage(page: number) {
  currentPage.value = page
}

function toggleFilters() {
  filterBar.value = !filterBar.value
}

// Lista única de cidades para o filtro
const uniqueCities = computed(() => {
  if (!ImoviesRef.value) return
  return [...new Set(ImoviesRef.value.map((imovel: any) => imovel.location.city))]
})

// Lista única de modelos para o filtro
const uniqueModels = computed(() => {
  if (!ImoviesRef.value) return
  return [...new Set(ImoviesRef.value.map((imovel: any) => imovel.model))]
})

// Lista única de categorias para o filtro
const uniqueCategories = computed(() => {
  if (!ImoviesRef.value) return
  return [...new Set(ImoviesRef.value.map((imovel: any) => imovel.category))]
})

// Lista única de quartos para o filtro
const uniqueRooms = computed(() => {
  if (!ImoviesRef.value) return
  return [...new Set(ImoviesRef.value.map((imovel: any) => imovel.details.rooms || 0))]
})

// Lista única de banheiros para o filtro
const uniqueBathrooms = computed(() => {
  if (!ImoviesRef.value) return
  return [...new Set(ImoviesRef.value.map((imovel: any) => imovel.details.bathrooms || 0))]
})

// Lista única de vagas de garagem para o filtro
const uniqueGarages = computed(() => {
  if (!ImoviesRef.value) return
  return [...new Set(ImoviesRef.value.map((imovel: any) => imovel.details.garage || 0))]
})

// Function to sort values from smallest to largest
function sortValues(values: number[]): number[] {
  return values.slice().sort((a, b) => a - b)
}

// Compute sorted lists of rooms, bathrooms, and garage for selects
const uniqueRoomsSorted = computed(() => {
  if (!uniqueRooms.value) return
  else return sortValues(uniqueRooms.value)
})
const uniqueBathroomsSorted = computed(() => {
  if (!uniqueBathrooms.value) return
  return sortValues(uniqueBathrooms.value)
})
const uniqueGaragesSorted = computed(() => {
  if (!uniqueGarages.value) return
  return sortValues(uniqueGarages.value)
})

function shouldDisplayBar() {
  return route.params.cidade || route.params.categoria || route.params.modelo
}
// Obtenha os filtros ativos
const activeFilters = computed(() => {
  const filters = []

  if (selectedCity.value) filters.push({ key: 'city', value: selectedCity.value })
  if (selectedModel.value) filters.push({ key: 'model', value: selectedModel.value })
  if (selectedCategory.value) filters.push({ key: 'category', value: selectedCategory.value })
  if (maxPrice.value !== 0 && maxPrice.value)
    filters.push({ key: 'maxPrice', value: `Preço até ${maxPrice.value}` })
  if (minPrice.value !== 0 && minPrice.value)
    filters.push({ key: 'minPrice', value: `Preço á partir de ${minPrice.value}` })

  return filters
})

// Remover um filtro selecionado
function removeFilter(key: any) {
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
    case 'maxPrice':
      maxPrice.value = 0
      break
    case 'minPrice':
      minPrice.value = 0
      break
    case 'todos':
      selectedCity.value = ''
      selectedModel.value = ''
      selectedCategory.value = ''
      maxPrice.value = 0
      minPrice.value = 0
      break
  }
  applyFilters()
}

// Aplicar os filtros selecionados
function applyFilters() {
  currentPage.value = 0
  // Redirecione ou atualize a rota conforme necessário
  // Exemplo:
  router.push({
    params: {
      cidade: selectedCity.value,
      modelo: selectedModel.value,
      categoria: selectedCategory.value
    },
    query: {
      precoMin: minPrice.value || 0,
      precoMax: maxPrice.value || 0,
      quartos: selectedRooms.value,
      banheiros: selectedBathrooms.value,
      garagem: selectedGarage.value
    }
  })
}

async function getAllImoveis() {
  loading.value = true

  const data = await ImoveisFunction.carregarImoveis()
  if (data) ImoviesRef.value = data
  loading.value = false
}

onMounted(async () => {
  await getAllImoveis()
})
</script>

<style scoped lang="scss">
.pagetop {
  margin: 0 auto;
  color: var(--color-text);
  text-align: center;
  padding-top: 10rem;
  margin-bottom: 4rem;
  background: #f9f9f9;

  h1 {
    font-size: 40px;
    font-weight: 500;
    color: #545457;
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
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 15px;
  }
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
    @media (max-width: 768px) {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      padding: 0;
      margin-bottom: 1rem;
    }
    .slide {
      width: 48%;
      @media (max-width: 768px) {
        width: 100%;
      }

      article.card {
        width: 100% !important;
        margin: 0;
      }
      a {
        display: flex;
        height: 100%;
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
  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    opacity: 0;
    transform: translateY(-200%);
    transition: 0.4s;
    position: relative;
    height: 100%;
    top: 2rem;
    display: none;
    &.active {
      height: 100%;
      opacity: 1;
      transform: none;
      display: flex;
    }
  }
}
.filter-button {
  width: 60%;
  background: white;
  border: 1px solid black;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
}

.order-select {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #545454;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: #545454;
    flex-direction: column;
    margin: 2rem 0 0;
  }
  select {
    width: 28%;
    @media (max-width: 786px) {
      width: 60%;
      margin-top: 1.5rem;
    }
  }
}

.pagination {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 4rem auto;
  /* float: right; */
  span {
    text-decoration: none;
    text-align: center;
    font-weight: 400;
    font-size: 0.9375rem;
    margin: 0 5px;
    display: inline-block;
    border-radius: 50%;
    min-width: 40px;
    line-height: 40px;
    padding: 0 5px;
    &.active {
      color: #fff;
      background: black;
    }
  }
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
    background-color: white;
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

  &:hover {
    border-color: var(--color-text);
  }
}

.price-filter {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 10%;
  flex-wrap: wrap;
  span {
    width: 100%;
    margin-left: 0.5rem;
  }
  input {
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e9e9e9;
    appearance: none;
    border-radius: 12px;
    color: var(--color-text);
    cursor: pointer;
    padding: 0.75rem 1.29rem;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.9;
    width: 45%;
    &:hover {
      border-color: var(--color-text);
    }
  }
}

.active-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;

  .active-filter {
    border-radius: 50px;
    border: 1px solid #e9e9e9;
    padding: 1px 10px 2px;
    font-size: 12px;
    margin: 10px;
    background-color: white;
    &:hover .remove-filter {
      color: red;
    }

    .remove-filter {
      cursor: pointer;
      display: inline-block;
      font-size: 1.25em;
      line-height: 0.8;
      margin-left: 0.5em;
    }
  }
}
</style>
: { location: { city: string | string[] } }: { model: string | string[] }: { category: string |
string[] }: { price: number; monthly: number | undefined }: { price: number; monthly: number |
undefined }: { details: { rooms: number } }: { details: { bathrooms: number } }: { details: {
garage: number } }: { price: number }: { price: number }: { price: number }: { price: number }: {
id: number }: { id: number }: { location: { city: any } }: { model: any }: { category: any }: {
details: { rooms: any } }: { details: { bathrooms: any } }: { details: { garage: any } }: {
location: { city: string | string[] } }: { model: string | string[] }: { category: string | string[]
}: { price: number; monthly: number | undefined }: { price: number; monthly: number | undefined }: {
details: { rooms: number } }: { details: { bathrooms: number } }: { details: { garage: number } }: {
price: number }: { price: number }: { price: number }: { price: number }: { id: number }: { id:
number }: { location: { city: any } }: { model: any }: { category: any }: { details: { rooms: any }
}: { details: { bathrooms: any } }: { details: { garage: any } }: { price: number }: { price: number
}: { price: number }: { price: number }: { id: number }: { id: number }

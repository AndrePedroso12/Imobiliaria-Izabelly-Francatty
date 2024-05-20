<template>
  <div class="manage">
    <p class="title">Gerenciar Imóveis</p>
    <LoaderSpinner v-if="loading" />

    <div class="error" v-if="hasError">{{ errorText }}</div>

    <div class="card all-imoveis" v-if="!loading && allImoveis">
      <div class="manage__buttons">
        <button :class="{ active: filterType === 'todos' }" @click="filter('todos')">Todos</button>
        <button :class="{ active: filterType === 'comprar' }" @click="filter('comprar')">
          Comprar
        </button>
        <button :class="{ active: filterType === 'alugar' }" @click="filter('alugar')">
          Alugar
        </button>
      </div>

      <div class="manage__selects">
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
      </div>

      <v-expansion-panels>
        <v-expansion-panel v-for="card in filteredCards" :key="card.id" variant="tonal">
          <v-expansion-panel-title>
            <v-row no-gutters>
              <v-col class="d-flex justify-start" cols="1">
                <p class="favorite" :class="card.isfavourite">
                  <Icon icon="ic:baseline-star" width="1.2em" height="1.2em" />
                </p>
              </v-col>
              <v-col class="d-flex justify-start" cols="6">
                <div class="location_title">
                  <p>{{ card.location.neighborhood }}</p>
                  <p class="city">{{ card.location.city }}</p>
                </div>
              </v-col>
              <v-col class="d-flex justify-start" cols="2"> R$ {{ card.price }} </v-col>
              <v-col class="d-flex justify-end" cols="3">
                <strong>{{ card.category }}</strong>
              </v-col>
            </v-row>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-row justify="space-around" no-gutters>
              <v-col cols="1">
                <p class="id">{{ card.id }}</p>
              </v-col>
              <v-col cols="3">
                <div class="selectable">
                  <p class="favorite" :class="card.isfavourite">
                    Mais procurado
                    <Icon icon="ic:baseline-star" width="1.2em" height="1.2em" />
                  </p>
                </div>
                <div class="selectable">
                  <p class="favorite" :class="card.banner">
                    Banner
                    <Icon icon="ic:baseline-star" width="1.2em" height="1.2em" />
                  </p>
                </div>
                <div class="selectable">
                  <p class="favorite" :class="card.isTop">
                    Destaque
                    <Icon icon="ic:baseline-star" width="1.2em" height="1.2em" />
                  </p>
                </div>
              </v-col>

              <v-col cols="3">
                {{ card.model }}
              </v-col>
              <v-col cols="3">
                <label>
                  Preço:
                  <input type="number" v-model="card.price" />
                </label>
              </v-col>
              <v-col cols="3">
                <label>
                  Cidade:
                  <input class="city" v-model="card.location.city" />
                </label>
                <label>
                  Bairro:
                  <input v-model="card.location.neighborhood" />
                </label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                {{ card.mainImage }}
                {{ card.images }}
              </v-col>
              <v-col cols="3">
                {{ card.video }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                Terreno
                {{ card.details.area }}m²
              </v-col>
              <v-col cols="2">
                Quartos
                {{ card.details.rooms }}
              </v-col>
              <v-col cols="2">
                Banheiros
                {{ card.details.bathrooms }}
              </v-col>
              <v-col cols="2">
                Suites
                {{ card.details.suites }}
              </v-col>
              <v-col cols="2">
                Vagas na garagem
                {{ card.details.garage }}
              </v-col>
              <v-col cols="2">
                Aluguel/Condominio
                {{ card.monthly }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                {{ card.description }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                {{ card.details.tags }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                {{ card.tags }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                {{ card.sellerName }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <button>Salvar mudanças</button>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref } from 'vue'
import LoaderSpinner from '@/components/Shared/LoaderSpinner.vue'
import { useImoveis } from '@/composables'
import type { ImovelType } from '@/interfaces/interfaces'

const loading = ref(false)
const imoveisFunctions = useImoveis()
const allImoveis = ref<ImovelType[]>()
const errorText = ref('')
const hasError = ref(false)

const selectedCity = ref('')
const selectedModel = ref('')
const selectedCategory = ref('')

// Lista única de cidades para o filtro
const uniqueCities = computed(() => {
  if (allImoveis.value) return [...new Set(allImoveis.value.map((imovel) => imovel.location.city))]
  else return null
})

// Lista única de modelos para o filtro
const uniqueModels = computed(() => {
  if (allImoveis.value) return [...new Set(allImoveis.value.map((imovel) => imovel.model))]
  else return null
})

// Lista única de categorias para o filtro
const uniqueCategories = computed(() => {
  if (allImoveis.value) return [...new Set(allImoveis?.value.map((imovel) => imovel.category))]
  else return null
})

function applyFilters() {}

onMounted(async () => {
  loading.value = true

  try {
    allImoveis.value = await imoveisFunctions.carregarImoveisAdmin()
  } catch (error: any) {
    errorText.value = error
    hasError.value = true
  }
  loading.value = false
})

const filterType = ref<'comprar' | 'alugar' | 'todos'>('todos')

const filteredCards = computed(() => {
  if (filterType.value === 'comprar' && allImoveis.value) {
    return allImoveis.value.filter((card) => card.model === 'Compra')
  } else if (filterType.value === 'alugar' && allImoveis.value) {
    return allImoveis.value.filter((card) => card.model === 'Alugar')
  } else {
    return allImoveis.value
  }
})

const filter = (type: 'comprar' | 'alugar' | 'todos') => {
  filterType.value = type
}
</script>

<style lang="scss" scoped>
.card {
  border: 3px solid #282828;
  border-radius: 13px;
}

.title {
  font-weight: 600;
  font-size: 30px;
}
.inner {
  padding: 1.5rem;
  border: 2px solid #282828;
  display: flex;
  justify-content: flex-start;
}

select {
  appearance: none;
  outline: 0;
  font: inherit;
  background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23ffffff%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23ffffff%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E);
  background-size: 0.6em;
  background-position: calc(100% - 1.3em) center;
  background-repeat: no-repeat;
  color: #bababa;
  cursor: pointer;
  display: block;
  padding: 0.5rem 2.5rem 0.5rem 0.8rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.9;
  background-color: #1c1c1c;
  background-clip: padding-box;
  border: 1px solid #333333;
  appearance: none;
  border-radius: 9px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  margin-right: 40px;
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
    background-color: black;
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

.manage__selects {
  display: flex;
  justify-content: flex-start;
  padding: 1.5rem;
  border: 2px solid #282828;
}

.manage__buttons {
  display: flex;
  justify-content: flex-start;
  border: 2px solid #282828;
  padding: 1.5rem;
  button {
    background: black;
    margin-right: 40px;
    padding: 5px 40px;
    &.active {
      background: white;
      color: black;
      font-weight: 600;
    }
  }
}

.location_title p:first-of-type {
  font-size: 20px;
  font-weight: bold;
}
</style>

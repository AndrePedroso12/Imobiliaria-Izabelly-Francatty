<template>
  <div class="manage">
    <LoaderSpinner v-if="loading" />

    <div class="error" v-if="hasError">{{ errorText }}</div>

    <div class="card all-imoveis" v-if="!loading && allImoveis">
      <div class="manage_filters">
        <div class="manage__buttons">
          <button :class="{ active: filterType === 'todos' }" @click="filter('todos')">
            Todos
          </button>
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
      </div>

      <div class="manage__cards">
        <div class="manage__cards__header">
          <p class="Imagem">Imagem</p>
          <p class="Endereço desktop">Endereço</p>

          <p class="Preço desktop">Preço</p>

          <p class="Modelo desktop">Modelo</p>
        </div>
        <CardAdmin
          :infos="card"
          v-for="card in filteredCards"
          :key="card.id"
          @edit="setSelectedCard(card.id)"
          @delete="deleteCard(card.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LoaderSpinner from '@/components/Shared/LoaderSpinner.vue'
import { useImoveis } from '@/composables'
import type { ImovelType } from '@/interfaces/interfaces'
import CardAdmin from './CardAdmin.vue'

const loading = ref(false)
const imoveisFunctions = useImoveis()
const allImoveis = ref<ImovelType[]>()
const errorText = ref('')
const hasError = ref(false)

const selectedCity = ref('')
const selectedModel = ref('')
const selectedCategory = ref('')
const selectedCard = ref()

const emit = defineEmits(['edit'])

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

async function setSelectedCard(card: number) {
  selectedCard.value = card
  await emit('edit', selectedCard.value)
}

async function deleteCard(card: number) {
  const shouldDelete = await confirmDeleteImovel()
  if (shouldDelete) {
    loading.value = true
    await imoveisFunctions.deletarImovelPorId(card)
    allImoveis.value = await imoveisFunctions.carregarImoveisAdmin()
    loading.value = false
  } else {
    return
  }
}

function confirmDeleteImovel() {
  return new Promise<boolean>((resolve) => {
    const confirmation = confirm('Tem certeza que deseja deletar este imóvel?')
    resolve(confirmation)
  })
}
</script>

<style lang="scss" scoped>
.card {
  padding: 35px 40px 40px;
  border-radius: 24px;
  background: #fff;
  margin-bottom: 20px;
  border: 1px solid #e9e9e9;
  @media (max-width: 786px) {
    padding: 35px 15px 40px;
  }
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
  background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E);
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
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e9e9e9;
  appearance: none;
  border-radius: 9px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  margin-right: 40px;
  @media (max-width: 786px) {
    width: 100%;
    margin: 0;
  }
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

.manage {
  &_filters {
    display: flex;
    padding: 0rem 0 2rem;
    @media (max-width: 786px) {
      gap: 10px;
      flex-direction: column;
    }
  }

  &__selects {
    display: flex;
    justify-content: flex-start;
    @media (max-width: 786px) {
      flex-wrap: wrap;
      flex-direction: column;
      gap: 12px;
    }
  }

  &__buttons {
    display: flex;
    justify-content: flex-start;
    @media (max-width: 786px) {
      flex-wrap: wrap;
      width: 100%;
      gap: 12px;
    }

    button {
      background: black;
      margin-right: 40px;
      padding: 5px 40px;
      color: white;
      @media (max-width: 786px) {
        margin-right: 0;
        width: 100%;
      }
      &.active {
        background: var(--color-background);
        color: black;
        font-weight: 600;
      }
    }
  }

  &__cards {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    &__header {
      padding: 10px 1.875rem;
      margin-bottom: 1.875rem;
      border-radius: 16px;
      width: 100%;
      background-color: #f9f9f9;
      display: flex;
      justify-content: space-between;
      p {
        font-size: 0.9375rem;
        font-weight: 500;
      }
      .Endereço {
        flex: 0.47;
      }

      .Imagem {
        flex: 0.25;
      }

      .Preço {
        flex: 0.25;
      }

      .Informações {
        flex: 0.6;
      }

      .Modelo {
        flex: 0.2;
      }

      .Gerenciar {
        flex: 0.1;
      }
    }
  }
}
</style>

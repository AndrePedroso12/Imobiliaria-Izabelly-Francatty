<template>
  <div class="searchbar" v-motion-slide-visible-top>
    <div class="searchbar__select">
      <label for="Cidade">Cidade</label>

      <select name="Cidade" id="cidade" v-model="cidade" @change="applyFilters">
        <option disabled value="">Selecione uma cidade</option>
        <option v-for="city in uniqueCities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>
    <div class="searchbar__select">
      <label for="Modelo">Modelo</label>
      <select name="Modelo" id="modelo" v-model="modelo">
        <option disabled value="">Comprar ou Alugar</option>

        <option value="Compra">Comprar</option>
        <option value="Alugar">Alugar</option>
      </select>
    </div>
    <div class="searchbar__select">
      <label for="Tipo">Tipo</label>
      <select name="Tipo" id="Tipo" v-model="categoria">
        <option disabled value="">Selecione um tipo de imóvel</option>

        <option value="Apartamento">Apartamento</option>
        <option value="Casa">Casa</option>
        <option value="Terreno">Terreno</option>
      </select>
    </div>

    <div class="searchbar__checkbox">
      <checkbox @click="toogleFilters()"
        ><Icon icon="mage:filter" width="1.2em" height="1.2em" /> Filtros</checkbox
      >
    </div>
    <button @click="goToResults()">Procurar</button>
  </div>

  <div class="filtros" v-if="enableFilters">
    <div class="select_bars">
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
    <div class="price_select">
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
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { Icon } from '@iconify/vue'
import type { ImovelType } from '@/interfaces/interfaces'
import { computed, ref } from 'vue'

const props = defineProps<{
  imoveis: ImovelType[]
}>()

const ImoviesRef = ref(props.imoveis)

const categoria = ref('')
const cidade = ref('')
const modelo = ref('')

const selectedRooms = ref(0)
const selectedBathrooms = ref(0)
const selectedGarage = ref(0)
const minPrice = ref(0)
const maxPrice = ref(0)
const enableFilters = ref(false)

// Compute sorted lists of rooms, bathrooms, and garage for selects
const uniqueRoomsSorted = computed(() => sortValues(uniqueRooms.value))
const uniqueBathroomsSorted = computed(() => sortValues(uniqueBathrooms.value))
const uniqueGaragesSorted = computed(() => sortValues(uniqueGarages.value))

function toogleFilters() {
  enableFilters.value = !enableFilters.value
}

// Function to sort values from smallest to largest
function sortValues(values: number[]): number[] {
  return values.slice().sort((a, b) => a - b)
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

function applyFilters() {}

function goToResults() {
  router.push({
    name: 'pesquisa',
    params: { categoria: categoria.value, cidade: cidade.value, modelo: modelo.value },
    query: {
      precoMin: minPrice.value,
      precoMax: maxPrice.value,
      quartos: selectedRooms.value,
      banheiros: selectedBathrooms.value,
      garagem: selectedGarage.value
    }
  })
}
</script>

<style scoped lang="scss">
.searchbar {
  background-color: var(--color-text);
  border-style: none;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
  border-radius: 24px 24px 24px 24px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 20px;
  color: white;
  margin: -3rem 8rem;
  position: relative;
  transition: 0.6s;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: -3rem auto;
  }

  &__select {
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 0 30px;
    flex: 0 0 auto;
    border-left: 1px solid #ffffff12;
    @media (max-width: 768px) {
      width: 100%;
      padding: 0;
      border: 0;
    }
    &:first-of-type {
      border: none;
      padding-left: 0;
    }
    label {
      margin: 0;
      font-size: 13px;
      font-weight: 400;
      color: #969696;
    }
    select {
      appearance: none;
      outline: 0;
      font: inherit;
      background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23ffffff%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23ffffff%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E);
      background-size: 0.6em;
      background-position: calc(100% - 1.3em) center;
      background-repeat: no-repeat;
      color: white;
      cursor: pointer;
      display: block;
      width: 100%;
      padding: 0.75rem 1.29rem;
      font-size: 0.9375rem;
      font-weight: 400;
      line-height: 1.9;
      background-color: var(--color-text);
      background-clip: padding-box;
      border: 1px solid var(--color-text);
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
        border: 1px solid white;
      }
    }
    option {
      color: black;
      padding: 1rem;
    }
  }

  &__checkbox {
    color: #ffffff;
    background-color: #00000000;
    border-style: solid;
    border-width: 1px 1px 1px 1px;
    border-color: #ffffff1a;
    border-radius: 12px;
    padding: 12px 1.875rem;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      background-color: white;
      color: var(--color-text);
      border: 1px solid var(--color-background);
    }
    @media (max-width: 768px) {
      width: 100%;
      margin: 1rem auto;
      text-align: center;
    }
  }

  button {
    transition: 0.4s;
    &:hover {
      background-color: white;
      border: 1px solid var(--color-background);
    }
    @media (max-width: 768px) {
      width: 100%;

      text-align: center;
    }
  }
}

.filtros {
  position: absolute;
  width: 86%;
  margin: 4rem 0 0;
  padding: 20px 20px 0;
  background: #fff;
  border: 1px solid black;
  border-radius: 12px;
  left: 7%;
  z-index: 9;

  .select_bars {
    display: flex;
    justify-content: space-between;
  }

  .price_select {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 28%;
    margin: 1rem auto;

    span {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      font-weight: 400;
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
      width: 25%;
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
    margin: 1rem;
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
  }
}
</style>

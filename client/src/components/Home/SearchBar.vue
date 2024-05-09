<template>
  <div class="searchbar">
    <div class="searchbar__select">
      <label for="Cidade">Cidade</label>
      <select name="Cidade" id="cidade" v-model="cidade">
        <option disabled value="">Selecione uma cidade</option>

        <option value="Jaguariuna">Jaguariuna</option>
        <option value="Pedreira">Pedreira</option>
        <option value="Amparo">Amparo</option>
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
      <checkbox><Icon icon="mage:filter" width="1.2em" height="1.2em" /> Filtros</checkbox>
    </div>
    <button @click="goToResults()">Procurar</button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
const categoria = ref('')
const cidade = ref('')
const modelo = ref('')

function goToResults() {
  router.push({
    name: 'pesquisa',
    params: { categoria: categoria.value, cidade: cidade.value, modelo: modelo.value }
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
    @media (max-width: 768px) {
      width: 100%;
      margin: 1rem auto;
      text-align: center;
    }
  }

  button {
    @media (max-width: 768px) {
      width: 100%;

      text-align: center;
    }
  }
}
</style>

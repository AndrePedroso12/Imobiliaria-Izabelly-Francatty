<template>
  <div class="searchbar">
    <div class="searchbar__select">
      <label for="Cidade">Cidade</label>
      <select name="Cidade" id="cidade">
        <option value="Jaguariuna">Jaguariuna</option>
        <option value="Pedreira">Pedreira</option>
        <option value="Amparo">Amparo</option>
      </select>
    </div>
    <div class="searchbar__select">
      <label for="Modelo">Modelo</label>
      <select name="Modelo" id="modelo">
        <option value="Jaguariuna">Comprar</option>
        <option value="Pedreira">Alugar</option>
      </select>
    </div>
    <div class="searchbar__select">
      <label for="Tipo">Tipo</label>
      <select name="Tipo" id="Tipo">
        <option value="Apartamento">Apartamento</option>
        <option value="Casa">Casa</option>
        <option value="Terreno">Terreno</option>
      </select>
    </div>

    <div class="searchbar__checkbox">
      <checkbox><Icon icon="mage:filter" width="1.2em" height="1.2em" /> Filtros</checkbox>
    </div>
    <button>Procurar</button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
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

  &__select {
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 0 30px;
    flex: 0 0 auto;
    border-left: 1px solid #ffffff12;
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
      border: 0;
      height: auto;
      padding: 0 !important;
      color: white;
      background: none;
      line-height: 28px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 400;
      outline: none;
      margin-top: 10px;
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
  }
}
</style>

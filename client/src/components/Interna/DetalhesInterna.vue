<template>
  <div class="container">
    <div class="title">Detalhes</div>
    <div class="details_container">
      <div class="box">
        <p>Área do Terreno</p>
        <span>{{ infos.details.area }}m²</span>
      </div>

      <div class="box" v-if="infos.details.area_constructed">
        <p>Área construida</p>
        <span>{{ infos.details.area_constructed }}</span>
      </div>
      <div class="box" v-if="infos.details.rooms">
        <p>Quartos</p>
        <span>{{ infos.details.rooms }}</span>
      </div>
      <div class="box" v-if="infos.details.bathrooms">
        <p>Banheiros</p>
        <span>{{ infos.details.bathrooms }}</span>
      </div>
      <div class="box" v-if="infos.details.suites">
        <p>Suites</p>
        <span>{{ infos.details.suites }}</span>
      </div>
      <div class="box" v-if="infos.details.garage">
        <p>Vagas na garagem</p>
        <span>{{ infos.details.garage }}</span>
      </div>
      <div class="box" v-if="infos.price">
        <p>Valor de venda</p>
        <span>R$ {{ imoveisFunction.formatPrice(infos.price) }}</span>
      </div>
      <div class="box" v-if="infos.rent">
        <p>Aluguel</p>
        <span>R$ {{ imoveisFunction.formatPrice(infos.rent) }}</span>
      </div>
      <div class="box" v-if="infos.monthly">
        <p>Valor condominio</p>
        <span>R$ {{ imoveisFunction.formatPrice(infos.monthly) }} / mês</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImoveis } from '@/composables'
import type { ImovelType } from '@/interfaces/interfaces'
import { ref } from 'vue'

const props = defineProps<{
  cardInfos: ImovelType
}>()

const infos = ref(props.cardInfos)
const imoveisFunction = useImoveis()
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #ebebeb;
  margin-bottom: 2rem;
}
.title {
  font-size: 27px;
  font-weight: 500;
  margin-bottom: 10px;
}

.details_container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  @media (max-width: 768px) {
    column-gap: 0;
    flex-direction: column;
  }
}

.box {
  width: calc(50% - 15px);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
  }
}
.box p[data-v-1ab0d266] {
  font-weight: 500;
}
</style>

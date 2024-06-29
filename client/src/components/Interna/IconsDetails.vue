<template>
  <div class="container">
    <div class="box">
      <Icon icon="bi:house" width="1.7em" height="1.7em" />
      <p>{{ infos.category }}</p>
    </div>
    <div class="box" v-if="infos.details.area">
      <Icon icon="mdi:surface-area" width="1.7em" height="1.7em" />
      <p>{{ infos.details.area }}m²</p>
    </div>
    <div class="box" v-if="infos.details.rooms">
      <Icon icon="lucide:bed" width="1.7em" height="1.7em" />
      <p>{{ infos.details.rooms }} Quarto<span v-if="infos.details.rooms >= 2">s</span></p>
    </div>
    <div class="box" v-if="infos.details.suites">
      <Icon icon="iconoir:bathroom" width="1.7em" height="1.7em" />
      <p>{{ infos.details.suites }} Suite<span v-if="infos.details.suites >= 2">s</span></p>
    </div>
    <div class="box" v-if="infos.details.bathrooms">
      <Icon icon="fluent-emoji-high-contrast:toilet" width="1.7em" height="1.7em" />
      <p>
        {{ infos.details.bathrooms }} Banheiro<span v-if="infos.details.bathrooms >= 2">s</span>
      </p>
    </div>
    <div class="box" v-if="infos.details.garage">
      <Icon icon="cil:garage" width="1.7em" height="1.7em" />
      <p>{{ infos.details.garage }} Vaga<span v-if="infos.details.garage >= 2">s</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImovelType } from '@/interfaces/interfaces'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps<{
  cardInfos: ImovelType
}>()

const infos = ref(props.cardInfos)
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    row-gap: 10px;
  }
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16.5%;
  border-radius: 0;
  background: #fff;
  padding: 5px 15px;
  border-right: 1px solid #e9e9e9;
  color: #8d8d8d;
  @media (max-width: 768px) {
    width: 50%;
  }

  &:last-of-type {
    border: none;
  }
  &:nth-of-type(2n) {
    @media (max-width: 768px) {
      border: 0;
    }
  }

  p {
    line-height: 3.5;
  }
}
</style>

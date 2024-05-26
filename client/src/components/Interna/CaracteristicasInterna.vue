<template>
  <div class="container">
    <div class="title">Detalhes</div>
    <div class="details_container">
      <div class="box" v-for="(tag, index) in infos.details.tags" :key="index">
        <Icon icon="ei:check" width="1.7em" height="1.7em" />
        <span>{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImovelType } from '@/interfaces/interfaces'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  cardInfos: ImovelType
}>()

const infos = ref(props.cardInfos)
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
    column-gap: 10px;
    align-items: center;
  }
}

.box {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  flex: 1;
  flex-basis: 22%;
  @media (max-width: 768px) {
    flex-basis: 37%;
    font-size: 14px;
  }
}
</style>

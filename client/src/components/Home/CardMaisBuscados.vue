<template>
  <div class="cards_mais_buscados">
    <article>
      <div class="cards_mais_buscados__tags">
        <span class="tag" :class="tags" v-for="tags in infos.tags" :key="tags">{{ tags }}</span>
      </div>
      <div class="cards_mais_buscados__description">
        <p class="cards_mais_buscados__title">{{ infos.location.neighborhood }}</p>
        <p class="cards_mais_buscados__location">
          <Icon icon="mynaui:location" width="1.2em" height="1.2em" /> {{ infos.location.city }}
        </p>
        <div class="cards_mais_buscados__bottom">
          <div class="cards_mais_buscados__icons">
            <span v-if="infos.details.rooms"
              ><Icon icon="iconoir:bathroom" width="1.2em" height="1.2em" />
              {{ infos.details.rooms }}
            </span>
            <span v-if="infos.details.bathrooms"
              ><Icon icon="lucide:bed" width="1.2em" height="1.2em" />
              {{ infos.details.bathrooms }}
            </span>
            <span v-if="isArea(infos.category)"> {{ infos.category }}</span>
            <span v-if="infos.details.area"
              ><Icon icon="mdi:surface-area" width="1.2em" height="1.2em" />
              {{ infos.details.area }}m²</span
            >
          </div>
          <span class="cards_mais_buscados__price">R$ {{ infos.price }}</span>
        </div>
      </div>
      <div class="image-wrapper">
        <img
          loading="lazy"
          decoding="async"
          width="500"
          height="500"
          :src="infos.mainImage"
          class="attachment-justhome-property-grid-lg size-justhome-property-grid-lg"
          alt=""
        />
      </div>
    </article>
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

function isArea(value: string) {
  if (value == 'Casa' || value == 'Condominio' || value == 'Apartamento') return false
  else return true
}
</script>

<style scoped lang="scss">
.cards_mais_buscados {
  flex: 0 0 auto;
  width: 30%;
  height: 25rem;
  margin: 15px;
  border-radius: 16px;
  /* margin-bottom: 1.875rem; */
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out 0s;

  &__tags {
    padding: 20px;
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;

    .tag {
      margin-right: 10px;
      line-height: 33px;
      display: inline-block;
      padding: 0 15px;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--color-text);
      background: var(--color-background);
      border-radius: 33px;
      white-space: nowrap;
      &:nth-of-type(2) {
        color: white;
        background: var(--color-text);
      }
    }
  }

  &__description {
    position: absolute;
    bottom: 0;
    z-index: 1;
    color: white;
    width: 100%;
    left: 0;
    text-align: left;
    padding: 35px 40px;
  }

  &__title {
    font-size: 19px;
    font-weight: 500;
    line-height: 1.2;
  }

  &__location {
    font-size: 1rem;
    margin-top: 7px;
    line-height: 1.9;
  }

  &__icons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 35px;
    align-items: center;
    span:nth-of-type(2) {
      padding: 0 15px;
      margin: 0 15px;
      border-left: 1px solid white;
      border-right: 1px solid white;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  &__price {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
  }

  .image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgb(0, 0, 0);
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.898004270067402) 15%, rgba(0, 0, 0, 0) 80%);
    }
  }
}
</style>

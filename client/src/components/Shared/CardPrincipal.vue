<template>
  <article class="card">
    <div class="image-wrapper">
      <img loading="lazy" decoding="async" :src="card.mainImage" alt="" />
    </div>

    <div class="card__description">
      <p class="card__title">{{ card.location.neighborhood }}</p>
      <p class="card__location">
        <Icon icon="mynaui:location" width="1.2em" height="1.2em" /> {{ card.location.city }}
      </p>
      <div class="card__bottom">
        <div class="card__icons" :class="{ HouseCategory: !isArea(infos.category) }">
          <span v-if="card.details.rooms"
            ><Icon icon="lucide:bed" width="1.2em" height="1.2em" />
            {{ card.details.rooms }}
          </span>
          <span v-if="card.details.bathrooms"
            ><Icon icon="fluent-emoji-high-contrast:toilet" width="1.2em" height="1.2em" />
            {{ card.details.bathrooms }}
          </span>
          <span v-if="card.details.suites"
            ><Icon icon="solar:bath-linear" width="1.2em" height="1.2em" />
            {{ card.details.suites }}
          </span>
          <span v-if="card.details.garage"
            ><Icon icon="cil:garage" width="1.2em" height="1.2em" />
            {{ card.details.garage }}
          </span>

          <span v-if="card.details.area"
            ><Icon icon="mdi:surface-area" width="1.2em" height="1.2em" />
            {{ card.details.area }}m²</span
          >
          <span v-if="isArea(infos.category)"> {{ infos.category }}</span>
        </div>
        <div class="card__price">
          <div class="sell" v-if="card.model == 'Compra' || card.model == 'Compra e Aluga'">
            <span>Venda</span>
            R$ {{ imoveisFunction.formatPrice(card.price) }}
          </div>
          <div class="rent" v-if="card.model == 'Alugar' || card.model == 'Compra e Aluga'">
            <span>Aluguel</span>
            R$ {{ card.rent ? imoveisFunction.formatPrice(card.rent) : '' }}/mês
          </div>
          <div class="condominio" v-if="card.monthly">
            <span>Condominio</span>
            R$ {{ imoveisFunction.formatPrice(card.monthly) }}/mês
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ImovelType } from '@/interfaces/interfaces'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useImoveis } from '@/composables/imoveis'

const props = defineProps<{
  infos: ImovelType
}>()

const card = ref(props.infos)
const imoveisFunction = useImoveis()

function isArea(value: string) {
  if (value == 'Casa' || value == 'Condominio' || value == 'Apartamento') return false
  else return true
}
</script>

<style scoped lang="scss">
a {
  display: flex;
  width: 100%;
}
.card {
  border-radius: 16px;
  margin-bottom: 1.875rem;
  -webkit-transition: all 0.2s ease-in-out 0s;
  -o-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
  position: relative;
  overflow: hidden;
  border: 1px solid #bab9b9;
  padding: 10px;
  background: #fff;
  margin: 0 15px;
  color: var(--color-text);
  align-self: stretch;
  width: 100%;
  .image-wrapper {
    width: calc(100% + 27px);
    height: 15rem;
    overflow: hidden;
    margin: -10px -10px 10px -10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__description {
    color: var(--color-text);
    margin-top: 5px;
    font-size: 0.9375rem;
    text-align: left;
  }
  &__title {
    font-size: 19px;
    font-weight: 600;
    line-height: normal;
  }

  &__location {
    color: grey;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
  }

  &__icons {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex: 0 0 60px;
    align-items: center;

    span:nth-of-type(2n) {
      padding: 0 15px;
      margin: 0 15px;
      border-left: 1px solid lightgrey;
      border-right: 1px solid lightgrey;
    }
    span:last-of-type {
      border-right: 0;
    }
  }

  &__price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-top: 1px solid lightgrey;
    margin-top: 1.5rem;
    padding-top: 1rem;
  }
  .sell,
  .rent,
  .condominio {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & span {
      font-size: 14px;
      color: grey;
      line-height: 1;
    }
  }

  .HouseCategory {
    margin-top: 1rem;
  }
}

.results .card {
  width: 100%;
}
</style>

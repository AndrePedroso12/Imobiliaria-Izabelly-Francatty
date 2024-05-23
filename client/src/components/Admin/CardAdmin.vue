<template>
  <article class="card">
    <div class="image-wrapper">
      <img loading="lazy" decoding="async" :src="card.mainImage" alt="" />
    </div>

    <div class="card__description">
      <p class="card__title">{{ card.location.street }}, nº{{ card.location.number }}</p>
      <p class="card__location">
        <Icon icon="mynaui:location" width="1.2em" height="1.2em" />
        {{ card.location.neighborhood }} - {{ card.location.city }}
      </p>
    </div>
    <div class="card__price">
      <div class="sell" v-if="card.model == 'Compra'">
        <span>Venda</span>
        R$ {{ card.price }}
      </div>
      <div class="rent" v-if="card.model == 'Alugar'">
        <span>Aluguel</span>
        R$ {{ card.price }}
      </div>
      <div class="condominio" v-if="card.monthly">
        <span>Condominio</span>
        R$ {{ card.monthly }}
      </div>
    </div>

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
      </div>
    </div>

    <div class="card__model" :class="card.model">
      <p>{{ card.model }}</p>
    </div>

    <div class="card__edit">
      <span @click="edit()"><Icon icon="clarity:pencil-line" width="1.2em" height="1.2em" /></span>
      <span @click="deleteButton()"
        ><Icon icon="fluent:delete-32-regular" width="1.2em" height="1.2em"
      /></span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ImovelType } from '@/interfaces/interfaces'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  infos: ImovelType
}>()

const card = ref(props.infos)
const emit = defineEmits(['edit', 'delete'])

function edit() {
  emit('edit')
}

function deleteButton() {
  emit('delete')
}

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
  border: 0;
  padding: 10px;
  background: #fff;
  margin: 0 15px;
  color: var(--color-text);
  align-self: stretch;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .image-wrapper {
    overflow: hidden;
    border-radius: 16px;
    width: 150px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__description {
    color: var(--color-text);
    padding-left: 1.875rem;
    font-size: 0.9375rem;
    text-align: left;
    flex: 0.5;
  }
  &__title {
    font-size: 19px;
    font-weight: 600;
  }

  &__location {
    color: grey;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    flex: 0.5;
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
  }

  &__price {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    flex: 0.2;
  }

  &__model {
    display: inline-block;
    padding: 4px 15px;
    border-radius: 30px;
    font-size: 13px;
    height: fit-content;
    text-align: center;
    justify-content: flex-start;
    flex: 0.2;
    &.Alugar {
      color: #d1b735;
      background: #fdf9e5;
    }
    &.Compra {
      color: #3554d1;
      background: #e5f0fd;
    }
  }

  &__edit {
    flex: 0.2;
    display: flex;
    justify-content: flex-end;

    span {
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      position: relative;
      width: 40px;
      height: 40px;
      font-size: 13px;
      text-align: center;
      color: #1f4b43;
      background: #fff8f6;
      border-radius: 50%;
      -webkit-transition: all 0.2s ease-in-out 0s;
      -o-transition: all 0.2s ease-in-out 0s;
      transition: all 0.2s ease-in-out 0s;
      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
  .sell,
  .rent,
  .condominio {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 19px;
    font-weight: 500;
    color: #eb664e;
    line-height: 1.5;

    & span {
      font-size: 15px;
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
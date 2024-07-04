<template>
  <article class="card">
    <div class="image-wrapper logo">
      <img loading="lazy" decoding="async" :src="card.logo" alt="" />
    </div>
    <div class="image-wrapper">
      <img loading="lazy" decoding="async" :src="card.mainImage" alt="" />
    </div>

    <div class="card__description">
      <p class="card__title">{{ card.name }}</p>
      <p class="card__location">
        <Icon icon="mynaui:location" width="1.2em" height="1.2em" />
        {{ card.city }}
      </p>
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
import type { EmpreendimentoType } from '@/interfaces/interfaces'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  infos: EmpreendimentoType
}>()

const card = ref(props.infos)

const emit = defineEmits(['edit', 'delete'])

function edit() {
  emit('edit')
}

function deleteButton() {
  emit('delete')
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
  color: var(--color-text);
  align-self: stretch;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #d3d3d354;
  align-items: center;

  @media (max-width: 768px) {
    padding: 35px 15px 40px;
    display: flex;
    flex-wrap: wrap;
  }
  .image-wrapper {
    overflow: hidden;
    border-radius: 16px;
    width: 150px;
    height: 110px;
    @media (max-width: 768px) {
      min-width: 100px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 12px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #000000c2;
      @media (max-width: 768px) {
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-radius: 18px;
        margin-bottom: 10px;
      }
    }
  }
  &__description {
    color: var(--color-text);
    padding-left: 1.875rem;
    font-size: 0.9375rem;
    text-align: left;
    flex: 0.5;
    @media (max-width: 768px) {
      margin-top: 1rem;
      padding: 0;
      text-align: center;
      flex: 1;
      min-width: 100%;
    }
    &_mobile {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  &__title {
    font-size: 16px;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 1.2rem;
      line-height: normal;
    }
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
    @media (max-width: 768px) {
      flex-direction: row;
    }
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
    @media (max-width: 768px) {
      flex: 1;
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 20px;
      margin-top: 20px;
    }

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
    font-size: 16px;
    font-weight: 500;
    color: #eb664e;
    line-height: 1.5;
    @media (max-width: 768px) {
      font-size: 15px;
    }

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

.accordion-content {
  padding: 2.5rem 15px;
  border: 1px solid #eaeaea;
  border-top: none;
  margin-top: -40px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  cursor: auto;

  p {
    flex: 0.6;
    border: 1px solid #eaeaea;
    padding: 10px;
    margin-right: 20px;
    border-radius: 8px;
  }
}
</style>

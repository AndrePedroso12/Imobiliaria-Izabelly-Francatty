<template>
  <div class="cards_empreendimentos">
    <article>
      <div class="cards_empreendimentos__description">
        <p class="cards_empreendimentos__title">{{ card.name }}</p>
        <p class="cards_empreendimentos__location">
          <Icon icon="mynaui:location" width="1.2em" height="1.2em" /> {{ card.city }}
        </p>
      </div>
      <div class="cards_empreendimentos__logo">
        <img :src="card.logo" :alt="card.name" />
      </div>
      <div class="image-wrapper">
        <img
          loading="lazy"
          decoding="async"
          width="500"
          height="500"
          :src="card.mainImage"
          class="attachment-justhome-property-grid-lg size-justhome-property-grid-lg"
          alt=""
        />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { EmpreendimentoType } from '@/interfaces/interfaces'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps<{
  card: EmpreendimentoType
}>()

const card = ref(props.card)
</script>

<style scoped lang="scss">
.cards_empreendimentos {
  flex: 0 0 auto;
  width: 90%;
  height: 25rem;
  margin: 15px;
  border-radius: 16px;
  /* margin-bottom: 1.875rem; */
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out 0s;

  &__description {
    position: absolute;
    top: 0;
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

  &__logo {
    position: absolute;
    top: 50%;
    bottom: auto;
    left: 0;
    right: auto;
    z-index: 1;
    img {
      width: 100%;
    }
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

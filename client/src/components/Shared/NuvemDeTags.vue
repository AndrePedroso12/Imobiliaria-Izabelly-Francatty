<template>
  <div class="tags">
    <h2 class="tags__title">Pesquisas Populares</h2>

    <div class="tags__wrapper">
      <RouterLink
        :to="{
          name: 'pesquisa',
          params: { cidade: tag.link, empreendimento: tag?.empreendimento }
        }"
        v-for="tag in Tags"
        :key="tag.nome"
      >
        {{ tag.nome }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TagsFooter } from './nuvemDeTags.js'
import { ref } from 'vue'

const Tags = ref(TagsFooter)
</script>

<style lang="scss">
.tags {
  text-align: center;
  margin-top: 4rem;
  padding: 4rem 0;

  &__title {
    font-size: 40px;
    line-height: 1.3em;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 23px;
    }
  }

  &__subtitle {
    font-size: 17px;
    @media (max-width: 768px) {
      font-size: 11px;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    gap: 10px;
    width: 90%;
    margin: 2rem auto;

    a {
      font-size: 15px;
      font-weight: 500;
      line-height: 48px;
      color: #1a1a1a;
      border: 1px solid #1a1a1a;
      border-radius: 50px;
      padding: 0px 25px;
      @media (max-width: 768px) {
        font-size: 11px;
      }
    }
  }
}
</style>

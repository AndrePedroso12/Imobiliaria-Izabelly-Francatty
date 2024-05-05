<template>
  <div class="tags">
    <h2 class="tags__title">Pesquisas Populares</h2>
    <span class="tags__subtitle">Lorem ipsum dolor sit amet, connsectetur adipiscing elit.</span>

    <div class="tags__wrapper">
      <a v-for="tag in Tags" :key="tag.nome" :href="tag.link">
        {{ tag.nome }}
      </a>
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
  }

  &__subtitle {
    font-size: 17px;
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
      fill: #1a1a1a;
      color: #1a1a1a;
      background-color: #ffffff;
      border-style: solid;
      border-width: 1px 1px 1px 1px;
      border-color: #1a1a1a;
      border-radius: 50px 50px 50px 50px;
      padding: 0px 25px 0px 25px;
    }
  }
}
</style>

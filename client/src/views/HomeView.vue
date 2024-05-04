<script setup lang="ts">
import SearchBar from '@/components/Home/SearchBar.vue'
import SliderBanner from '@/components/Home/SliderBanner.vue'
import SeçãoMaisBuscados from '@/components/Home/SeçãoMaisBuscados.vue'
import SeçãoEmpreendimentos from '@/components/Home/SeçãoEmpreendimentos.vue'
import SeçãoNovos from '@/components/Home/SeçãoNovos.vue'
import SeçãoQuemSomos from '@/components/Home/SeçãoQuemSomos.vue'
import SeçãoCategorias from '@/components/Home/SeçãoCategorias.vue'

import { ImoveisTeste } from '../components/Shared/dataTest.js'
import { ref } from 'vue'
import type { ImovelType } from '@/interfaces/interfaces'

const ImoviesRef = ref(ImoveisTeste)

const banners = ImoviesRef.value.filter((obj) => obj.banner === true)
const maisBuscados = ImoviesRef.value.filter((obj) => obj.isfavourite === true)
const novosImoveis = ImoviesRef.value.filter(
  (item) => !item.isfavourite && !item.isTop && !item.banner
)
</script>

<template>
  <main>
    <SliderBanner :imoveis="banners" />
    <SearchBar />
    <SeçãoMaisBuscados :maisBuscados="maisBuscados" />
    <SeçãoEmpreendimentos />
    <SeçãoNovos :novosCadastros="novosImoveis" />
    <SeçãoQuemSomos />
    <SeçãoCategorias :categorias="ImoviesRef" />
    <!-- <TheWelcome /> -->
  </main>
</template>

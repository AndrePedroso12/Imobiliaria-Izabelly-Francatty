<script setup lang="ts">
import SearchBar from '@/components/Home/SearchBar.vue'
import SliderBanner from '@/components/Home/SliderBanner.vue'
import SeçãoMaisBuscados from '@/components/Home/SeçãoMaisBuscados.vue'
import SeçãoEmpreendimentos from '@/components/Home/SeçãoEmpreendimentos.vue'
import SeçãoNovos from '@/components/Home/SeçãoNovos.vue'
import SeçãoQuemSomos from '@/components/Home/SeçãoQuemSomos.vue'
import SeçãoCategorias from '@/components/Home/SeçãoCategorias.vue'
import SeçãoDestaques from '@/components/Home/SeçãoDestaques.vue'
import BarraContato from '@/components/Shared/BarraContato.vue'
import NuvemDeTags from '@/components/Shared/NuvemDeTags.vue'

import { ref, onMounted } from 'vue'

import { useImoveis } from '@/composables'
import LoaderSpinner from '@/components/Shared/LoaderSpinner.vue'

const ImoviesRef = ref()
const ImoveisFunction = useImoveis()
const loading = ref(true)
const banners = ref()
const maisBuscados = ref()
const novosImoveis = ref()
const destaque = ref()

async function getAllImoveis() {
  loading.value = true

  const data = await ImoveisFunction.carregarImoveis()
  if (data) ImoviesRef.value = data
  loading.value = false
}

onMounted(async () => {
  await getAllImoveis()
  if (ImoviesRef.value) {
    banners.value = ImoviesRef.value.filter((obj: any) => obj.banner === true)
    maisBuscados.value = ImoviesRef.value.filter((obj: any) => obj.isfavourite === true)
    novosImoveis.value = ImoviesRef.value.filter(
      (item: any) => !item.isfavourite && !item.isTop && !item.banner
    )
    destaque.value = ImoviesRef.value.filter((obj: any) => obj.isTop === true)[0]
  }
})
</script>

<template>
  <main>
    <LoaderSpinner v-if="loading" />
    <div v-if="!loading && ImoviesRef">
      <SliderBanner :imoveis="banners" v-if="banners" />
      <SearchBar :imoveis="ImoviesRef" />
      <SeçãoMaisBuscados :maisBuscados="maisBuscados" v-if="maisBuscados" />
      <SeçãoEmpreendimentos />
      <SeçãoNovos :novosCadastros="novosImoveis" v-if="novosImoveis" />
      <SeçãoQuemSomos />
      <SeçãoCategorias :categorias="ImoviesRef" v-if="ImoviesRef" />
      <SeçãoDestaques :destaque="destaque" v-if="destaque" />
      <BarraContato />
      <NuvemDeTags />
    </div>
  </main>
</template>

<style scoped>
#loader-1 {
  margin: 40vh auto;
  position: relative;
}
</style>

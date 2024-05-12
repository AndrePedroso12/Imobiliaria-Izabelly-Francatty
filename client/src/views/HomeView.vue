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

import { ImoveisTeste } from '../components/Shared/dataTest.js'
import { ref, onMounted } from 'vue'

import { useAuth, useImoveis } from '@/composables'

const ImoviesRef = ref(ImoveisTeste)
const ImoveisFunction = useImoveis()
const loginFunction = useAuth()

async function carregarViaComposable() {
  try {
    const data = await ImoveisFunction.carregarImoveis()
    console.log('Imóveis carregados:', data)
  } catch (error) {
    console.error('Erro ao carregar imóveis:', error)
  }
}
async function LoginTeste() {
  try {
    const data = await loginFunction.login('AndrePedroso', 'Canola12')
    console.log('Imóveis carregados:', data)
  } catch (error) {
    console.error('Erro ao carregar imóveis:', error)
  }
}

onMounted(async () => {
  await LoginTeste()
  carregarViaComposable()
})
const banners = ImoviesRef.value.filter((obj) => obj.banner === true)
const maisBuscados = ImoviesRef.value.filter((obj) => obj.isfavourite === true)
const novosImoveis = ImoviesRef.value.filter(
  (item) => !item.isfavourite && !item.isTop && !item.banner
)
const destaque = ImoviesRef.value.filter((obj) => obj.isTop === true)[0]
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
    <SeçãoDestaques :destaque="destaque" />
    <BarraContato />
    <NuvemDeTags />
    <!-- <TheWelcome /> -->
  </main>
</template>

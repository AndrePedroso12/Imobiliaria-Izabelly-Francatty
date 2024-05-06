<!-- Slider.vue -->
<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :value="value"
    @input="updateValue($event?.target?.value)"
  />
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue'

// Defina as props do componente
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  value: { type: Number, default: 0 }
})

// Variável reativa para armazenar o valor do slider
const sliderValue = ref(props.value)

// Método para atualizar o valor do slider
const updateValue = (newValue: number) => {
  sliderValue.value = newValue
}

// Exponha variáveis e métodos para o componente pai
defineExpose({ sliderValue, updateValue })
</script>

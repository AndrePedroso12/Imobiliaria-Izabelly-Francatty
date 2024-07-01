<template>
  <LoaderDots v-if="loading" />
  <p class="error-text" v-if="errorText">
    <span v-for="erros in errorText.errors" :key="erros">
      {{ erros }}
    </span>
  </p>
  <p class="success-text" v-if="successText">{{ successText }}</p>

  <div class="create-container" v-if="!loading">
    <div class="basic-info">
      <h5>Endereço</h5>
      <div class="box-info">
        <label for="">Nome</label>
        <input type="text" v-model="cardInfos.name" />
      </div>
      <div class="box-info w-50">
        <label for="">Cidade</label>
        <input type="text" v-model="cardInfos.city" />
      </div>
    </div>

    <div class="basic-info">
      <h5>Imagens</h5>
      <div class="box-info">
        <label for="">Imagem Principal</label>
        <div class="image-holder" v-if="mainImagePreview">
          <Icon
            icon="fluent:delete-32-regular"
            width="1.2em"
            height="1.2em"
            @click="removeMainImage()"
          />
          <img :src="mainImagePreview" alt="Main Image" />
        </div>
        <input
          type="file"
          class="input-button"
          accept="image/png, image/jpeg"
          @change="previewMainImage"
        />
      </div>
      <div class="box-info">
        <label for="">Logo sem fundo</label>
        <div class="image-box">
          <div class="image-holder" v-if="galleryPreviews">
            <Icon
              icon="fluent:delete-32-regular"
              width="1.2em"
              height="1.2em"
              @click="removeGalleryImage()"
            />
            <img :src="galleryPreviews" alt="" />
          </div>
        </div>

        <input
          type="file"
          class="input-button"
          accept="image/png, image/jpeg"
          multiple
          @change="previewLogoImage"
        />
      </div>
    </div>

    <button @click="saveChanges()">Salvar empreendimento</button>
  </div>
</template>

<script setup lang="ts">
import type { EmpreendimentoType } from '@/interfaces/interfaces'
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useEmpreendimentos } from '@/composables'
import LoaderDots from '../Shared/LoaderDots.vue'

const cardInfos = ref<EmpreendimentoType>({
  id: 0,
  name: '',
  mainImage: '',
  logo: '',
  city: ''
})

const EmpreendimentosFunction = useEmpreendimentos()
const mainImagePreview = ref()
const mainImageFile = ref<File>()
const galleryPreviews = ref()
const galleryFiles = ref<File>()
const loading = ref(false)
const errorText = ref()
const successText = ref()

const props = defineProps<{
  selectedCard?: number
}>()

const emit = defineEmits(['savedEmpreendimento'])

function emitSaved() {
  emit('savedEmpreendimento')
}

// function previewMainImage(event: any) {
//   const file = event.target.files[0]
//   mainImageFile.value = file
//   cardInfos.value.mainImage = file
//   if (file) {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       if (!e.target) return
//       mainImagePreview.value = e.target.result
//     }
//     reader.readAsDataURL(file)
//   }
// }

// function previewLogoImage(event: any) {
//   const file = event.target.files[0]
//   galleryFiles.value = file
//   cardInfos.value.logo = file
//   if (file) {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       if (!e.target) return
//       galleryPreviews.value = e.target.result
//     }
//     reader.readAsDataURL(file)
//   }
// }

// Funções alteradas para usar convertToWebP
async function previewMainImage(event: any) {
  const file = event.target.files[0]
  if (file) {
    const webpFile = await convertToWebPFile(file)
    mainImageFile.value = webpFile
    cardInfos.value.mainImage = webpFile

    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target) return
      mainImagePreview.value = e.target.result
    }
    reader.readAsDataURL(webpFile)
  }
}

async function previewLogoImage(event: any) {
  const file = event.target.files[0]
  if (file) {
    const webpFile = await convertToWebPFile(file)
    galleryFiles.value = webpFile
    cardInfos.value.logo = webpFile

    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target) return
      galleryPreviews.value = [e.target.result]
    }
    reader.readAsDataURL(webpFile)
  }
}

async function convertToWebPFile(imageFile: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject('Erro ao obter contexto do canvas')
          return
        }

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            const webpFile = new File([blob], imageFile.name.replace(/\.[^.]+$/, '.webp'), {
              type: 'image/webp'
            })
            resolve(webpFile)
          } else {
            reject('Erro ao criar Blob')
          }
        }, 'image/webp')
      }
      img.onerror = reject
    }
    reader.readAsDataURL(imageFile)
  })
}

function removeMainImage() {
  mainImagePreview.value = ''
}

function removeGalleryImage() {
  galleryPreviews.value = ''
}

async function saveChanges() {
  successText.value = ''
  errorText.value = ''

  if (props.selectedCard) {
    try {
      loading.value = true
      const data = await EmpreendimentosFunction.atualizarEmpreendimento(cardInfos.value)

      if (!data.errors) {
        cardInfos.value = data
        successText.value = 'Empreendimento atualizado com sucesso, aguarde para ser redirecionado'
      } else if (data) {
        errorText.value = data
      } else {
        errorText.value =
          'Houve um erro ao tentar atualizar esse empreendimento, por favor tente novamente mais tarde'
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  } else {
    loading.value = true
    try {
      const data = await EmpreendimentosFunction.criarNovoEmpreendimentos(cardInfos.value)
      if (!data.errors) {
        cardInfos.value = data
        successText.value = 'Empreendimento criado com sucesso'
      } else if (data) {
        errorText.value = data
      } else {
        errorText.value =
          'Houve um erro ao tentar criar esse empreendimento, por favor tente novamente mais tarde'
      }
      loading.value = false
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  loading.value = false
  if (successText.value) {
    setTimeout(() => {
      emitSaved()
    }, 2000)
  }
}

async function getEmpeendimento() {
  if (!props.selectedCard) return
  loading.value = true
  try {
    const data = await EmpreendimentosFunction.carregarEmpreendimentoPorId(props.selectedCard)
    if (data) cardInfos.value = data
    mainImagePreview.value = data.mainImage
    galleryPreviews.value = data.logo
  } catch (error) {
    console.error('Erro ao carregar imóveil:', error)
  }
  loading.value = false
}

onMounted(async () => {
  if (props.selectedCard) {
    setTimeout(async () => {
      await getEmpeendimento()
    }, 500)
  }
})
</script>

<style lang="scss" scoped>
.create-container {
  .basic-info {
    border-radius: 24px;
    padding: 35px 40px 40px;
    margin-bottom: 1.875rem;
    background-color: #fff;
    border: 1px solid #e9e9e9;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
      .w-50 {
        width: 100%;
      }
    }
  }

  h5 {
    font-size: 21px;
    padding: 0;
    margin: 0 0 5px 0;
    font-weight: 500;
    width: 100%;
  }

  label {
    width: 100%;
    padding: 0;
    font-size: 0.9375rem;
    font-weight: 400;
    margin: 0 0 7px;
    color: #222;
    float: left;
    vertical-align: top;
  }

  input,
  select,
  textarea {
    height: calc(1.9em + (1.5rem + 2px));
    margin: 0;
    display: block;
    width: 100%;
    padding: 0.75rem 1.29rem;
    font-size: 0.9375rem;
    line-height: 1.9;
    color: #1a1a1a;
    border: 1px solid #e9e9e9;
    background-color: #fff;
    background-image: none;
    border-radius: 12px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  textarea {
    min-width: 100%;
    min-height: 14rem;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 4rem;
    list-style: none;
    padding: 0;
    width: 100%;
  }

  .tag-input {
    .tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0;
    }

    .tag {
      margin-top: 10px;
      border: 0;
      background-color: #f9f9f9;
      list-style: none;
      margin: 5px 5px 0 0;
      padding: 5px 10px;
      border-radius: 12px;
      display: flex;
      /* font-size: 14px; */
      align-items: center;
      flex-direction: row;
    }
    .remove-tag-btn {
      color: #dc3545;
      margin: 0 5px;
      cursor: pointer;
      display: inline-block;
      font-weight: 700;
    }
  }

  .box-info {
    margin-bottom: 20px;
    width: 100%;
    &.w-50 {
      width: 49%;
    }
    &.w-25 {
      max-width: 15%;
    }
    @media (max-width: 768px) {
      &.w-50 {
        width: 100%;
      }
      &.w-25 {
        max-width: 100%;
      }
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .image-holder {
      border-radius: 16px;
      display: block;
      overflow: hidden;
      position: relative;
      min-width: 190px;
      width: 190px;
      margin-bottom: 20px;
      height: 6.7rem;
      @media (max-width: 768px) {
        min-width: 153px;
      }
    }

    svg {
      position: absolute;
      top: 41%;
      margin: 0 auto;
      left: 42%;
      border-radius: 50px;
      background: white;
      padding: 7px;
      font-size: 2rem;
      cursor: pointer;
    }

    .image-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: flex-start;
      gap: 20px;
    }

    .input-button {
      border: 0;
      color: transparent;
      padding: 0;
      &::file-selector-button {
        padding: 15px 40px;
        display: inline-block;
        margin: 0;
        background-color: #fff;
        border: 1px solid #e7c873;
        color: #1a1a1a;
        font-weight: 500;
        font-size: 0.9375rem;
        border-radius: 12px;
        -webkit-transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
        cursor: pointer;
        &:hover {
          background-color: #e7c873;
          border: 1px solid #e7c873;
        }
      }
    }
  }

  .checkbox-wrapper-22 .switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
  }

  .checkbox-wrapper-22 .switch input {
    display: none;
  }

  .checkbox-wrapper-22 .slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  .checkbox-wrapper-22 .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: '';
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }

  .checkbox-wrapper-22 input:checked + .slider {
    background-color: #66bb6a;
  }

  .checkbox-wrapper-22 input:checked + .slider:before {
    transform: translateX(26px);
  }

  .checkbox-wrapper-22 .slider.round {
    border-radius: 34px;
  }

  .checkbox-wrapper-22 .slider.round:before {
    border-radius: 50%;
  }
}

.error-text,
.success-text {
  margin: 1rem auto;
  color: white;
  text-align: center;
  padding: 0.55rem;
  border-radius: 9px;
}

.error-text {
  background: #ff3333;
  -webkit-animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}
.success-text {
  background: #059f0d;
}
</style>

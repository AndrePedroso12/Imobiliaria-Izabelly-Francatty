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
        <label for="">Rua</label>
        <input type="text" v-model="cardInfos.location.street" />
      </div>
      <div class="box-info w-50">
        <label for="">Bairro</label>
        <input type="text" v-model="cardInfos.location.neighborhood" />
      </div>
      <div class="box-info w-50">
        <label for="">Cidade</label>
        <input type="text" v-model="cardInfos.location.city" />
      </div>
      <div class="box-info w-50">
        <label for="">Numero</label>
        <input type="text" v-model="cardInfos.location.number" />
      </div>
      <div class="box-info w-50">
        <label for="">Complemento</label>
        <input type="text" v-model="cardInfos.location.complemento" />
      </div>
    </div>

    <div class="basic-info">
      <h5>Caracteristicas</h5>

      <div class="box-info w-50">
        <label for="">Tipo de Imóvel</label>
        <select v-model="cardInfos.category">
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Terreno">Terreno</option>
          <option value="Area">Area</option>
          <option value="Galpão">Galpão</option>
        </select>
      </div>
      <div class="box-info w-50">
        <label for="">Modelo</label>
        <select v-model="cardInfos.model">
          <option value="Compra">Comprar</option>
          <option value="Alugar">Alugar</option>
        </select>
      </div>
      <div class="box-info">
        <ul>
          <li>
            <label>Condominio</label>

            <div class="checkbox-wrapper-22">
              <label class="switch" for="tipoCondominio">
                <input type="checkbox" id="tipoCondominio" v-model="tipoCondominio" />
                <div class="slider round"></div>
              </label>
            </div>
          </li>
          <!-- <li>
            <label>Aluguel</label>
            <div class="checkbox-wrapper-22">
              <label class="switch" for="tipoAluguel">
                <input
                  type="checkbox"
                  id="tipoAluguel"
                  v-model="tipoAluguel"
                  @change="handleAluguel"
                />
                <div class="slider round"></div>
              </label>
            </div>
          </li> -->
        </ul>
      </div>
      <h5>Descrição interna</h5>
      <div class="box-info w-25">
        <label for="">Qtd. Quartos</label>
        <input type="number" v-model="cardInfos.details.rooms" />
      </div>
      <div class="box-info w-25">
        <label for="">Qtd. Banheiros</label>
        <input type="number" v-model="cardInfos.details.bathrooms" />
      </div>
      <div class="box-info w-25">
        <label for="">Qtd. Suites</label>
        <input type="number" v-model="cardInfos.details.suites" />
      </div>

      <div class="box-info w-25">
        <label for="">Qtd. Vagas na garagem</label>
        <input type="number" v-model="cardInfos.details.garage" />
      </div>
      <div class="box-info w-25">
        <label for="">Tamanho do terreno</label>
        <input type="number" v-model="cardInfos.details.area" />
      </div>
      <div class="box-info">
        <label for="">Descrição</label>
        <textarea type="text" v-model="cardInfos.description"></textarea>
      </div>
    </div>

    <div class="basic-info">
      <h5>Detalhes do imóvel</h5>
      <div class="box-info">
        <label for="">Caracteristicas</label>
        <div class="tag-input">
          <div class="tags-input-container">
            <div class="tags">
              <span v-for="(tag, index) in tags" :key="index" class="tag">
                {{ tag }}
                <span @click="removeTag(index)" class="remove-tag-btn">x</span>
              </span>
              <input
                type="text"
                v-model="newTag"
                @keydown.enter.prevent="addTag"
                @keydown.delete="removeLastTag"
                @focusOut="addTag"
                placeholder="Digite as caracteristicas do imóvel e aperte enter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="basic-info">
      <h5>Preço</h5>
      <div class="box-info w-50">
        <label for="" v-if="cardInfos.model != 'Alugar'">Preço venda</label>
        <label for="" v-else>Preço aluguel</label>
        <input type="number" v-model="cardInfos.price" />
      </div>

      <div class="box-info w-50" v-if="tipoCondominio">
        <label for="">Condominio</label>
        <input type="text" v-model="cardInfos.monthly" />
      </div>
    </div>

    <div class="basic-info" v-if="cardInfos">
      <h5>Informações para o site</h5>
      <div class="box-info w-50">
        <label for="">Deve aparecer no Banner do site?</label>

        <div class="checkbox-wrapper-22">
          <label class="switch" for="banner">
            <input type="checkbox" id="banner" v-model="cardInfos.banner" />
            <div class="slider round"></div>
          </label>
        </div>
      </div>
      <div class="box-info w-50">
        <label for="">É um destaque?</label>
        <div class="checkbox-wrapper-22">
          <label class="switch" for="favorite">
            <input type="checkbox" id="favorite" v-model="cardInfos.isfavourite" />
            <div class="slider round"></div>
          </label>
        </div>
      </div>
      <div class="box-info w-50">
        <label for="">Deve aparecer na seçãod e mais buscados?</label>
        <div class="checkbox-wrapper-22">
          <label class="switch" for="isTop">
            <input type="checkbox" id="isTop" v-model="cardInfos.isTop" />
            <div class="slider round"></div>
          </label>
        </div>
      </div>
      <div class="box-info w-50">
        <label for="">Nome do Vendedor</label>
        <input type="text" v-model="cardInfos.sellerName" />
      </div>
      <div class="box-info">
        <label for="">Caracteristicas destaques do imóvel</label>
        <input type="text" v-model="cardInfos.tags[0]" class="w-25" />
        <input type="text" v-model="cardInfos.tags[1]" class="w-25" />
        <input type="text" v-model="cardInfos.tags[2]" class="w-25" />
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
        <label for="">Galeria de Imagens</label>
        <div class="image-box">
          <div class="image-holder" v-for="(image, index) in galleryPreviews" :key="index">
            <Icon
              icon="fluent:delete-32-regular"
              width="1.2em"
              height="1.2em"
              @click="removeGalleryImage(index)"
            />
            <img :src="getImageSource(image)" alt="" />
          </div>
        </div>

        <input
          type="file"
          class="input-button"
          accept="image/png, image/jpeg"
          multiple
          @change="previewGalleryImage"
        />
      </div>
      <div class="box-info">
        <label for="">Video</label>

        <div class="image-holder" v-if="videoPreview">
          <Icon
            icon="fluent:delete-32-regular"
            width="1.2em"
            height="1.2em"
            @click="removeVideo()"
          />
          <video controls>
            <source type="video/mp4" :src="videoPreview" />
            Your browser does not support the video tag.
          </video>
        </div>

        <input type="file" class="input-button" accept="video/mp4, video/webm" @change="addVideo" />
      </div>
    </div>

    <button @click="saveChanges()">Salvar imóvel</button>
  </div>
</template>

<script setup lang="ts">
import type { ImovelType } from '@/interfaces/interfaces'
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useImoveis, useImagens } from '@/composables'
import LoaderDots from '../Shared/LoaderDots.vue'

const cardInfos = ref<ImovelType>({
  id: 0,
  category: 'Apartamento',
  model: 'Compra',
  mainImage: '',
  images: [],
  video: '',
  location: {
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complemento: ''
  },
  price: 0,
  details: {
    area: 0,
    tags: []
  },
  description: '',
  tags: [],
  sellerName: ''
})
const ImoveisFunction = useImoveis()
const ImagemFunction = useImagens()
const tipoCondominio = ref<boolean>(false)
const mainImagePreview = ref()
const mainImageFile = ref<File>()
const galleryPreviews = ref<(string | ArrayBuffer)[]>([])
const videoPreview = ref()
const videoFile = ref<File>()
const loading = ref(false)
const errorText = ref()
const successText = ref()

const newTag = ref('')
const tags = ref<string[]>([])

const props = defineProps<{
  selectedCard?: number
}>()

const emit = defineEmits(['saved'])

function emitSaved() {
  emit('saved')
}

function addTag() {
  if (newTag.value.trim() !== '') {
    tags.value.push(newTag.value.trim())
    newTag.value = ''
    cardInfos.value.details.tags = tags.value
  }
}
function removeTag(index: number) {
  tags.value.splice(index, 1)
  cardInfos.value.details.tags = tags.value
}

function removeLastTag(event: KeyboardEvent) {
  if (newTag.value === '' && event.key === 'Backspace' && tags.value.length > 0) {
    tags.value.pop()
    cardInfos.value.details.tags = tags.value
  }
}

function previewMainImage(event: any) {
  const file = event.target.files[0]
  mainImageFile.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target) return
      mainImagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function previewGalleryImage(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const files = Array.from(input.files)
    files.forEach((file) => {
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (!e.target?.result) return
          galleryPreviews.value.push(e.target.result)
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

function addVideo(event: any) {
  const file = event.target.files[0]
  videoFile.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target) return
      videoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function removeVideo() {
  videoPreview.value = ''
}

// Função para obter a origem da imagem
function getImageSource(image: string | ArrayBuffer | null): string {
  return typeof image === 'string' ? image : ''
}

function getVideoSource(video: string | null): string {
  return video ? `data:video/mp4;base64,${video}` : ''
}

function removeMainImage() {
  mainImagePreview.value = ''
}

function removeGalleryImage(index: number) {
  galleryPreviews.value.splice(index, 1)
}

async function saveChanges() {
  successText.value = ''
  errorText.value = ''

  // Atualiza as imagens da galeria, se houver
  if (galleryPreviews.value.length > 0) {
    cardInfos.value.images = galleryPreviews.value.map((item) => {
      // Se o item já for uma string, retorne-o
      if (typeof item === 'string') {
        return item
      }
      // Se for um objeto, como parece ser uma resposta do FileReader, converta-o para uma string
      return item.toString()
    })
  } else {
    cardInfos.value.images = [] // Se não houver imagens na galeria, limpe o array
  }

  if (props.selectedCard) {
    try {
      loading.value = true
      const data = await ImoveisFunction.atualizarImovel(cardInfos.value)

      if (!data.errors) {
        cardInfos.value = data
        successText.value = 'Imóvel atualizado com sucesso'
      } else if (data) {
        errorText.value = data
      } else {
        errorText.value =
          'Houve um erro ao tentar atualizar esse Imóvel, por favor tente novamente mais tarde'
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  } else {
    loading.value = true
    try {
      const data = await ImoveisFunction.criarNovoImovel(cardInfos.value)
      if (!data.errors) {
        cardInfos.value = data
        successText.value = 'Imóvel criado com sucesso'
      } else if (data) {
        errorText.value = data
      } else {
        errorText.value =
          'Houve um erro ao tentar criar esse Imóvel, por favor tente novamente mais tarde'
      }
      loading.value = false
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  if (cardInfos.value.id) {
    if (mainImageFile.value) {
      await ImagemFunction.salvarImagem(cardInfos.value.id, mainImageFile.value)
    }

    if (videoFile.value) {
      await ImagemFunction.carregarVideo(cardInfos.value.id, videoFile.value)
    }
  }
  loading.value = false
  if (successText.value) {
    setTimeout(() => {
      emitSaved()
    }, 2000)
  }
}

async function getImovel() {
  if (!props.selectedCard) return
  loading.value = true
  try {
    const data = await ImoveisFunction.carregarImovelPorIdAdmin(props.selectedCard)
    if (data) cardInfos.value = data
    mainImagePreview.value = data.mainImage
    galleryPreviews.value = data.images
    videoPreview.value = data.video
    tags.value = cardInfos.value.details.tags
  } catch (error) {
    console.error('Erro ao carregar imóveil:', error)
  }
  loading.value = false
}

onMounted(async () => {
  if (props.selectedCard) {
    setTimeout(async () => {
      await getImovel()
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

    video {
      width: 100%;
    }

    .image-holder {
      border-radius: 16px;
      display: block;
      overflow: hidden;
      position: relative;
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
    }

    .image-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: flex-start;
      gap: 20px;
      overflow-x: scroll;
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

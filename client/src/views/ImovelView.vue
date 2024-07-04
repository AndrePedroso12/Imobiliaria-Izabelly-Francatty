<template>
  <LoaderSpinner v-if="loading" />
  <div class="imovel-page" v-if="!loading && imovel">
    <div class="pagetop" id="top">
      <div class="top_description">
        <div class="breadcrumbs" v-motion-slide-visible-once-top>
          <RouterLink to="/">Home / </RouterLink>
          <RouterLink to="/">{{ imovel.location.city }} / </RouterLink>
          <RouterLink to="/">{{ imovel.location.neighborhood }}</RouterLink>
        </div>
        <p id="mensagem"></p>
        <div class="share desktop">
          <div class="share_icon" @click="shareSite()">
            <Icon icon="solar:share-outline" width="1.7em" height="1.7em" /><span
              >Compartilhar</span
            >
          </div>
          <div class="share_icon" @click="copiarURL()">
            <Icon icon="carbon:copy-link" width="1.7em" height="1.7em" /><span>Copiar Link</span>
          </div>
        </div>
      </div>
      <div class="title_section" v-motion-slide-visible-once-top>
        <div class="title">
          <h1>
            {{ imovel.category }}
            <span v-if="imovel.details.rooms || imovel.details.suites">com </span>
            <span v-if="imovel.details.rooms">{{ imovel.details.rooms }} dormitórios</span>
            <span v-if="imovel.details.rooms && imovel.details.suites"> e </span>
            <span v-if="imovel.details.suites">{{ imovel.details.suites }} suites </span>
            <span v-if="imovel.model == 'Compra'">á venda</span>
            <span v-else>para alugar</span>
            <span v-if="imovel.details.area">, {{ imovel.details.area }}m²</span>

            em {{ imovel.location.neighborhood }}
          </h1>
          <p>
            <Icon icon="arcticons:mapsgo" width="2em" height="2em" /> {{ imovel.location.city }}
          </p>
        </div>

        <div class="price" v-if="imovel.model != 'Compra e Aluga'">
          <p class="price_num" v-if="imovel.price">
            R$ {{ ImoveisFunction.formatPrice(imovel.price) }}
          </p>
          <p class="price_num" v-if="imovel.rent">
            R$ {{ ImoveisFunction.formatPrice(imovel.rent) }}
          </p>

          <p v-if="imovel.monthly" class="price_condominio">
            Condomínio - R$ {{ ImoveisFunction.formatPrice(imovel.monthly) }}/mês
          </p>
          <p v-else class="price_area">Area {{ imovel.details.area }}m²</p>
        </div>

        <div class="price" v-else>
          <p class="price_num">Compra R$ {{ ImoveisFunction.formatPrice(imovel.price) }}</p>

          <p class="price_condominio">
            Aluguel - R$ {{ imovel.rent ? ImoveisFunction.formatPrice(imovel.rent) : '' }}/mês
          </p>
        </div>
      </div>
    </div>
    <div class="page_container">
      <div class="content">
        <div class="galeria">
          <Carousel
            id="gallery"
            :items-to-show="1"
            :wrap-around="false"
            :transition="500"
            v-model="currentSlide"
          >
            <Slide v-for="(image, index) in imovel.images" :key="index">
              <div class="carousel__item" v-motion-slide-visible-once-top>
                <img :src="image" alt="Imagem do Imóvel" class="carousel__item" />
              </div>
            </Slide>

            <template #addons>
              <!-- <Navigation /> -->
              <navigation>
                <template #next>
                  <span class="carousel__next"> > </span>
                </template>
                <template #prev>
                  <span class="carousel__prev"> < </span>
                </template>
              </navigation>
            </template>
          </Carousel>

          <Carousel
            id="thumbnails"
            :items-to-show="4"
            v-model="currentSlide"
            :transition="500"
            snapAlign="start"
            ref="carousel"
          >
            <Slide v-for="(image, index) in imovel.images" :key="index">
              <div
                class="carousel__item"
                @click="slideTo(index - 1)"
                v-motion-slide-visible-once-top
              >
                <img :src="image" alt="Imagem do Imóvel" class="carousel__item" />
              </div>
            </Slide>
          </Carousel>
        </div>

        <IconsDetails :card-infos="imovel" v-motion-slide-visible-once-top />

        <div class="description" v-motion-slide-visible-once-top>
          <div class="title">Descrição</div>

          <p>{{ imovel.description }}</p>
        </div>
        <DetalhesInterna :card-infos="imovel" v-motion-slide-visible-once-top />
        <CaracteristicasInterna :card-infos="imovel" v-motion-slide-visible-once-top />

        <div class="video_container" v-if="imovel.video">
          <div class="title">Video</div>

          <VideoPlayer
            :videoUrl="imovel.video"
            :block-modal="true"
            v-motion-slide-visible-once-top
          />
        </div>
      </div>

      <div class="contato_sticky">
        <div class="container" :class="{ closed: !isExpanded }">
          <p class="title" @click="toggleExpand">
            Agende uma visita
            <Icon icon="raphael:arrowdown" width="1em" height="1em" />
          </p>

          <div v-if="isExpanded">
            <input type="text" placeholder="Seu nome" />
            <input type="text" placeholder="Cidade" />
            <textarea type="text" placeholder="">
  Olá, gostaria agendar uma visita ao imovel
          </textarea
            >

            <button>Enviar</button>
          </div>
        </div>

        <div class="container">
          <p class="title">Entre em contato</p>
          <div class="vendedor">
            <img
              src="https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.30808-6/382489428_6815579075193281_2352102450536844413_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHlgsLlPDbdHK2pLx622A0ZqHqGU0ib8YqoeoZTSJvxioZDRAphLtkWVLcTLEfLkUIIrxwVO7tg9zhpO5KQhYtS&_nc_ohc=iiZC9tweuPQQ7kNvgFUR8qA&_nc_ht=scontent.fcpq7-1.fna&oh=00_AYD6fr2QbLLRViBJxnFF3Wzvk0CHTWW7f6vmrCBID6iC5Q&oe=6645FDE8"
              alt=""
            />
            <div class="dados_vendedor">
              <p v-if="imovel.sellerName != null">{{ imovel.sellerName }}</p>
              <p v-else>Izabelly Francatti</p>
              <span>CRECI: 257739F</span>
            </div>
          </div>
          <input type="text" placeholder="Seu nome" />
          <input type="text" placeholder="Cidade" />
          <textarea type="text" placeholder="">
Olá, gostaria de saber mais sobre
esse anuncio...
        </textarea
          >

          <button>Entre em contato via Whatsapp</button>
        </div>
      </div>
    </div>
  </div>

  <Suspense>
    <!-- component with nested async dependencies -->
    <SeçãoNovos :novosCadastros="allImoveis" v-if="allImoveis" />

    <!-- loading state via #fallback slot -->
    <template #fallback>
      <LoaderDots v-if="loadingNovos" />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import CaracteristicasInterna from '@/components/Interna/CaracteristicasInterna.vue'
import DetalhesInterna from '@/components/Interna/DetalhesInterna.vue'
import IconsDetails from '@/components/Interna/IconsDetails.vue'
import VideoPlayer from '@/components/Shared/VideoPlayer.vue'
import SeçãoNovos from '@/components/Home/SeçãoNovos.vue'
import { Icon } from '@iconify/vue'
import { onMounted, ref, watch } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { useImoveis } from '@/composables'
import { useRoute } from 'vue-router'
import LoaderSpinner from '@/components/Shared/LoaderSpinner.vue'
import LoaderDots from '@/components/Shared/LoaderDots.vue'
import type { ImovelType } from '@/interfaces/interfaces'
import { useHead } from '@vueuse/head'

const imovel = ref<ImovelType>()
const allImoveis = ref()
const loading = ref(false)
const loadingNovos = ref(false)
const currentSlide = ref(0)
const ImoveisFunction = useImoveis()
const route = useRoute()
const imovelId = ref<number>(parseInt(route.params.id as string))
const isExpanded = ref(false)
const shareName = ref(
  imovel.value?.category +
    'para ' +
    imovel.value?.model +
    'em  ' +
    imovel.value?.location.neighborhood
)

onMounted(async () => {
  await getImovel()
  await getAllImoveis()
})

watch(route, async () => {
  imovelId.value = parseInt(route.params.id as string)
  window.scrollTo(0, 0)
  await getImovel()
  await getAllImoveis()
})

async function getImovel() {
  loading.value = true

  const data = await ImoveisFunction.carregarImovelPorId(imovelId.value)
  if (data) imovel.value = data
  loading.value = false
}

async function getAllImoveis() {
  loadingNovos.value = true

  const data = await ImoveisFunction.carregarImoveis()
  if (data) {
    allImoveis.value = data
    useHead({
      title:
        imovel.value?.category +
        ' ' +
        'para ' +
        imovel.value?.model +
        ' ' +
        'em  ' +
        imovel.value?.location.neighborhood,
      meta: [
        {
          name: 'description',
          content:
            'A Imobiliária Izabelly Francatti atua no mercado imobiliário desde 2021 em mais de 8 cidades do Brasil. Especializada no desenvolvimento e comercialização de empreendimentos. Venha nos conhecer na Av. Francisco Sales Pires, 25 - Florianópolis.'
        },
        {
          property: 'og:title',
          content:
            imovel.value?.category +
            ' ' +
            'para ' +
            imovel.value?.model +
            ' ' +
            ' em  ' +
            imovel.value?.location.neighborhood
        },
        {
          property: 'og:description',
          content:
            'A Imobiliária Izabelly Francatti atua no mercado imobiliário desde 2021 em mais de 8 cidades do Brasil. Especializada no desenvolvimento e comercialização de empreendimentos. Venha nos conhecer na Av. Francisco Sales Pires, 25 - Florianópolis.'
        }
      ]
    })
  }

  loadingNovos.value = false
}

function slideTo(val: number) {
  currentSlide.value = val
}

function copiarURL() {
  const url = window.location.href
  navigator.clipboard.writeText(url)
}

async function shareSite() {
  const shareData = {
    title:
      imovel.value?.category +
      ' ' +
      'para ' +
      imovel.value?.model +
      ' ' +
      'em  ' +
      imovel.value?.location.neighborhood,
    text: 'Imobiliaria Izabelly Francatti',
    url: location.href
  }
  await navigator.share(shareData)
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<style lang="scss" scoped>
#loader-1 {
  position: relative;
  margin: 40vh auto;
}

.imovel-page {
  padding: 2rem;
}

.pagetop {
  padding: 4rem 0 30px;
  @media (max-width: 768px) {
    padding: 3rem 0 30px;
  }
  .breadcrumbs a {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
  }
}

.title_section {
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .title {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    gap: 12px;
    width: 71%;
    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column-reverse;
    }

    h1,
    span {
      margin: 0;
      line-height: 1.2;
      font-size: 32px;
      font-weight: 700;
      @media (max-width: 768px) {
        font-size: 22px;
      }
    }
    svg {
      vertical-align: middle;
      font-size: 20px;
      margin-right: 10px;
      @media (max-width: 768px) {
        font-size: 11px;
      }
    }
    p {
      font-size: 19px;
      color: #00000078;
      @media (max-width: 768px) {
        font-size: 15px;
      }
    }
  }
  .price {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    gap: 8px;
    @media (max-width: 768px) {
      align-content: flex-start;
      gap: 0px;
      align-items: flex-start;
    }

    p {
      text-align: right;
    }
    &_num {
      font-size: 32px;
      font-weight: bold;
      line-height: 1.5;
    }

    &_condominio {
      opacity: 0.6;
    }
  }
}

.top_description {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding: 45px 0 10px;
  }
  .share {
    display: flex;
    justify-content: space-evenly;
    @media (max-width: 768px) {
      font-size: 12px;
    }

    .share_icon {
      display: flex;
      align-items: center;
      margin-left: 2rem;
      cursor: pointer;

      svg {
        -webkit-transition: all 0.2s ease-in-out 0s;
        -o-transition: all 0.2s ease-in-out 0s;
        transition: all 0.2s ease-in-out 0s;
        border: 1px solid #e9e9e9;
        background: transparent;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        padding: 6px;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        @media (max-width: 768px) {
          width: 25px;
          height: 25px;
          padding: 2px;
        }
      }
      span {
        @media (max-width: 768px) {
          display: none;
        }
      }

      &:first-of-type {
        @media (max-width: 768px) {
          margin: 0;
        }
      }
    }
  }
}

.page_container {
  display: flex;
  flex-wrap: nowrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .content {
    padding-right: 4rem;
    @media (max-width: 768px) {
      padding-right: 0;
    }
    .galeria {
      width: 100%;
      .carousel__item {
        width: 100%;
        height: 100%;
        max-height: 43rem;
        border-radius: 16px;
        margin-right: 18px;
        overflow: hidden;
      }
      span.carousel__prev,
      span.carousel__next {
        border-color: transparent;
        color: #fff;
        font-weight: 300;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(50px);
        opacity: 0.8;
        border-radius: 40px;
        width: 60px;
        height: 40px;
      }
      #thumbnails {
        margin: 1rem 0;
        img {
          cursor: pointer;
          max-height: 11rem;
        }
      }
    }

    .description {
      display: flex;
      flex-direction: column;
      padding: 30px;
      border-radius: 16px;
      border: 1px solid #ebebeb;
      margin-bottom: 2rem;

      .title {
        font-size: 27px;
        font-weight: 500;
        margin-bottom: 10px;
      }

      p {
        width: 100%;
        word-wrap: break-word;
        /* white-space: nowrap; */
      }
    }
  }

  .video_container {
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 16px;
    border: 1px solid #ebebeb;
    margin-bottom: 2rem;
    .title {
      font-size: 27px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .video-thumbnail {
      width: fit-content;
      margin: 0 auto;
    }

    video {
      border-radius: 16px;
    }
  }
}

.contato_sticky {
  width: 34%;
  position: sticky;
  top: 6rem;
  height: 100%;
  min-width: 21rem;
  @media (max-width: 768px) {
    position: revert;
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 16px;
    border: 1px solid #ebebeb;
    margin-bottom: 2rem;
    &.closed {
      padding: 1rem 30px;
    }
  }

  .title {
    font-size: 26px;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 1rem;
    svg {
      background: #82828224;
      border-radius: 50px;
      margin-left: 20px;
      cursor: pointer;
      margin-top: 5px;
    }
  }
  .vendedor {
    background: #f5f5f5;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding: 1rem;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;

    img {
      max-width: 45px;
      max-height: 45px;
      border-radius: 50px;
      margin-right: 1rem;
    }

    .dados_vendedor span {
      font-size: 14px;
      color: orange;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  input,
  textarea {
    width: 100%;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e9e9e9;
    appearance: none;
    border-radius: 12px;
    color: var(--color-text);
    cursor: pointer;
    padding: 0.75rem 1.29rem;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.9;
    margin-bottom: 1rem;
    &:hover {
      border-color: var(--color-text);
    }
  }

  textarea {
    margin-bottom: 1rem;
    height: 9rem;
    line-height: 1.2;
  }

  button {
    &:hover {
      border: 1px solid var(--color-background);
      background-color: white;
    }
  }
}

#mensagem {
  background: black;
  color: white;
  position: absolute;
  right: -10px;
  top: 6rem;
  padding: 5px 12px;
  opacity: 0.5;
  border-radius: 9px;
}
</style>

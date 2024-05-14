<template>
  <div class="imovel-page">
    <div class="pagetop" id="top">
      <div class="top_description">
        <div class="breadcrumbs">
          <RouterLink to="/">Home / </RouterLink>
          <RouterLink to="/">{{ imovel.location.city }} / </RouterLink>
          <RouterLink to="/">{{ imovel.location.neighborhood }}</RouterLink>
        </div>

        <div class="share">
          <div class="share_icon">
            <Icon icon="solar:share-outline" width="1.7em" height="1.7em" /><span
              >Compartilhar</span
            >
          </div>
          <div class="share_icon">
            <Icon icon="carbon:copy-link" width="1.7em" height="1.7em" /><span>Copiar Link</span>
          </div>
          <div class="share_icon">
            <Icon icon="formkit:bookmark" width="1.7em" height="1.7em" /><span
              >Salvar nos favoritos</span
            >
          </div>
        </div>
      </div>
      <div class="title_section">
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

        <div class="price">
          <p class="price_num">R$ {{ imovel.price }}</p>

          <p v-if="imovel.monthly" class="price_condominio">
            Condomínio - R$ {{ imovel.monthly }}/mês
          </p>
          <p v-else class="price_area">Area {{ imovel.details.area }}m²</p>
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
              <div class="carousel__item">
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
              <div class="carousel__item" @click="slideTo(index - 1)">
                <img :src="image" alt="Imagem do Imóvel" class="carousel__item" />
              </div>
            </Slide>
          </Carousel>
        </div>

        <IconsDetails :card-infos="imovel" />

        <div class="description">
          <div class="title">Descrição</div>

          <p>{{ imovel.description }}</p>
        </div>
        <DetalhesInterna :card-infos="imovel" />
        <CaracteristicasInterna :card-infos="imovel" />

        <div class="video_container">
          <div class="title">Video</div>

          <VideoPlayer :videoUrl="imovel.video" :block-modal="true" />
        </div>
      </div>

      <div class="contato_sticky">
        <div class="container">
          <p class="title">Agende uma visita</p>
          <input type="text" placeholder="Seu nome" />
          <input type="text" placeholder="Cidade" />
          <textarea type="text" placeholder="">
Olá, gostaria agendar uma visita ao imovel
        </textarea
          >

          <button>Enviar</button>
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
              <span>CRECI: 123456</span>
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

  <SeçãoNovos :novosCadastros="ImoveisTeste" />
</template>

<script setup lang="ts">
import CaracteristicasInterna from '@/components/Interna/CaracteristicasInterna.vue'
import DetalhesInterna from '@/components/Interna/DetalhesInterna.vue'
import IconsDetails from '@/components/Interna/IconsDetails.vue'
import VideoPlayer from '@/components/Shared/VideoPlayer.vue'
import SeçãoNovos from '@/components/Home/SeçãoNovos.vue'
import { ImoveisTeste } from '@/components/Shared/dataTest'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const imovel = ref(ImoveisTeste[0])
const currentSlide = ref(0)

function slideTo(val: number) {
  currentSlide.value = val
}
</script>

<style lang="scss">
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
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }

    h1,
    span {
      margin: 0;
      line-height: 1.2;
      font-size: 32px;
      font-weight: 700;
      @media (max-width: 768px) {
        font-size: 26px;
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
  }

  .title {
    font-size: 26px;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 1rem;
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
  }

  textarea {
    margin-bottom: 1rem;
    height: 9rem;
    line-height: 1.2;
  }
}
</style>

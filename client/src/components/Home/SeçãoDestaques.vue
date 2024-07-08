<template>
  <LoaderDots v-if="loading" />
  <div class="destaques" v-motion-slide-visible-once-top v-if="destaqueCard">
    <h3>Destaque dos destaques</h3>
    <p>Explore os imóveis mais exclusivos e desejados da nossa coleção:</p>
    <div class="destaques__wrapper">
      <div class="destaques__card_principal">
        <CardMaisBuscados :cardInfos="destaqueCard" />
      </div>
      <div class="destaques__card_secundario">
        <div class="destaques__card_slider"><ImageSlider :imagens="destaqueCard.images" /></div>
        <div class="destaques__card_bottom">
          <div class="destaques__card_video" v-if="destaqueCard.video">
            <VideoPlayer :videoUrl="destaqueCard.video" />
          </div>
          <div class="destaques__card_text" :class="{ w100: !destaqueCard.video }">
            <div class="area">{{ destaqueCard.details.area }}m²</div>
            <div class="description">
              {{ generateDescription(destaqueCard) }}
            </div>
            <div class="text">{{ truncateText(destaqueCard.description) }}</div>
            <div class="icon">
              <RouterLink :to="{ name: 'imovel', params: { id: destaqueCard.id } }">
                <Icon icon="mingcute:arrow-right-line" width="1.2em" height="1.2em" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImovelType } from '@/interfaces/interfaces'
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import CardMaisBuscados from './CardMaisBuscados.vue'
import ImageSlider from '../Shared/ImageSlider.vue'
import VideoPlayer from '../Shared/VideoPlayer.vue'
import { useImoveis } from '@/composables'
import LoaderDots from '../Shared/LoaderDots.vue'

const props = defineProps<{
  destaque: ImovelType
}>()

const destaqueID = ref(props.destaque.id)
const ImoveisFunction = useImoveis()
const destaqueCard = ref()
const loading = ref(true)

onMounted(async () => {
  await getAllImoveis()
})

async function getAllImoveis() {
  loading.value = true

  const data = await ImoveisFunction.carregarImovelPorId(destaqueID.value)
  if (data) destaqueCard.value = data
  loading.value = false
}

function generateDescription(houseDescription: ImovelType): string {
  let description = ''

  if (houseDescription.details.rooms !== undefined) {
    description += `${houseDescription.details.rooms} Quartos - `
  }

  if (houseDescription.details.bathrooms !== undefined) {
    description += `${houseDescription.details.bathrooms} Banheiros - `
  }

  if (houseDescription.details.suites !== undefined) {
    description += `${houseDescription.details.suites} Suites - `
  }

  if (houseDescription.details.garage !== undefined) {
    description += `${houseDescription.details.garage} Vagas`
  }

  if (description.endsWith(' - ')) {
    description = description.slice(0, -3)
  }

  return description
}

function truncateText(text: string) {
  if (text.length <= 150) {
    return text // Return the original text if it's 100 characters or less
  } else {
    return text.substring(0, 150) + '...' // Truncate the text and append '...'
  }
}
</script>

<style scoped lang="scss">
.destaques {
  background: var(--color-text);
  margin: 0 auto;
  color: white;
  padding: 7rem 2rem;
  margin-bottom: 7rem;
  text-align: center;
  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 7rem;
  }

  h3 {
    color: #ffffff;
    font-size: 40px;
    line-height: 1.3em;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 23px;
      margin-top: 2rem;
    }
  }

  p {
    margin-bottom: 1rem;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    @media (max-width: 768px) {
      flex-wrap: nowrap;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: space-around;
    }
  }

  &__card {
    &_principal {
      width: 50%;
      padding: 15px;
      border-radius: 16px;
      @media (max-width: 768px) {
        width: 100%;
        padding: 0;
        margin-bottom: 1rem;
      }
      &:hover {
        transform: scale(1.02);
        outline: 1px solid var(--color-background);
        outline-offset: 5px;
      }
      .cards_mais_buscados {
        width: 100%;

        margin: 0;
        @media (min-width: 768px) {
          height: 100%;
        }
      }
    }

    &_secundario {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      padding: 15px;
      @media (max-width: 768px) {
        width: 100%;
        padding: 0;
      }
    }

    &_slider {
      max-height: 21rem;
      border-radius: 16px;
      margin-bottom: 1rem;
      overflow: hidden;
      @media (max-width: 768px) {
        max-height: 10rem;
      }
      .carousel {
        max-height: 21rem;
        & img {
          max-height: 21rem;
        }
        @media (max-width: 768px) {
          max-height: 10rem;
          & img {
            max-height: 10rem;
          }
        }
      }
    }

    &_bottom {
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      height: 21rem;

      @media (max-width: 768px) {
        height: 50%;
      }
    }

    &_video {
      width: 50%;
      border-radius: 16px;
      margin-right: 1rem;
      &:hover {
        transform: scale(1.02);
        outline: 1px solid var(--color-background);
        outline-offset: 5px;
      }
      &:has(.opened):hover {
        transform: none;
        outline: none;
      }
      .video-thumbnail {
        border-radius: 16px;
      }
    }

    &_text {
      color: var(--color-text);
      background: var(--color-background);
      border-radius: 16px;
      text-align: left;
      padding: 1rem;
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex-wrap: nowrap;

      &:hover .icon svg {
        opacity: 1;
        transform: translateX(0);
      }
      &:hover {
        transform: scale(1.1);
      }

      .area {
        font-size: 40px;
        font-weight: 500;
        line-height: 1.3em;
      }
      .description {
        font-size: 14px;
        line-height: 1.8em;
      }
      .text {
        @media (max-width: 768px) {
          display: none;
        }
      }

      .icon {
        width: 100%;
        svg {
          color: #1a1a1a;
          background-color: #ffffff;
          border-radius: 50px;
          padding: 12px;
          float: right;
          font-size: 43px;
          position: unset;
          line-height: 0;
          transform: translateX(-100%);
          opacity: 0;
          transition: 0.2s;
        }
        &:hover {
          transform: scale(1.05);
        }
      }
      &.w100 {
        width: 100%;
      }
    }
  }
}
</style>

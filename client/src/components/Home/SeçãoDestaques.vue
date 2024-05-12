<template>
  <div class="destaques">
    <h3>Destaque dos destaques</h3>
    <p>Explore os imóveis mais exclusivos e desejados da nossa coleção:</p>
    <div class="destaques__wrapper">
      <div class="destaques__card_principal">
        <CardMaisBuscados :cardInfos="destaque" />
      </div>
      <div class="destaques__card_secundario">
        <div class="destaques__card_slider"><ImageSlider :imagens="destaque.images" /></div>
        <div class="destaques__card_bottom">
          <div class="destaques__card_video">
            <VideoPlayer :videoUrl="destaque.video" />
          </div>
          <div class="destaques__card_text">
            <div class="area">{{ destaque.details.area }}m²</div>
            <div class="description">
              {{ generateDescription(destaque) }}
            </div>
            <div class="text">{{ truncateText(destaque.description) }}</div>
            <div class="icon">
              <RouterLink :to="{ name: 'imovel', params: { id: destaque.id } }">
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
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import CardMaisBuscados from './CardMaisBuscados.vue'
import ImageSlider from '../Shared/ImageSlider.vue'
import VideoPlayer from '../Shared/VideoPlayer.vue'

const props = defineProps<{
  destaque: ImovelType
}>()

const destaque = ref(props.destaque)

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
      @media (max-width: 768px) {
        width: 100%;
        padding: 0;
        margin-bottom: 1rem;
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
        }
      }
    }
  }
}
</style>

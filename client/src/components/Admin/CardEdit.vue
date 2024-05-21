<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <span @click="close" class="close-modal">X</span>

          <div class="modal__images">
            <img :src="imovel?.mainImage" alt="Imagem Principal" class="main-image" />
            <div class="modal__images_blocks">
              <img :src="image" alt="" v-for="image in imovel?.images" :key="image" />
              <Icon icon="gridicons:create" width="8em" height="8em" />
            </div>
          </div>

          <div class="modal__selects">
            <div>
              <!-- Filtro por modelo -->
              <label for="modelo">Modelo</label>
              <select v-model="imovel.model" id="modelo" name="modelo">
                <option value="" selected>Selecione um modelo</option>
                <option value="Compra">Comprar</option>
                <option value="Alugar">Alugar</option>
              </select>
            </div>

            <div>
              <!-- Filtro por categoria -->
              <label for="categoria">Categoria</label>
              <select v-model="imovel.category" id="categoria" name="categoria">
                <option value="" selected>Selecione uma ategorias</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Area">Area</option>
                <option value="Condomínio">Condomínio</option>
                <option value="Galpão">Galpão</option>
              </select>
            </div>
          </div>

          <div class="modal__price">
            <label for="price">Valor</label>
            <input type="text" id="price" name="price" :value="imovel?.price" />
          </div>

          <div class="modal__monthly">
            <label for="monthly">Aluguel / Condomínio</label>
            <input type="text" id="monthly" name="monthly" :value="imovel?.monthly" />
          </div>

          <div class="modal__description">
            <label for="description">Descrição</label>
            <textarea id="description" name="description" :value="imovel?.description"></textarea>
          </div>

          <div class="modal__qtd">
            <div class="rooms input">
              <label for="rooms">Qtd. Quartos</label>
              <input type="text" id="rooms" name="rooms" :value="imovel?.details.rooms" />
            </div>
            <div class="bathrooms input">
              <label for="bathrooms">Qtd. Banheiros</label>
              <input
                type="text"
                id="bathrooms"
                name="bathrooms"
                :value="imovel?.details.bathrooms"
              />
            </div>
            <div class="suites input">
              <label for="suites">Qtd. Suites</label>
              <input type="text" id="suites" name="suites" :value="imovel?.details.suites" />
            </div>
            <div class="garage input">
              <label for="garage">Qtd. Vagas de Garagem</label>
              <input type="text" id="garage" name="garage" :value="imovel?.details.garage" />
            </div>

            <div class="terreno input">
              <label for="garage">Area Terreno / m²</label>
              <input type="text" id="garage" name="garage" :value="imovel?.details.area" />
            </div>
          </div>

          <div class="modal__buttons">
            <button @click="saveChanges()" type="button" class="save">Salvar Alterações</button>
            <button @click="close" type="button">Fechar</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, defineProps, defineEmits, watch } from 'vue'
import type { ImovelType } from '@/interfaces/interfaces'
import { ImoveisTeste } from '@/components/Shared/dataTest'

const props = defineProps<{
  modalActive: boolean
  cardInfos: ImovelType | undefined
}>()

const editableCard = ref<ImovelType | undefined>(undefined)
const imovel = ref(ImoveisTeste[0])

const emit = defineEmits(['close', 'save'])

const close = () => {
  emit('close')
}

const cloneCardInfos = () => {
  if (props.cardInfos) {
    editableCard.value = { ...props.cardInfos }
  }
}

function saveChanges() {}

watch(
  () => props.modalActive,
  (newValue) => {
    if (newValue) {
      cloneCardInfos()
    }
  }
)
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  .modal-inner {
    position: relative;
    max-width: 90%;
    /* width: 80%; */
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #212121;
    padding: 64px 16px;
    border-radius: 16px;
    overflow-y: scroll;
    max-height: 100%;

    i {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: crimson;
      }
    }

    button {
      padding: 20px 30px;
      border: none;
      font-size: 16px;
      background-color: crimson;
      color: #fff;
      cursor: pointer;
    }
  }

  p {
    color: black;
  }

  &__images {
    display: flex;
    justify-content: space-around;
    .main-image {
      width: 50%;
      border-radius: 16px;
    }

    svg {
      width: 16rem;
      height: auto;
      padding: 0 5rem;
      background: #0000003b;
      border-radius: 16px;
      margin: 10px;
    }

    &_blocks {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      img {
        width: 16rem;
        margin: 10px;
        border-radius: 16px;
      }
    }
  }

  &__selects {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    div {
      margin-right: 2rem;
    }
  }

  &__monthly {
    width: 40%;
  }

  .close-modal {
    color: white;
    background: crimson;
    font-weight: 600;
    padding: 1rem 2rem;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 16px 0 16px 0;
    cursor: pointer;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }

  &__qtd {
    display: flex;
    flex-wrap: wrap;

    .input {
      width: 12%;
      margin: 0 4rem 0 0;
    }
  }

  select {
    appearance: none;
    outline: 0;
    font: inherit;
    background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E);
    background-size: 0.6em;
    background-position: calc(100% - 1.3em) center;
    background-repeat: no-repeat;
    color: var(--color-text);
    cursor: pointer;
    display: block;
    padding: 0.75rem 1.29rem;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.9;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e9e9e9;
    appearance: none;
    border-radius: 12px;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    /* Remove IE arrow */
    &::-ms-expand {
      display: none;
    }
    /* Remove focus outline */
    &:focus {
      outline: none;
    }
    /* <option> colors */
    option {
      color: inherit;
      background-color: white;
    }

    /* Arrow */
    &::after {
      content: '\25BC';
      position: absolute;
      top: 0;
      right: 0;
      padding: 1em;
      background-color: #34495e;
      transition: 0.25s all ease;
      pointer-events: none;
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
    min-height: 14rem;
  }
}
</style>

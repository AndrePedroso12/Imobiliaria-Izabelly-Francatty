<template>
  <div class="quem_somos" id="sobre">
    <div class="quem_somos__image" v-motion-slide-visible-once-top>
      <img src="@/assets/h21.jpg" alt="" srcset="" />
    </div>
    <div class="quem_somos__texto" v-motion-slide-visible-once-top>
      <h1 class="title">Há mais de 8 anos no mercado imobiliario</h1>
      <p class="subtitle">
        Atuando no mercado imobiliário desde 2021 em mais de 8 cidades do Brasil, A imobiliaria
        Izabelly Francatti vem se especializando cada vez mais no desenvolvimento e comercialização
        de empreendimentos.
        <br />
        <br />
        E agora com um ponto novo ponto de atendimento para melhor atende-los, venha nós conhecer
        estamos localizados na Av. Francisco Sales Pires, 25 - Florianópolis.
      </p>
      <div class="icons">
        <div class="icon_line">
          <div class="icon"><Icon icon="iconoir:home-alt" width="2em" height="2em" /></div>
          <div class="text">
            <p>Há mais de 5 anos no mercado Imobiliário</p>
            <span
              >Atendendo em mais de 8 cidades pelo Brasil, nós atendemos desde pessoas físicas a
              grandes empresas.</span
            >
          </div>
        </div>
        <div class="icon_line">
          <div class="icon"><Icon icon="gis:search-home" width="2em" height="2em" /></div>
          <div class="text">
            <p>Atendimento Exclusivo</p>
            <span
              >Seu atendimento será sempre direto e exclusivo, seja presencial ou digital, prezamos
              pelo atendimento rápido e sempre buscar o melhor para nossos clientes.</span
            >
          </div>
        </div>
        <div class="icon_line">
          <div class="icon">
            <Icon icon="bitcoin-icons:two-keys-outline" width="2em" height="2em" />
          </div>
          <div class="text">
            <p>Chave na sua mão</p>
            <span
              >Com um atendimento prioritário, nós garantimos que seu imóvel esteja pronto para uso
              o mais rápido possível.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped lang="scss">
.quem_somos {
  display: flex;
  justify-content: space-between;
  padding: 7rem 3rem;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  &__image {
    width: 50%;
    margin-right: 1rem;
    @media (max-width: 768px) {
      width: 100%;
    }
    img {
      width: 100%;
    }
  }
  &__texto {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 768px) {
      width: 90%;
      margin: 0 auto;
    }

    .title {
      font-size: 40px;
      line-height: 1.3em;
      font-weight: 500;
      margin-bottom: 1rem;
      @media (max-width: 768px) {
        font-size: 23px;
        margin-top: 2rem;
      }
    }
    .subtitle {
      margin-bottom: 2rem;
    }
    .icons {
      .icon_line {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        width: 80%;
        margin-bottom: 2rem;
        .text {
          flex-grow: 1;
          padding-left: 20px;
          p {
            font-size: 21px;
            line-height: 1.3;
            margin: 0;
            font-weight: 500;
          }
        }

        .icon {
          flex-shrink: 0;
          margin-bottom: 18px;
          font-size: 19px;
          position: relative;
          z-index: 1;
          &:before {
            content: '';
            position: absolute;
            background: var(--color-background);
            width: 30px;
            height: 30px;
            bottom: 30px;
            left: -10px;
            -webkit-transition: all 0.2s ease-in-out 0s;
            -o-transition: all 0.2s ease-in-out 0s;
            transition: all 0.2s ease-in-out 0s;
            border-radius: 50%;
            z-index: -1;
          }
        }
      }
    }
  }
}
</style>

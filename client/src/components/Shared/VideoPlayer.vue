<template>
  <div class="video-thumbnail" :class="{ open: showModal }">
    <div class="video-box" :class="{ opened: showModal }">
      <button v-if="showModal" class="close-button" @click="closeModal()">X</button>

      <video
        loop
        :class="{ opened: showModal }"
        :controls="showModal || playVideo"
        :autoplay="showModal || playVideo"
        muted
        @click="openModal"
      >
        <source :src="videoUrl + '#t=1.5'" type="video/mp4" />
        <source :src="videoUrl" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </div>
    <div class="play-icon" @click="openModal" v-if="!playVideo">
      <Icon icon="solar:play-linear" width="1rem" height="1rem" />
    </div>
    <div v-if="showModal" class="modal-overlay" @click="closeModal()"></div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps<{
  videoUrl: string
  blockModal?: boolean
}>()

const { videoUrl } = props

const showModal = ref(false)
const playVideo = ref(false)
const blockModal = ref(props.blockModal || false)

const openModal = () => {
  if (blockModal.value) {
    playVideo.value = true
    return
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.video-thumbnail {
  position: relative;
  cursor: pointer;
  object-fit: cover;
  overflow: hidden;
  height: 100%;
}

.video-thumbnail.open {
  overflow: visible;
}

video {
  max-width: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: 0.2s;
}

video.opened {
  position: relative;
  border-radius: 16px;
  width: auto;
  background: black;
}

.video-box {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.2s;
  width: 100%;
}

.video-box.opened {
  position: fixed;
  z-index: 10;
  width: 50%;
  height: 50%;
  top: 20%;
  left: 27%;
  right: auto;
  border-radius: 16px;
  background: black;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #1a1a1a2b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-icon svg {
  width: 25px;
  height: 25px;
  fill: #fff;
  color: white;
}

.modal-overlay {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 80%;
  max-width: 800px;
  height: 80%;
  position: relative;
}

iframe {
  width: 100%;
  height: 450px;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-color: white;
  font-size: 20px;
  font-weight: 900;
  z-index: 12;
  border-radius: 0 16px 0 16px;
}
</style>

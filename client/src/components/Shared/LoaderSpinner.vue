<template>
  <div class="loader" id="loader-1"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}

#loader-1:before,
#loader-1:after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 10px solid transparent;
  border-top-color: var(--color-background);
  filter: drop-shadow(0px -3px 10px yellow);
}

#loader-1:before {
  z-index: 100;
  animation: spin 1s infinite;
}

#loader-1:after {
  border: 10px solid #ccc;
  filter: opacity(0.5);
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

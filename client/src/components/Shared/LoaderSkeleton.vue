<template>
  <div class="container">
    <div class="post">
      <div class="avatar"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div class="post">
      <div class="avatar"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div class="post">
      <div class="avatar"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
body {
  margin: 0;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post {
  width: 220px;
  height: 80px;

  .avatar {
    float: left;
    width: 52px;
    height: 52px;
    background-color: #ccc;
    border-radius: 25%;
    margin: 8px;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
    background-size: 600px;
    animation: shine-avatar 1.6s infinite linear;
  }
  .line {
    float: left;
    width: 140px;
    height: 16px;
    margin-top: 12px;
    border-radius: 7px;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
    background-size: 600px;
    animation: shine-lines 1.6s infinite linear;
  }
  .avatar + .line {
    margin-top: 11px;
    width: 100px;
  }
  .line ~ .line {
    background-color: #ddd;
  }
}

@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px;
  }
}
@keyframes shine-avatar {
  0% {
    background-position: -32px;
  }
  40%,
  100% {
    background-position: 208px;
  }
}
</style>

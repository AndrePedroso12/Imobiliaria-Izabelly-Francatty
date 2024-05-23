<template>
  <div class="account-container">
    <div class="info-box">
      <div class="user-info">
        <label for="">Nome</label>
        {{ userInfo.name }}
        <input type="number" v-model="userInfo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const userInfo = ref()
const props = defineProps<{
  user?: any
}>()

onMounted(async () => {
  userInfo.value = { ...props.user }
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
  select {
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
  .box-info {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>

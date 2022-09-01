<template>
  <div class="container" :class="show ? 'active' : ''">
    <div class="spinner">
      <div class="round"></div>
    </div>
  </div>
  <el-button @click="change">显示 / 隐藏</el-button>
</template>

<script setup>
import { ref } from "vue";
const show = ref(false);
const change = () => {
  show.value = !show.value;
};
</script>

<style scoped lang="less">
.container {
  background: white;
  transition: all 0.6s;
  opacity: 0;
  visibility: hidden;
}
.active {
  visibility: visible;
  opacity: 1;
}
.spinner {
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .round {
    width: 31%;
    height: 31%;
    background: transparent;
    border-radius: 50%;
    border: 10px dotted #1abc9c;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: loading 2s infinite ease-in-out;
  }
}
@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="shoesBox">
    <h2>
      通过 组件onBeforeRouteLeave路由钩子 + gasp动画库
      实现跨路由连续动画、pinia存储状态、延迟更新
    </h2>
    <el-button @click="router.push('/page1')">跳转页面1</el-button>
    <el-button @click="router.push('/page2')">跳转页面2</el-button>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style scoped>
.shoesBox {
  box-sizing: border-box;
  height: 90vh !important;
}
</style>

<template>
  <div>
    <h2>通过 组件onBeforeRouteLeave路由钩子 + gasp动画库 实现跨路由连续动画</h2>
    <el-button @click="router.push('/page1')">跳转页面1</el-button>
    <el-button @click="router.push('/page2')">跳转页面2</el-button>
    <router-view />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style scoped></style>

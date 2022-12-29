<template>
  <div>
    <h2>演示postMessage跨页面通信</h2>
    <el-link href="https://www.bilibili.com/video/BV1EP4y127wv/?spm_id_from=333.337.search-card.all.click">bibili</el-link>
  </div>
</template>

<script setup>
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
  onMounted,
} from "vue";
</script>

<style scoped lang="less"></style>

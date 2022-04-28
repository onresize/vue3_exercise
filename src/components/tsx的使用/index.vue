<template>
  <h2>vue3中tsx的基本使用</h2>
  <el-link
    href="https://blog.csdn.net/qq1195566313/article/details/123172735?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164923575116780357277226%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164923575116780357277226&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-15-123172735.nonecase&utm_term=vue3&spm=1018.2226.3001.4450"
    target="_blank"
    >博客参考:</el-link
  >

  <renderDom title="jsx通过props传参" @myClick="myClick"></renderDom>
  <br />
  <div>
    接收子组件的值：<el-tag>{{ allNum }}</el-tag>
  </div>
</template>

<script setup lang="ts">
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
} from "vue";
import renderDom from "./App.tsx";

let allNum = ref<number>(0);

const myClick = (num: number) => {
  console.log("接收到父组件传过来的值", num);
  allNum.value = num;
};
</script>

<style scoped></style>

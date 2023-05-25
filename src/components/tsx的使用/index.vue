<template>
  <div>
    <h2>vue3中tsx的基本使用</h2>
    <el-link
      href="https://blog.csdn.net/qq1195566313/article/details/123172735"
      target="_blank"
      >博客参考:</el-link
    >

    <renderDom title="jsx通过props传参" @myClick="myClick"></renderDom>
    <br />
    <div>
      接收子组件的值：<el-tag>{{ allNum }}</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
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

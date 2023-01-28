<template>
  <h2>唯一id两种形式</h2>
  <mark>1.第三方uuid模块 import { v4 as uuidv4 } from 'uuid'</mark>
  <br />
  <br />
  <mark>2.系统内置加密模块、直接使用 console.log(crypto.randomUUID())</mark>
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
} from "vue";

console.log("唯一id:", crypto.randomUUID());
</script>

<style scoped></style>

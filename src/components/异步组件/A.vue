<template>
  <div>
    <div v-for="(item, i) in List" :key="i">{{ item.name }}</div>
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
import Axios from "axios";
let {
  data: { list: List },
} = await Axios("./data.json");
console.log(List);
</script>

<style scoped></style>

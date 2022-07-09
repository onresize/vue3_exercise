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
let List = ref([]);

setTimeout(async () => {
  const res = await Axios("./data.json");
  console.log(res.data.list);
  List.value = res.data.list;
}, 200);
</script>

<style scoped></style>

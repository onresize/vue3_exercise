<template>
  <div>
    <h2 v-for="(item, i) in List" :key="i">{{ item.name }}</h2>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Axios from "axios";
let List = ref([]);

setTimeout(async () => {
  const res = await Axios("./data.json");
  console.log(res.data.list);
  List.value = res.data.list;
}, 200);
</script>

<style scoped></style>

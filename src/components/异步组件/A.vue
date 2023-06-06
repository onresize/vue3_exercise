<template>
  <el-card style="width: 200px; height: 268px;">
    <h3 v-for="(item, i) in List" :key="i">{{ item.name }}</h3>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import Axios from "axios";
let List = ref([]);

const getList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const res = await Axios(`./data.json?${Date.now()}`);
      console.log(res.data.list);
      resolve(res.data.list);
    }, 5000);
  });
};

List.value = await getList();
</script>

<style scoped></style>

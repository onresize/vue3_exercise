<template>
  <div>
    <h2>localStore设置过期时间</h2>
    <el-card v-for="({ message }, idx) in list" :key="idx">
      <el-input :value="message" placeholder=""></el-input>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Storage } from "./index.js";

let list = ref([]);

let storage = new Storage();

storage.setK("AAA", 123, Date.now() + 5000);

let tim = window.setInterval(() => {
  let r = storage.get("AAA");
  console.log(r);
  list.value.push(r);
  if (r.value == null) {
    clearTimeout(tim);
  }
}, 500);
</script>

<style scoped lang='less'>
</style>

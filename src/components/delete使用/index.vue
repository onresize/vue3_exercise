<template>
  <div class="delete-box">
    <h2>删除带children的数据</h2>
    <pre v-text="List.data"></pre>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import List from "@/data/list.json";

List.data.forEach((item) => {
  item.children && delete item.children;
});

console.log("修改后的List.json:", List.data);
</script>

<style scoped lang="less">
.delete-box {
  height: calc(100vh - 70px);
  overflow-y: scroll;
  pre {
    font-size: 20px;
    height: 100%;
  }
}
</style>

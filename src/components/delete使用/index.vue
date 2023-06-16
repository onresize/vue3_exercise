<template>
  <div class="mixinHeight">
    <div class="delete-box">
      <h2>删除带children的数据</h2>
      <pre v-text="List.data"></pre>
    </div>
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
  height: calc(100vh - 100px);
  overflow-y: auto !important;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: block !important;
  }
  pre {
    font-size: 20px;
    height: 100%;
    font-family: Source Code Pro, DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas, Inconsolata, Courier, monospace, PingFang SC;
  }
}
</style>

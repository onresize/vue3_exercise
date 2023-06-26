<template>
  <div class="mixinHeight">
    <h2>演示postMessage跨页面通信</h2>

    <div>
      <el-tag color="yellow" style="font-size: 23px">{{ PiniaStore.crossText || "null" }}</el-tag>
      <el-link class="link" href="https://www.bilibili.com/video/BV1EP4y127wv/?spm_id_from=333.337.search-card.all.click"> bibili参考 </el-link>
      <el-link class="link" href="https://juejin.cn/post/7041363060522975246/"> 掘金参考 </el-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMainStore } from "@/store/pinia.ts";

const PiniaStore = useMainStore();
</script>

<style scoped lang="less">
.link {
  margin: -15px 0 0 10px;
}
</style>

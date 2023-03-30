<template>
  <div>
    <h2>演示postMessage跨页面通信</h2>
    <div>
      <el-tag color="yellow" style="font-size: 23px">{{
        PiniaStore.crossText
      }}</el-tag>
    </div>
    <el-link
      href="https://www.bilibili.com/video/BV1EP4y127wv/?spm_id_from=333.337.search-card.all.click"
      >bibili</el-link
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMainStore } from "@/store/pinia.ts";

const PiniaStore = useMainStore();

</script>

<style scoped lang="less"></style>

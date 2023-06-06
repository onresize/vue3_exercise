<template>
  <el-skeleton style="width: 200px" :loading="loading" animated>
    <template #template>
      <el-card class="card">
        <div class="item_box">
          <el-skeleton-item variant="h3" style="width: 60%" />
        </div>
        <div class="item_box">
          <el-skeleton-item variant="h3" style="width: 60%" />
        </div>
        <div class="item_box">
          <el-skeleton-item variant="h3" style="width: 60%" />
        </div>
        <div class="item_box">
          <el-skeleton-item variant="h3" style="width: 60%" />
        </div>
        <div class="item_box">
          <el-skeleton-item variant="h3" style="width: 60%" />
        </div>
      </el-card>
    </template>
  </el-skeleton>
</template>

<script setup>
import { ref } from "vue";

const loading = ref(true);
const currentDate = new Date().toDateString();
</script>

<style scoped lang='less'>
.card {
  width: 200px;
  height: 268px;
}
.item_box {
  margin-top: 13px;
  height: 30px;
}
</style>

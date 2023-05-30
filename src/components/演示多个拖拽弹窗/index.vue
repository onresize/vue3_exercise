<template>
  <div class="box">
    <el-button class="btn" type="primary">弹窗0</el-button>
    <el-button class="btn" type="primary">弹窗1</el-button>
    <el-button class="btn" type="primary">弹窗2</el-button>
    <el-button class="btn" type="primary">弹窗3</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>

<style scoped lang='less'>
.box {
  border: 3px solid red;
  .btn {
    width: 70px;
    margin: 10px;
  }
}
</style>

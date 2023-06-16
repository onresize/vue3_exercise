<template>
  <el-card class="mixinHeight">
    <h3>常用grid布局</h3>
    <div class="grid_box">
      <div>0</div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>

<style scoped lang="less">
.grid_box {
  width: 600px;
  height: 500px;
  border: 4px solid red;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 30px;
  & > div {
    background: #444;
    display: grid;
    place-content: center;
    font-size: 30px;
    color: #fff;
  }
}
</style>

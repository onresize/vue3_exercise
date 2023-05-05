<template>
  <el-card class="p-card">
    <img :src="bgUrl" alt="#" v-lazy class="image" />
    <h3>img{{ $attrs.pIndex }}</h3>
  </el-card>
</template>

<script setup>
import { ref, reactive, useAttrs } from "vue";

const attrs = useAttrs();
// const getBg = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(attrs.pic);
//     }, 2000);
//   });
// };
// let bgUrl = await getBg();

const getBg = () => attrs.pic;
let bgUrl = getBg();
</script>

<style scoped lang="less">
.p-card {
  width: 230px;
  height: 300px;
  text-align: center;
  .image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>

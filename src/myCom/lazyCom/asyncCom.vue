<template>
  <div
    class="p-card"
    v-loading="imgLoading"
    element-loading-background="rgba(255, 255, 255, 1)"
  >
    <div class="t-box">
      <img
        :src="bgUrl"
        alt="#"
        v-lazy
        class="image"
        @load="imgLoad"
        @error="imgError"
      />
    </div>
    <h3>{{ $attrs.pTitle }}</h3>
  </div>
</template>

<script setup>
import { ref, reactive, useAttrs } from "vue";

const attrs = useAttrs();
const imgLoading = ref(false);

// const getBg = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(attrs.pic);
//     }, 1000);
//   });
// };

const getBg = () => attrs.pic;
let bgUrl = await getBg();

const imgError = () => {
  imgLoading.value = true;
  console.log("图片加载失败");
};
const imgLoad = () => {
  imgLoading.value = false;
  console.log("图片加载成功");
};
</script>

<style scoped lang="less">
.p-card {
  width: 230px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-around;
  text-align: center;

  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
  .t-box {
    width: 100%;
    height: 200px;
    display: grid;
    place-content: center;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  h3 {
    width: 100%;
    text-align: center;
  }
}
</style>

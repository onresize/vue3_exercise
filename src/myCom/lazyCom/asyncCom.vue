<template>
  <!-- v-loading="imgLoading" -->
  <div
    :class="[imgLoading ? 'loading-card' : 'info-card']"
    element-loading-background="rgba(255, 255, 255, 1)"
  >
    <div class="top skeleton">
      <img :src="bgUrl" alt v-lazy @load="imgLoad" @error="imgError" />
    </div>
    <div class="bottom skeleton">
      <h3 v-show="!imgLoading">{{ $attrs.pTitle }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, useAttrs } from "vue";

const attrs = useAttrs();
const imgLoading = ref(true);

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
.info-card {
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
  .top {
    width: 100%;
    height: 200px;
    display: grid;
    place-content: center;
  }
  .bottom {
    width: 100%;
    text-align: center;
  }
}

.loading-card {
  width: 230px;
  height: 300px;
  border-radius: 25px;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;

  .top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 70%;
    background: #e2e5e7;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;
  }

  .bottom {
    position: absolute;
    top: 77%;
    left: 0;
    width: 100%;
    height: 70px;
    border-radius: 0 0 25px 25px;
    background: #e2e5e7;
    box-sizing: border-box;
  }

  .skeleton {
    background-image: linear-gradient(
      45deg,
      rgba(241, 242, 243, 0.6) 0%,
      rgba(241, 242, 243, 0.6) 40%,
      #f7f7f7 50%,
      #f7f7f7 55%,
      rgba(241, 242, 243, 0.6) 66%,
      rgba(241, 242, 243, 0.6) 100%
    );
    background-size: 400%;
    animation: shine 2s linear infinite;
  }

  @keyframes shine {
    from {
      background-position: 100%;
    }

    to {
      background-position: 0;
    }
  }
}
</style>

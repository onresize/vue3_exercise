<script setup>
import { reactive } from "vue";
import MaskSwipe from "@/myCom/swipe/index.vue";

import img1 from "@/assets/swipe/img/1.jpg";
import img2 from "@/assets/swipe/img/2.jpg";
import img3 from "@/assets/swipe/img/3.jpg";
import img4 from "@/assets/swipe/img/4.jpg";
import maskImage from "@/assets/swipe/mask4.png";

import img11 from "@/assets/swipe/1.png";
import img22 from "@/assets/swipe/2.png";
import img33 from "@/assets/swipe/3.png";
import img44 from "@/assets/swipe/4.png";
import maskImage1 from "@/assets/swipe/mask.png";

const state = reactive({
  showBlackBg: true,
});

const changeBg = () => {
  state.showBlackBg = !state.showBlackBg;
};
</script>

<template>
  <div class="flex_box">
    <div class="box">
      <div class="circle" :style="{ transform: state.showBlackBg ? 'scale(18)' : 'scale(0)' }"></div>
      <el-button class="btn" @click="changeBg">{{ !state.showBlackBg ? "dark" : "light" }}</el-button>
    </div>
    <MaskSwipe
      :duration="3"
      :transition-duration="1"
      :img-list="[img1, img2, img3, img4]"
      maskPositionFrom="left"
      maskPositionTo="right"
      :mask-image-url="maskImage"
      class="swipe_box"
    />

    <MaskSwipe
      :duration="3"
      :transition-duration="1"
      :img-list="[img11, img22, img33, img44]"
      maskPositionFrom="left"
      maskPositionTo="right"
      :mask-image-url="maskImage1"
      indicator-position="right"
      class="swipe_box"
    />
  </div>
</template>

<style scoped>
.flex_box {
  display: flex;

  .box {
    width: 400px;
    height: 300px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    background-color: #22272e;
    transition: 0.3s;

    .circle {
      transition: transform 0.6s linear;
      width: 70px;
      height: 70px;
      margin: 120px 70px;
      border-radius: 50%;
      background-color: #fff;
    }
  }

  .btn {
    width: 70px;
    position: absolute;
    z-index: 10;
    inset: 0;
    margin: auto 70px;
    color: #606266;
    border-color: #606266;
    transition: all 0.4s linear;
    /* background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%); */

    &:hover {
      color: #03ac66;
      border-color: #03ac66;
      filter: drop-shadow(0px 0 62px #00bf72);
    }
  }

  .swipe_box {
    width: 500px;
    margin: 0 20px;
  }
}
</style>

<script>
import publicFunc from "@/mixins/publicFunc";

export default {
  mixins: [publicFunc],
};
</script>

<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import { shuffle } from "lodash";
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
  isChangeTxt: false,
  shuffleTimiing: "", // 定时器
  // 背景图
  bgList: ["bar_y", "bar_x", "line_gradient", "line", "funnel", "heatmap", "map", "pie", "radar"],
});

// 打乱
const shuffleHandle = () => {
  state.shuffleTimiing = setInterval(() => {
    state.bgList = shuffle(state.bgList);
    console.log("轮询打乱：", state.bgList);
  }, 3000);
};

const changeBg = () => {
  state.showBlackBg = !state.showBlackBg;
  if (!state.isChangeTxt) {
    setTimeout(() => {
      state.isChangeTxt = true;
    }, 600);
  } else {
    state.isChangeTxt = false;
  }
};

onMounted(() => {
  shuffleHandle();
});
onUnmounted(() => {
  clearTimeout(state.shuffleTimiing);
});
</script>

<template>
  <div class="flex_box">
    <div class="box">
      <div class="circle" :style="{ transform: state.showBlackBg ? 'scale(18)' : 'scale(0)' }"></div>
      <el-button :class="['btn', state.showBlackBg ? 'darkColor' : 'lightColor']" @click="changeBg">
        <svg-icon v-if="state.isChangeTxt" name="moon" style="margin-right: 5px" />
        <svg-icon v-else name="sun" style="margin-right: 5px" />
        {{ state.isChangeTxt ? "dark" : "light" }}
      </el-button>
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

  <div class="imgBox">
    <div class="bg-img-box" v-for="(item, idx) in state.bgList" :key="item">
      <transition-group tag="div" name="coder">
        <img :src="getImageUrl(item, 'charts')" :key="item" :alt="`chart${idx}`" />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="less">
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

  .darkColor {
    color: #000 !important;
  }

  .lightColor {
    color: #fff !important;
  }

  .btn {
    width: 70px;
    position: absolute;
    z-index: 10;
    inset: 0;
    margin: auto 70px;
    color: #606266;
    border-color: #606266;
    background-color: transparent;
    transition: all 0.4s linear;
    /* background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%); */

    &:hover {
      color: #03ac66 !important;
      font-weight: 400;
      border-color: #03ac66;
      filter: drop-shadow(0px 0 62px #00bf72);
    }
  }

  .swipe_box {
    width: 500px;
    margin: 0 20px;
  }
}

.imgBox {
  margin-top: 30px;
  width: 730px;
  height: 530px;
  border: 2px solid red;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  .bg-img-box {
    width: 230px;
    height: 164px;
    border-radius: 5px;
    border: 2px solid black;

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      user-select: none;
    }
  }
}

.coder-enter-from,
.coder-leave-to {
  opacity: 0;
}

.coder-move {
  transition: transform 1s ease;
}
</style>

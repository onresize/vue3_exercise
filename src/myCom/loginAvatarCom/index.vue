<script setup>
import { reactive } from "vue";

const state = reactive({
  showMask: false,
});

const toggleClick = () => {
  state.showMask = !state.showMask;
};

const toggleClickTrue = () => {
  state.showMask = true;
};
const toggleClickFalse = () => {
  state.showMask = false;
};

defineExpose({
  toggleClick,
  toggleClickTrue,
  toggleClickFalse,
});
</script>

<template>
  <div class="_98d1fd92">
    <button class="_53b86379 _79c95847" :class="[state.showMask ? 'transformY' : '']" @click="toggleClick">
      <div class="_97329910">
        <img alt="" role="presentation" src="https://static-production.npmjs.com/97ce287600f35d9d5f2ed500630bb0ad.png" class="npm_logo" />
      </div>
      <div class="_6e1e0509"></div>
      <div class="_2dd7f49e"></div>
    </button>
    <div class="ani_box">
      <div class="bac87ec6">
        <button class="_83938fda _79c95847">
          <div class="_33c43af5">
            <div class="e7114814">
              <!-- 圆眼 -->
              <img src="https://static-production.npmjs.com/a39ceb9e9ad640f4de8eee094063d890.png" alt="" role="presentation" class="bizi_img bz_img0" />

              <!-- 咪咪眼 -->
              <img src="https://static-production.npmjs.com/ecc2a793db0bd5966246e970f9c9ff5e.png" alt="" role="presentation" class="bizi_img bz_img1" />

              <!-- 笑眼 -->
              <img src="https://static-production.npmjs.com/6bf09f9948c3044dbb2c7ed8b85098dc.png" alt="" role="presentation" class="bizi_img bz_img2" />
            </div>
          </div>
          <img alt="" role="presentation" src="https://static-production.npmjs.com/c9e19250d48d66f0e9c70c9b3991bbdb.png" class="body_img" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.npm_logo {
  width: 102px;
  height: 42px;
}

.bizi_img {
  user-select: none;
  cursor: grab;
  width: 66px;
  height: 45px;
  position: absolute;
  z-index: 2;
  left: 65px;
  top: 108px;
}

.body_img {
  user-select: none;
  cursor: grab;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 0;
  top: 15px;
}

.bz_img1,
.bz_img2 {
  display: none !important;
}

._98d1fd92 {
  background: transparent;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  overflow: hidden;
  position: relative;
  transition: background 200ms ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* Fix for Safari */
  -webkit-clip-path: circle(100px at center);
}

._98d1fd92:hover {
  .bz_img2 {
    display: block !important;
  }

  .bz_img0,
  .bz_img1 {
    display: none !important;
  }
}

._98d1fd92 * {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

._98d1fd92._0c752f11 {
  background-color: #999;
}

.ani_box {
  height: 100%;
  animation-name: left_to_right;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  transform: rotate(-5deg);
  transition-timing-function: ease;
  transform-origin: center bottom;
  will-change: transform;
}

.bac87ec6 {
  animation-name: bottom_to_top;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  transition-timing-function: ease;
  will-change: transform;
}

@keyframes left_to_right {
  0% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(4deg);
  }

  100% {
    transform: rotate(-4deg);
  }
}

@keyframes bottom_to_top {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-1px);
  }

  100% {
    transform: translateY(0);
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  ._98d1fd92 {
    transition: none;
  }

  .ani_box,
  .bac87ec6 {
    animation-name: a798d89c;
    animation-name: _3bd2fb14;
  }

  .ani_box {
    transform: rotate(0deg);
  }
}

._53b86379 {
  background: #333333;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 300px;
  left: 0;
  position: absolute;
  top: -290px;
  transform: translateY(0);
  transition: transform 300ms ease;
  width: 100%;
  z-index: 1;
}

.transformY {
  transform: translateY(52%);
}

._6e1e0509 {
  background: rgba(255, 255, 255, 0.1);
  bottom: 0;
  height: 10px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
}

._2dd7f49e {
  background: #ccc;
  bottom: -2px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.1);
  height: 8px;
  left: 50%;
  margin-left: -15px;
  position: absolute;
  width: 30px;
  z-index: 2;
}

._97329910 {
  bottom: 20%;
  left: 50%;
  margin-left: -50px;
  opacity: 1;
  position: absolute;
  width: 100px;
}

/**
 * Modifiers
 */

._53b86379.c1229923 {
  transform: translateY(52%);
}

/**
 * Accessibility
 */

@media screen and (prefers-reduced-motion: reduce) {
  ._53b86379 {
    transition: none;
  }
}
</style>

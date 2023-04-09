<script setup>
import { ref } from "vue";
const isPlay = ref(false);
const flyHeight = ref("1.00");
const txtGreen = ref(false);
const txtOrange = ref(false);
let timer;
function playGame() {
  if (isPlay.value) return;
  isPlay.value = true;
  let targetFlyHeight = 0;
  if (Math.random() > 0.5) {
    targetFlyHeight = (2 + Math.random() * 2).toFixed(2);
    txtOrange.value = true;
  } else {
    targetFlyHeight = (1 + Math.random() * 1).toFixed(2);
    txtGreen.value = true;
  }

  let d = targetFlyHeight * 100 - flyHeight.value * 100;

  let step = () => {
    flyHeight.value = ((+flyHeight.value * 100 + d * 0.05) / 100).toFixed(2);
    if (flyHeight.value > targetFlyHeight) {
      flyHeight.value = (+targetFlyHeight).toFixed(2);
      AnimationFrame(timer);
      timer = null;
    }
    timer = window.requestAnimationFrame(step);
  };
  step();
}
function resetGame() {
  cancelAnimationFrame(timer);
  timer = null;
  flyHeight.value = "1.00";
  isPlay.value = false;
  txtGreen.value = false;
  txtOrange.value = false;
}
</script>

<template>
  <div class="game-box">
    <div class="rocker-warrper" :class="[{ active: isPlay }]">
      <div class="rocker"></div>
      <div class="boom"></div>
    </div>
    <h1 :class="[{ green: txtGreen }, { orange: txtOrange }]">
      {{ flyHeight }}x
    </h1>
  </div>
  <div class="btn-box">
    <button @click="playGame">开始</button>
    <button @click="resetGame">重置</button>
  </div>
</template>

<style scoped lang="less">
.game-box {
  width: 600px;
  height: 400px;
  position: relative;
  background-color: #546;
  overflow: hidden;
  box-sizing: border-box;
  padding: 15px 0;

  h1 {
    font-size: 48px;
    text-align: center;
    position: relative;
    z-index: 9;
    color: hsl(0, 0%, 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
    transform: 10.5s color;
    &.green {
      color: hsl(100, 77%, 58%);
    }
    &.orange {
      color: hsl(30, 95%, 57%);
    }
  }
}

.rocker-warrper {
  position: absolute;
  bottom: 5%;
  left: 50%;
  width: 64px;
  height: 216.5px;
  .rocker {
    background-image: url("./fly/assets/fly.png");
    background-position: 0 0;
    width: 100%;
    height: 100%;
    margin-left: -32px;
    animation: 0.2s steps(1, start) rocker-run infinite,
      2s linear shakeX infinite;
  }
  .boom {
    background-size: 100% 100%;
    position: absolute;
    width: 300px;
    height: 300px;
    left: 50%;
    margin-left: -180px;
    top: -80px;
    z-index: 9;
    display: none;
    animation: 0.5s steps(1, start) boom-run forwards;
    animation-delay: 0.3s;
  }
  &.active {
    animation: 0.3s fly ease-in forwards;
    .rocker {
      animation: 0.2s steps(1, start) rocker-run infinite,
        2s linear shakeX infinite, 0.3s fly-hide ease-in forwards;
    }
    .boom {
      display: block;
    }
  }
}

@keyframes fly-hide {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes boom-run {
  0% {
    background-image: url("./fly/assets/boom2.png");
  }
  20% {
    background-image: url("./fly/assets/boom3.png");
  }
  40% {
    background-image: url("./fly/assets/boom4.png");
  }
  60% {
    background-image: url("./fly/assets/boom5.png");
  }
  80% {
    background-image: url("./fly/assets/boom6.png");
  }
  100% {
    background-image: url("./fly/assets/boom7.png");
  }
}

@keyframes shakeX {
  0%,
  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-2px, 1px, 0);
    transform: translate3d(-2px, 1px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(2px, -1px, 0);
    transform: translate3d(2px, -1px, 0);
  }
}

@keyframes rocker-run {
  0% {
    background-position: 0 0;
  }
  33% {
    background-position: calc(64px * -3) 0;
  }
  66% {
    background-position: calc(64px * -4) 0;
  }
  100% {
    background-position: calc(64px * -5) 0;
  }
}

@keyframes fly {
  0% {
    bottom: 5%;
  }
  100% {
    bottom: 65%;
  }
}

.btn-box {
  margin-top: 20px;
  display: flex;
  align-items: center;
  button {
    width: 100px;
    height: 36px;
    cursor: pointer;
    margin: 0 10px;
    background-color: #333;
    color: #fff;
    transition: 0.2s all;
    font-size: 0.8em;
    display: block;
    &:hover {
      background-color: rgb(255, 197, 38);
      color: #333;
      font-weight: bold;
      font-size: 1em;
    }
  }
}
</style>

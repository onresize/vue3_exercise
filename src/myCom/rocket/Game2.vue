<script setup>
import FlyGame from "./fly2";
import { ref, onMounted } from "vue";

let g = 0.00001
let vy = 0.005;
let st, nt, timer;

const flyGameRef = ref(null);
let flyGame;
onMounted(() => {
  flyGame = new FlyGame({
    canvas: flyGameRef.value,
  });
});

function playGame() {
  if (flyGame.isPlay) return;
  flyGame.reset();
  flyGame.play();
  st = new Date();
  window.requestAnimationFrame(step);
}

function stopGame() {
  cancelAnimationFrame(timer);
  vy = 0.01;
  flyGame.over();
}

function step() {
  let nt = new Date();
  if (nt - st >= 16) {
    st = nt;
    vy += g;
    let multipler = flyGame.flyHeight + vy;
    let data = {
      multipler,
      timestamp: new Date(),
    };
    flyGame.targetFlyHeight = data.multipler;
    flyGame.nowTime = data.timestamp;
    flyGame.setData(data);
  }
  timer = window.requestAnimationFrame(step);
}
</script>

<template>
  <canvas ref="flyGameRef" class="fly-game"></canvas>
  <div class="btn-box">
    <button @click="playGame">开始</button>
    <button @click="stopGame">结束</button>
    <!-- <button @click="playBoom">爆炸</button>
    <button @click="resetGame">重置</button> -->
  </div>
</template>

<style scoped lang="less">
.fly-game {
  touch-action: none;
  width: 900px;
  height: 600px;
  display: block;
  cursor: inherit;
  font-family: proxima-nova, sans-serif;
  border: 1px solid #333;
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

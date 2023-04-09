<script setup>
import FlyGame from "./fly";
import { ref, onMounted } from "vue";

const flyGameRef = ref(null);
let flyGame;
let timer;
onMounted(() => {
  flyGame = new FlyGame({
    canvas: flyGameRef.value,
  });
});

function playGame() {
  resetGame();
  flyGame.setPayList([
    {
      fly_height: 1.15,
      profit: 12.12,
    },
    {
      fly_height: 1.2,
      profit: -5,
    },
    {
      fly_height: 1.3,
      profit: 8.4,
    },
        {
      fly_height: 1.46,
      profit: 2.4,
    },
    {
      fly_height: 1.6,
      profit: 12.4,
    },
    {
      fly_height: 2.5,
      profit: 24.45,
    },
  ]);
  flyGame.play();
}

function playBoom() {
  clearInterval(timer);
  if (!flyGame.isPlay) return;
  flyGame.over();
}

function resetGame() {
  clearInterval(timer);
  flyGame.reset();
}
</script>

<template>
  <canvas ref="flyGameRef" class="fly-game"></canvas>
  <div class="btn-box">
    <button @click="playGame">开始</button>
    <button @click="playBoom">爆炸</button>
    <button @click="resetGame">重置</button>
  </div>
</template>

<style scoped lang="less">
.fly-game {
  touch-action: none;
  width: 950px;
  height: 650px;
  display: block;
  cursor: inherit;
  background-color: rgb(23, 0, 9);
  font-family: "Microsoft YaHei", serif;
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

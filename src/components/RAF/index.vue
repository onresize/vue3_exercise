<script setup>
import { reactive, nextTick } from "vue";
const state = reactive({
  number: 0,
});

const loopAdd = () => {
  state.number++;
  if (state.number >= 10000) return;
  window.requestAnimationFrame(loopAdd);
};

nextTick(() => {
  window.requestAnimationFrame(loopAdd);
});
</script>

<template>
  <div class="card">
    <h3>动画帧requestAnimationFrame（RAF）</h3>
    <h2>{{ state.number }}</h2>
  </div>
</template>

<style scoped>
.card {
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  padding: 10px;
}
</style>

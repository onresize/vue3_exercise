<template>
  <div>
    <el-button @click="addNum">添加数字</el-button>
    <el-button @click="removeNum">删除数字</el-button>
    <el-button @click="shuffleNum">数字洗牌</el-button>

    <transition-group tag="h1" name="coder">
      <span v-for="item in numbers" :key="item" class="item">{{ item }}</span>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
import _ from "lodash";

const numbers = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const numCounter = ref(10);

function addNum() {
  numbers.value.splice(
    randomIndex(),
    0,
    numCounter.value++
  );
}
function removeNum() {
  numbers.value.splice(randomIndex(), 1);
}
function shuffleNum() {
  numbers.value = _.shuffle(numbers.value);
}
function randomIndex() {
  return Math.floor(Math.random() * numbers.value.length);
}
</script>

<style scoped>
.item {
  margin-right: 10px;
  display: inline-block;
}

.coder-enter-from,
.coder-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.coder-enter-active,
.coder-leave-active {
  transition: all 1s ease;
}

.coder-leave-active {
  position: absolute;
}

.coder-move {
  transition: transform 1s ease;
}
</style>

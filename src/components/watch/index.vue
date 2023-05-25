<template>
  <h2>watch基本使用</h2>
  <el-input v-model="value1" style="width: 150px"></el-input>
  <el-input v-model="value2" style="width: 150px"></el-input>
  <el-input v-model="value3.name" style="width: 150px"></el-input>
  <el-input v-model="value3.age" style="width: 150px"></el-input>
  <el-button type="primary" @click="stopWatch">watchEffect停止监听</el-button>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect } from "vue";
let value1 = ref<string>("小米");
let value2 = ref<string>("苹果");
let value3 = reactive({
  name: "张三",
  age: 16,
});

// 1.监听一个值
// watch(value1, (newVal, oldVal) => {
//   console.log("监听一个新值：", newVal);
//   console.log("监听一个旧值：", oldVal);
// });

// 2.监听多个值
// watch([value1, value2], (newVal, oldVal) => {
//   console.log("两个值的新值", newVal);
//   console.log("两个值的旧值", oldVal);
// });

// 3.监听整个对象、watch第三个参数 deep:true | immediate:true
// 监听对象中某个属性、watch第一个参数写成函数形式
// watch(
//   () => value3.name,
//   (newVal, oldVal) => {
//     console.log("对象新值", newVal);
//     console.log("对象旧值", oldVal);
//   },
//   {
//     immediate: true, // 立即监听
//     deep: true, // 深度监听、deep形式下监听不到旧值、vue的bug
//   }
// );

// 高级监听watchEffect、默认立即执行、
const stop = watchEffect((beforeStop) => {
  console.log("监听value2", value2.value);
  console.log("监听value3.name", value3.name);
  // 这个回调函数可以监听之前处理一些逻辑、例如：防抖
  beforeStop(() => {
    console.log("监听之前触发----");
  });
});

const stopWatch = () => {
  stop();
  console.log("停止监听----");
};
</script>

<style scoped></style>

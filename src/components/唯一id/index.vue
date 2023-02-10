<template>
  <h2>唯一id两种形式</h2>
  <mark>1.第三方uuid模块 import { v4 as uuidv4 } from 'uuid'</mark>
  <br />
  <br />
  <mark>2.系统内置加密模块、直接使用 console.log(crypto.randomUUID())</mark>
</template>

<script setup>
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import { reactive, onMounted } from "vue";

// console.log("唯一id:", crypto.randomUUID());
let obj = reactive({ arr: [1, 2, 3, 4, 5, 6] });

// 写多个if判断时、if内部有定时器、return放定时器内外的区别
onMounted(() => {
  for (let i = 0; i < obj.arr.length; i++) {
    if (obj.arr[i] == 1) {
      setTimeout(() => {
        console.log(111111);
      }, 1000);
      return;
    }
    if (obj.arr[i] == 2) {
      console.log(222222);
    }
    if (obj.arr[i] == 3) {
      console.log(333333);
    }
  }
});
</script>

<style scoped></style>

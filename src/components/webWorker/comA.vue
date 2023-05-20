<template>
  <div>
    <h3>
      <el-tag type="warning">场景一</el-tag>
      使用webWorker自定义子线程计算、不消耗主线程
    </h3>
    <el-input v-model="val1" type="number" class="ipt"></el-input> *
    <el-input v-model="val2" type="number" class="ipt"></el-input>
    <el-button class="btn" @click="toWorkerMessage">=</el-button>
    <el-input
      v-model="resNum"
      type="number"
      class="ipt"
      disabled
      v-loading="isLoading"
    ></el-input>
  </div>
</template>

<script setup>
import { ref } from "vue";

const val1 = ref(1234567890);
const val2 = ref(9876543210);
const resNum = ref("");
const isLoading = ref(false);

// 主线程、comAworker.js在public文件夹下
const worker = new Worker("/public/js/comAworker.js");

const toWorkerMessage = () => {
  isLoading.value = true;
  worker.postMessage({
    type: "Multiplication",
    data: {
      num1: val1.value,
      num2: val2.value,
    },
  });
};

worker.addEventListener("message", (e) => {
  console.log("监听到子线程消息：", e);
  const { type, data } = e.data;
  if (type === "Multiplication") {
    isLoading.value = false;
    resNum.value = data;
  }
});
</script>

<style scoped lang='less'>
.ipt {
  width: 200px;
}
.btn {
  margin: 0 10px;
}
</style>

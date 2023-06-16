<template>
  <div class="mixinHeight">
    <h3>
      <el-input
        autosize
        disabled
        type="textarea"
        value="Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker线程在后台运行，两者互不干扰。等到 Worker线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被Worker 线程负担了，主线程（通常负责 UI交互）就会很流畅，不会被阻塞或拖慢
        "
      >
      </el-input>
    </h3>
    <el-card class="pCard">
      <ComA />
    </el-card>

    <el-card class="pCard">
      <ComB />
    </el-card>

    <el-card class="pCard">
      <ComC />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ComA from "./comA.vue";
import ComB from "./comB.vue";
import ComC from "./comC.vue";
</script>

<style scoped lang="less">
.pCard {
  margin: 10px 0;
}
</style>

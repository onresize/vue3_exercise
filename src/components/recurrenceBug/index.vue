<template>
  <div class="flex">
    <div class="left">
      <el-button
        type="primary"
        :plain="!PiniaStore.isShowRightChart"
        @click="toggle"
      >
        点击切换
      </el-button>
    </div>
    <div class="right">
      <ComB></ComB>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "@/store/pinia.ts";
import ComB from "./comB.vue";

const PiniaStore = useMainStore();

const toggle = async () => {
  PiniaStore.changeRightChartShow(!PiniaStore.isShowRightChart);
};
</script>

<style scoped lang='less'>
.flex {
  display: flex;
  justify-content: space-between;
  .left {
    box-sizing: border-box;
    width: 200px;
    height: 100%;
    padding: 10px;
    border: 5px solid red;
  }
  .right {
    box-sizing: border-box;
    flex: 0.3;
    height: 100%;
    padding: 10px;
    border: 5px solid green;
  }
}
</style>

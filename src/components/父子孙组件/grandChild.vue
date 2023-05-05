<template>
  <div
    class="grandChild-box"
    :style="{ backgroundColor: PiniaStore.grandchildColor, color: pColor }"
    @mouseover="mouseoverClick"
    @mouseout="mouseoutClick"
  >
    <h2>孙组件: {{ $attrs.age }}</h2>
  </div>
</template>

<script setup>
import { ref, reactive, useAttrs } from "vue";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";

const attrs = useAttrs();
// console.log("孙组件拿到祖组件绑定的属性：", attrs);

const PiniaStore = useMainStore(pinia);

const pColor = ref("#000");

const mouseoverClick = (e) => {
  e.stopPropagation(); // 阻止向上冒泡
  e.preventDefault(); // 阻止向下默认事件
  // console.log("孙组件鼠标移入：");
  PiniaStore.grandchildColor = "#4dff4d";
  pColor.value = "#fff";
};
const mouseoutClick = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // console.log("孙组件鼠移出：");
  PiniaStore.grandchildColor = "#fff";
  pColor.value = "#000";
};
</script>

<style scoped lang="less">
.grandChild-box {
  width: 300px;
  height: 100px;
  border-radius: 10px;
  border: 3px solid green;
  cursor: help;
  transition: all 0.6s ease-out;
  h2 {
    width: 100%;
    text-align: center;
  }
}
</style>

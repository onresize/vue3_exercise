<template>
  <div
    class="child-box"
    :style="{ backgroundColor: PiniaStore.childColor, color: pColor }"
    @mouseover="mouseoverClick"
    @mouseout="mouseoutClick"
  >
    <h2>子组件: {{ attrs.age }}</h2>
    <template v-for="(item, key, i) in slots" :key="i">
      <slot :name="key"></slot>
    </template>
    <!-- vue3标签上使用 $attrs或者 js定义的 attrs 拿到父组件绑定的属性-->
    <grandChild v-bind="attrs"></grandChild>
  </div>
</template>

<script setup>
import { ref, reactive, watch, useAttrs, useSlots } from "vue";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";
import grandChild from "./grandChild.vue";

const attrs = useAttrs();
// console.log("子组件拿到父组件绑定的属性：", attrs);

const slots = useSlots();
console.log("子组件拿到父组件中定义的slots：", slots);

const PiniaStore = useMainStore(pinia);

const pColor = ref("#000");

const mouseoverClick = (e) => {
  e.stopPropagation(); // 阻止向上冒泡
  e.preventDefault(); // 阻止向下默认事件
  // console.log("子组件鼠标移入：");
  PiniaStore.childColor = "#def2fa";
  pColor.value = "#fff";
};
const mouseoutClick = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // console.log("子组件鼠标移出：");
  PiniaStore.childColor = "#fff";
  pColor.value = "#000";
};
</script>

<style scoped lang="less">
.child-box {
  width: 400px;
  height: 400px;
  border: 3px solid skyblue;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: move;
  transition: all 0.6s ease-out;
  h2 {
    width: 100%;
    text-align: center;
  }
}
</style>

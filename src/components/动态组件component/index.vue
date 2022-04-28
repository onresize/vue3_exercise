<template>
  <h3>动态组件</h3>
  <div class="container">
    <div
      @click="switchClick(item)"
      :key="i"
      v-for="(item, i) in tabs"
      class="div_box"
    >
      {{ item.name }}
    </div>
  </div>
  <component :is="current.comName"></component>
</template>

<script setup lang="ts">
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import { ref, reactive, computed, watch, watchEffect, markRaw } from "vue";
import A from "./A.vue";
import B from "./B.vue";

type otherTab = {
  name: string;
  comName: any;
};
type Com = Pick<otherTab, "comName">;

let tabs = reactive<otherTab[]>([
  // 这里设置markRaw、为了让组件不被代理、节约性能
  {
    name: "组件A",
    comName: markRaw(A),
  },
  {
    name: "组件B",
    comName: markRaw(B),
  },
]);
let current = reactive<Com>({
  comName: tabs[0].comName,
});
[];

const switchClick = (item: otherTab) => {
  current.comName = item.comName;
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .div_box {
    width: 100px;
    margin: 10px;
    cursor: pointer;
    border: 1px solid #000000;
    border-radius: 10px;
    text-align: center;
  }
}
</style>

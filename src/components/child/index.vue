<template>
  <h3>父组件拿到子组件的title值--{{ childTitle }}</h3>
  <child ref="childRef1" :list="list" @getTitle="getChild" />
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import child from "./child.vue";

let childTitle = ref<string>("默认值");
type obj = {
  name: string;
  title: string;
};
// 定义ref拿到子组件的属性和方法、名字要和标签定义的ref名称一致、搭配子组件暴露defineExpose使用
let childRef1 = ref();
let list = reactive<obj[]>([
  { name: "A", title: "这是子组件A" },
  { name: "B", title: "这是子组件B" },
  { name: "C", title: "这是子组件C" },
]);
const getChild = (e: string) => {
  childTitle.value = e;
};
onMounted(() => {
  // 通过ref调用子组件中定义的方法
  childRef1.value.getAA();
});
</script>

<style scoped></style>

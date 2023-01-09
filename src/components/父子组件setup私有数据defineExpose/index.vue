<template>
  <h3>vue2和vue3两种私有属性方式展现、看console</h3>
  <hr>
  <Child ref="ChildRef"></Child>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Child from "./child.vue";

const ChildRef = ref();

onMounted(() => {
  console.log("父组件拿到私有数据：", ChildRef.value.privateCom2);
  console.log("父组件拿到公有数据：", ChildRef.value.privateCom1);
});
</script>

<style scoped></style>

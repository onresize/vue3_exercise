<template>
  <div>
    <h2>{{ `全局变量app.config.globalProperties.$env -->  ${$env}` }}</h2>
    <h3>{{ $filters.format('vue3移除过滤器filters属性') }}</h3>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { appContext } = <ComponentInternalInstance>getCurrentInstance();
console.log("setup中拿到全局变量 -->", appContext.config.globalProperties.$env);
// console.log("环境变量", import.meta.env.VITE_TITLE);

</script>

<style scoped></style>

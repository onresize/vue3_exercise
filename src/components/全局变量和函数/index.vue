<template>
  <div class="mixinHeight">
    <h2>{{ `全局变量app.config.globalProperties.$env -->  ${$env}` }}</h2>
    <h3>{{ $filters.format("vue3移除过滤器filters属性") }}</h3>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { appContext, proxy } = <ComponentInternalInstance>getCurrentInstance();
console.log("JS中拿到全局变量$env -->", appContext.config.globalProperties.$env);
console.log("JS中拿到全局变量$filters -->", appContext.config.globalProperties.$filters.format("vue3移除过滤器filters属性"));
// console.log("环境变量", import.meta.env.VITE_TITLE);
console.log("代理：", proxy);
</script>

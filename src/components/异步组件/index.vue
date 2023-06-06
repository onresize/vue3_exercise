<template>
  <div>
    <h2>异步组件使用、优化首屏加载、分包打包</h2>
    <h3>
      suspense 组件有两个插槽。它们都只接收一个直接子节点。default
      插槽里的节点会尽可能展示出来。如果不能，则展示 fallback 插槽里的节点。
    </h3>
    <a
      href="https://blog.csdn.net/qq1195566313/article/details/122909360"
      target="_blank"
      >参考：</a
    >
    <Suspense>
      <template #default>
        <A />
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loading from "./loading.vue";

// defineAsyncComponent异步加载组件、相当于vue2中的组件按需加载
const A = defineAsyncComponent(() => import("./A.vue"));
</script>

<style scoped></style>

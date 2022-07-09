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
        <div>稍等一下。。。。。。</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
} from "vue";
const A = defineAsyncComponent(() => import("./A.vue"));
</script>

<style scoped></style>

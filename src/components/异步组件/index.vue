<template>
  <div>
    <h2>异步组件使用、优化首屏加载、分包打包</h2>
    <h3>
      suspense 组件有两个插槽。它们都只接收一个直接子节点。default
      插槽里的节点会尽可能展示出来。如果不能，则展示 fallback 插槽里的节点。
    </h3>
    <a
      href="https://blog.csdn.net/qq1195566313/article/details/122909360?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164836579416781683946431%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164836579416781683946431&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-122909360.nonecase&utm_term=vue3%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6&spm=1018.2226.3001.4450"
    >参考：</a>
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

<template>
  <h2>suspense 搭配 vue-content-loader实现骨架屏</h2>
  <suspense>
    <!-- 异步组件 -->
    <Async />
    <template #fallback>
      <!-- 骨架屏 -->
      <Skeleton />
    </template>
  </suspense>
</template>

<script setup lang="ts">
import Async from "./async.vue";
import Skeleton from "./skeleton.vue";
</script>

<style scoped></style>

<template>
  <div class="mixinHeight">
    <h2>suspense 搭配 vue-content-loader实现骨架屏</h2>
    <h3>&lt;suspense>组件有两个插槽、它们都只接收一个直接子节点。default插槽会尽量展现出来、如果不能、则展示fallback插槽</h3>
    <suspense>
      <!-- 异步组件 -->
      <Async />

      <template #fallback>
        <!-- 骨架屏 -->
        <Skeleton />
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import Async from "./async.vue";
import Skeleton from "./skeleton.vue";
</script>

<style scoped></style>

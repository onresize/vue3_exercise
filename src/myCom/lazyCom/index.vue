<template>
  <div>
    <suspense>
      <!-- 异步组件 -->
      <template #default>
        <asyncCom v-bind="$attrs"></asyncCom>
      </template>
      <!-- loading组件 -->
      <template #fallback>
        <comLoading></comLoading>
      </template>
    </suspense>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import asyncCom from "./asyncCom.vue";
import comLoading from "./comLoading.vue";
</script>

<style scoped lang="less"></style>

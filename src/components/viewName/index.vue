<template>
  <div>
    <h3>(路由命名视图) 应用场景：tab页面效果</h3>
    <router-link to="/v1"><el-button>v1</el-button></router-link>
    <router-link to="/v2"
      ><el-button style="margin-left: 20px">v2</el-button></router-link
    >
    <!-- 默认路由 -->
    <router-view #default="{ route, Component }">
      <div>{{ route.meta }}</div>
      <component :is="Component"></component>
    </router-view>

    <!--  指定 components中aa和bb的组件 -->
    <router-view name="aa"> </router-view>

    <router-view name="bb"> </router-view>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
} from "vue";
</script>

<style scoped></style>

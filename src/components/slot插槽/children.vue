<template>
  <div class="container_box">
    <header class="header">
      <!-- 匿名插槽 -->
      <!-- <slot></slot> -->
    </header>
    <main class="main">
      <!-- 作用域插槽 -->
      <div v-for="(item, i) in data" :key="i">
        <slot :data="item" :i="i"></slot>
      </div>
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect } from "vue";
type names = {
  name: string;
  age: number;
};
let data = reactive<names[]>([
  { name: "张三", age: 19 },
  { name: "李四", age: 20 },
]);
</script>

<style scoped lang="less">
.container_box {
  width: 100%;
  // height: 100%;
  .header {
    width: 100%;
    height: 28vh;
    background-color: red;
  }
  .main {
    width: 100%;
    height: 28vh;
    background-color: green;
  }
  .footer {
    width: 100%;
    height: 28vh;
    background-color: pink;
  }
}
</style>

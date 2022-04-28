<template>
  <div>
    <h3>传送组件的使用</h3>
    <header>头部</header>
    <div
      style="width: 300px; height: 200px; background: pink; position: relative"
    >
      <!-- 演示传送组件、在index.html中定义了一个类名mode的标签、将loading传送到改标签下、 不受v-show影响-->
      <teleport to=".mode">
        <div class="teleport_loading">Loading..........</div>
      </teleport>
    </div>
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
</script>

<style scoped>
.teleport_loading {
  background-color: red;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>

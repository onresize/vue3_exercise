<template>
  <div>
    <h3>匿名插槽、具名插槽(动态插槽)、作用域插槽基本使用</h3>
    <children>
      <!-- <template v-slot>
        <div>匿名插槽</div>
      </template> -->

      <!-- XXX以下简写 -->
      <!-- <template #default="{ data, i }"> -->
      <template v-slot="{ data, i }">
        <div>作用域插槽 {{ data.name }} -- {{ data.age }} -- {{ i }}</div>
      </template>

      <!-- XXX以下简写 -->
      <!-- <template #footer> -->

      <!-- 动态插槽 -->
      <!-- <template #[slotName]> -->

      <template v-slot:footer>
        <div>具名插槽</div>
      </template>
    </children>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect } from "vue";
import children from "./children.vue";
let slotName = ref("footer");
</script>

<style scoped></style>

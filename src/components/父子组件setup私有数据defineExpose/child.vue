<template>
  <div>
    <p>私有数据：{{ privateCom2 }}</p>
    <p>公有数据：{{ privateCom1 }}</p>
  </div>
</template>

<!-- <script setup>
// XXX vue3组合式api方式使用 defineExpose
import { ref, computed } from "vue";

const privateCom1 = ref("aaaaaa");

const privateCom2 = computed(() => {
  return privateCom1.value.toUpperCase();
});

// 暴露公有数据
defineExpose({
  privateCom1,
});
</!-->
-->

<script>
// XXX vue2 选项是api方式使用 expose
export default {
  // 暴露公有数据
  expose: ["privateCom2"],
  data() {
    return { privateCom1: "aaaaaa" };
  },
  computed: {
    privateCom2() {
      return this.privateCom1.toUpperCase();
    },
  },
};
</script>

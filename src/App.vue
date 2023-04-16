<template>
  <div style="width: 100%; height: 100vh">
    <router-view style="width: 100%; height: 100%" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";

const PiniaStore = useMainStore(pinia);

// 测试线上和本地sourcemap
// setTimeout(() => {
//   console.log("这是一个测试错误:", aaa2);
// }, 6000);

const route = useRoute();
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
);
onMounted(() => {
  beforeRefreshClose();
});

/** 在刷新和关闭之前询问 **/
const beforeRefreshClose = () => {
  window.onbeforeunload = function (e) {
    if (route.path) {
      e = e || window.event;
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return 1; // 不能自定义关闭提示
    } else {
      window.onbeforeunload = null;
    }
  };
};
</script>

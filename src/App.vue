<template>
  <div style="width: 100%; height: 100vh">
    <router-view style="width: 100%; height: 100%" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";
import { useMainStore } from "@/store/pinia";

const PiniaStore = useMainStore();
const route = useRoute();
const Router = useRouter();
const key = computed(() => (route.name ? String(route.name) + new Date() : String(route.path) + new Date()));

/** 在刷新和关闭之前询问 **/
const beforeRefreshClose = () => {
  window.onbeforeunload = function (e) {
    if (route.path) {
      console.log("关闭1--------------------------");
      e = e || window.event;
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return 1; // 不能自定义关闭提示
    } else {
      console.log("关闭2--------------------------");
      window.onbeforeunload = null;
    }
  };
};

// 阻断地址栏修改时重定向到欢迎页
let storageUser = window.localStorage.getItem("user") || null;
if (storageUser) {
  if (["/", "/login"].includes(window.location.pathname)) {
    // alert('即将跳转登录页面')
    window.location.pathname = "/welcome";
  }
} else if (!["/", "/login"].includes(window.location.pathname)) {
  window.location.pathname = "/login";
}

onMounted(() => {
  console.log("APP.vue------onMounted---------", PiniaStore);
  beforeRefreshClose();
});
</script>

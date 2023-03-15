<template>
  <div style="width: 100%; height: 100vh">
    <router-view style="width: 100%; height: 100%" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";
import { AdminRoutes, OriginRoutes } from "@/router/AuthRoutes";
import config from "@/config";

const PiniaStore = useMainStore(pinia);

const route = useRoute();
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
);

let user = window.localStorage.getItem("user");
// 刷新时、根据对应用户、重新添加路由权限
if (PiniaStore.AuthRoutes.length === 0) {
  console.log("APP.vue走了刷新------------------");
  if (user == "Admin") {
    AdminRoutes.forEach((v: any) => {
      router.addRoute("layoutPage", v);
    });
  } else {
    OriginRoutes.forEach((v: any) => {
      router.addRoute("layoutPage", v);
    });
  }
}
</script>

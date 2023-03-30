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

const PiniaStore = useMainStore(pinia);

const route = useRoute();
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
);
</script>

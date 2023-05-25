<template>
<h3>重定向路由传参</h3>
  <h2>default页面--{{ route.query?.name }}</h2>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
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

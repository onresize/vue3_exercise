<template>
  <div>
    <img src="@/assets/img/404.webp" alt="404" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

// const route = useRoute();
// const router = useRouter();
// const { params, query } = route;
// const { path } = params;
</script>

<style scoped lang="less">
div {
  position: relative;
  img {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 60vw;
    -webkit-user-drag: none;
    user-select: none;
  }
}
</style>

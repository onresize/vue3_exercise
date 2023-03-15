<template>
  <div></div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { params, query } = route;
const { path } = params;
console.log("重定向页面：", path);

const toPage = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("/" + url);
    }, 200);
  });
};

toPage(path).then((path) => {
  router.replace({ path });
});
</script>
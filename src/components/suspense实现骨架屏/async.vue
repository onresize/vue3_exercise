<template>
  <img :src="bgUrl" alt style="width: 800px"/>
</template>

<script setup>
import bg from "@img/bg.jpg";
const getBg = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(bg);
    }, 2000);
  });
};
const bgUrl = await getBg();
</script>

<style scoped></style>

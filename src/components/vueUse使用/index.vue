<template>
  <div>
    <h2>vueUse基本使用（vue hooks库） 安装：npm i @vueuse/core</h2>
    <el-link href="https://vueuse.org/" target="_blank"
      >官网：https://vueuse.org/</el-link
    >
    <!-- <div class="dd">
      <img
        style="width: 100%; height: 100%; object-fit: cover"
        :src="login"
        alt=""
      />
    </div> -->
    <div class="dd">
      <img
        style="width: 100%; height: 100%; object-fit: cover"
        src="https://file-cloud.yst.com.cn/website/2020/04/14/cc375ee89dca435db613add3aaa07786.png"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import login from "@/assets/img/logo.png";
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
  readonly,
} from "vue";
let loginSrc = computed(() => {
  return login;
});
</script>

<style scoped>
.dd {
  width: 400px;
  height: 400px;
  background-color: #000000;
  overflow: hidden;
  border-radius: 20px;
}
.dd img:hover {
  transform: scale(1.1, 1.2);
  transition: all 2s;
}
</style>

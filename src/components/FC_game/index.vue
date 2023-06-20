<script setup>
import { reactive } from "vue";
import { NesVue } from "nes-vue";
</script>

<template>
  <el-link class="link" v-bind:href="'https://taiyuuki.gitee.io/nes-vue-docs/zh/guide/getting-started.html'" target="_bank">
    <h3>nes-vue文档</h3>
  </el-link>
  <nes-vue width="1024" height="960" :gain="50" url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes" />
</template>

<style scoped>
.link {
  position: absolute;
}
</style>

<template>
  <h3>
    <a
      href="https://blog.csdn.net/qq1195566313/article/details/123187523?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164716093316780264095974%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164716093316780264095974&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-5-123187523.nonecase&utm_term=vue3&spm=1018.2226.3001.4450"
      target="_bank"
    >
      vue3系统教程v-model
    </a>
  </h3>
  <el-button @click="show = !show">开关</el-button>
  <h3>{{ show }}---{{ title1 }}---{{ myName1 }}</h3>
  <Dialog
    ref="chidRef"
    v-model="show"
    v-model:title="title1"
    v-model:myName="myName1"
  ></Dialog>
</template>

<script setup lang="ts">
// import Dialog from "./child.vue";
import Dialog from "./child1.vue";
import { ref } from "vue";
let show = ref<boolean>(false);
let title1 = ref<string>("默认标题");
let myName1 = ref<string>('张三');
</script>

<style></style>

<template>
  <h2>更简单的方式传递多个props、和触发emit</h2>
  <div class="father">
    <mark>父组件</mark>
  </div>
  <User v-bind="user" v-on="emitChange"></User>
</template>

<script setup>
// defineProps defineEmits defineExpose withDefaults onMounted onUnmounted
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
} from "vue";
import { ElMessage } from "element-plus";
import User from "./child.vue";

const user = reactive({
  name: "张三",
  age: "18",
  job: "前端开发",
});
const emitChange = {
  updateName(e) {
    console.log(e);
    user.name = e;
    alert(e);
  },
  updateAge(e) {
    console.log(e);
    user.age = e;
    alert(e);
  },
  updateJob(e) {
    console.log(e);
    user.job = e;
    alert(e);
  },
};
</script>

<style scoped lang="less">
.father {
  width: 300px;
  height: 200px;
  border-radius: 20px;
  border: 3px solid black;
  margin-bottom: 10px;
  padding: 20px;
  box-sizing: border-box;
  mark {
    border-radius: 20px;
    padding: 0 10px;
  }
}
</style>

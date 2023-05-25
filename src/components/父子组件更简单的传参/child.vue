<template>
  <div class="child">
    <mark>子组件</mark>
    <p @click="emitName">姓名：{{ name }}</p>
    <p @click="emitAge">年龄：{{ age }}</p>
    <p @click="emitJob">职业：{{ job }}</p>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  defineAsyncComponent,
} from "vue";

const props = defineProps({
  name: String,
  age: String,
  job: String,
});

const emit = defineEmits(["updateName", "updateAge", "updateJob"]);

const emitName = () => {
  emit("updateName", props.name);
};
const emitAge = () => {
  emit("updateAge", props.age);
};
const emitJob = () => {
  emit("updateJob", props.job);
};
</script>

<style scoped lang="less">
.child {
  width: 300px;
  height: 200px;
  border-radius: 20px;
  border: 3px solid red;
  padding: 20px;
  box-sizing: border-box;
  mark {
    border-radius: 20px;
    padding: 0 10px;
  }
  p {
    background-color: antiquewhite;
    border: 3px solid antiquewhite;
    border-radius: 20px;
    padding: 0 10px;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    &:active {
      border: 3px solid red;
    }
  }
}
</style>

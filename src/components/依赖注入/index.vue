<template>
  <h2>provide只能向下传递、不能向上传递(inject可以向上触发方法达到向上通信)</h2>
  <div class="father_box">
    <el-button @click="changeName('李四', 30)">父组件-修改-父组件name</el-button>
    <Child></Child>
  </div>
</template>

<script setup>
import { ref, reactive, computed, provide } from "vue";
import Child from "./child.vue";

const name = ref("张三");
const age = ref(20);
const birth = ref('2000.07.11');

const changeName = (nameVal, ageVal) => {
  name.value = nameVal;
  age.value = ageVal;
};

// 赋值具有响应式写法
// 单个数据写法
provide('fatherBirth', birth)
// 多个数据写法（string、number、func）
provide('fatherObjState', { name, age, changeName })


</script>

<style scoped lang="less">
.father_box {
  margin-top: 30px;
  width: 300px;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  border: 3px solid skyblue;
  display: grid;
  place-items: center;
}
</style>

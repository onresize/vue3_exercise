<template>
  <div class="child_box">
    <h3>我是子组件: {{ name }}--{{ age }}--{{ fatherBirth }}</h3>
    <el-button @click="changeName('王五', 40)">子组件-修改-父组件name</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";


// 拿到main.ts定义的应用层provide字段
const provideKey = inject("provideKey")
console.log(provideKey)

// 单个数据写法
const fatherBirth = inject('fatherBirth')

// 多个数据写法（string、number、func）
const { name, age, changeName } = inject("fatherObjState")
</script>

<style scoped lang="less">
.child_box {
  width: 300px;
  height: 100%;
  border-radius: 10px;
  border: 3px solid red;
  display: grid;
  place-items: center;
  box-sizing: border-box;
}
</style>

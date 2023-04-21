<template>
  <el-card class="p_card">
    <h3>测试防抖</h3>
    <el-input v-model="iptVal" @input="$D(getIptVal, 1000)"></el-input>
  </el-card>
  <div @scroll="$T(getScroll)" class="border_scroll">
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
    <el-card class="p_card1">测试节流</el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const iptVal = ref("");

const getIptVal = () => {
  console.log(iptVal.value);
};

const getScroll = () => {
  console.log("节流滚动测试");
};
</script>

<style scoped lang="less">
.p_card {
  margin-top: 20px;
}
.border_scroll {
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: 600px;
  overflow-y: scroll;
  border: 3px solid red;
  .p_card1 {
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="box mixinHeight">
    <el-tag class="btn" :effect="state.viable1 ? 'dark' : 'light'" @click="changeState('viable1')">弹窗1</el-tag>
    <el-tag class="btn" :effect="state.viable2 ? 'dark' : 'light'" @click="changeState('viable2')">弹窗2</el-tag>
    <el-tag class="btn" :effect="state.viable3 ? 'dark' : 'light'" @click="changeState('viable3')">弹窗3</el-tag>
    <el-tag class="btn" :effect="state.viable4 ? 'dark' : 'light'" @click="changeState('viable4')">弹窗4</el-tag>

    <div class="my_dialog bg1" v-draggable v-if="state.viable1">
      <div class="my_dialog_header"></div>
      <div @click="closeState('viable1')" class="close">x</div>
      拖拽框1
    </div>
    <div class="my_dialog bg2" v-draggable v-if="state.viable2">
      <div class="my_dialog_header"></div>
      <div @click="closeState('viable2')" class="close">x</div>
      拖拽框2
    </div>
    <div class="my_dialog bg3" v-draggable v-if="state.viable3">
      <div class="my_dialog_header"></div>
      <div @click="closeState('viable3')" class="close">x</div>
      拖拽框3
    </div>
    <div class="my_dialog bg4" v-draggable v-if="state.viable4">
      <div class="my_dialog_header"></div>
      <div @click="closeState('viable4')" class="close">x</div>
      拖拽框4
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const state = reactive({
  viable1: false,
  viable2: false,
  viable3: false,
  viable4: false,
});

const changeState = (key) => {
  state[key] = !state[key];
};
const closeState = (key) => {
  state[key] = false;
};
</script>

<style scoped lang="less">
.box {
  user-select: none;
  position: relative;
  border: 3px solid red;
  height: calc(100% - 5px) !important;
  .btn {
    width: 80px;
    height: 30px;
    margin: 10px;
    color: #000;
    cursor: pointer;
  }
  .my_dialog {
    position: absolute;
    z-index: 2008;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    display: grid;
    place-content: center;
    font-weight: bold;
    .my_dialog_header {
      position: absolute;
      box-sizing: border-box;
      border-radius: 20px 20px 0 0;
      width: 300px;
      height: 50px;
      border: 3px solid #000;
    }
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 17px;
      border: 2px solid black;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        border-color: #fff;
        color: #fff;
      }
    }
  }
  .bg1 {
    background: red;
  }
  .bg2 {
    background: pink;
  }
  .bg3 {
    background: green;
  }
  .bg4 {
    background: burlywood;
  }
}
</style>

<template>
  <h3>vue3在css、less、scss中使用v-bind绑定js变量</h3>
  <el-link
    href="https://blog.csdn.net/weixin_52235488/article/details/126290046"
    >CSDN参考：</el-link
  >
  <div class="myBoxClass">盒子1</div>
  <myBox></myBox>
</template>

<script setup>
import { ref, reactive, h, computed } from "vue";
import "./index.css";

let state = ref({
  width: "300px",
  height: "300px",
  border: "3px solid red",
});

let pWidth = ref("300px");

const myBox = () => {
  return [h("div", { class: "myBoxComClass" }, "盒子2")];
};
</script>

<style scoped lang="less">
.myBoxClass {
  margin-top: 10px;
  display: grid;
  place-content: center;
  width: 100px;
  height: v-bind("state.height");

  border: 5px solid red;
  border: v-bind("state.border");
}
</style>

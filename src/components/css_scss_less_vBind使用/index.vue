<template>
  <h3>vue3在css、less、scss中使用v-bind绑定js变量</h3>
  <el-link
    href="https://blog.csdn.net/weixin_52235488/article/details/126290046"
    >CSDN参考：</el-link
  >
  <h3>
    说明，lighten第一个是颜色值，第二个参数是相比第一个底色少百分之几的，比如第一个是100分的颜色值，lighten(100,
    40%)=60%即原来的60%
  </h3>
  <div class="myBoxClass">
    <div class="col">盒子1</div>
    <div class="col">盒子2</div>
    <div class="col">盒子3</div>
    <div class="col">盒子4</div>
    <div class="col">盒子5</div>
  </div>
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

let pWidth = ref("120px");

const myBox = () => {
  return [h("div", { class: "myBoxComClass" }, "盒子22")];
};
</script>

<style scoped lang="less">
.myBoxClass {
  color: #fff;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  width: v-bind(pWidth);
  height: v-bind("state.height");

  border: 5px solid red;
  border: v-bind("state.border");
  box-sizing: border-box;
  .col {
    width: 100%;
    display: grid;
    place-items: center;
  }
  & > div:nth-child(1) {
    background: deeppink;
  }
  & > div:nth-child(2) {
    background: lighten(deeppink, 10%);
  }
  & > div:nth-child(3) {
    background: lighten(deeppink, 20%);
  }
  & > div:nth-child(4) {
    background: lighten(deeppink, 30%);
  }
  & > div:nth-child(5) {
    background: lighten(deeppink, 40%);
  }
}
</style>

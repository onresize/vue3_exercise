<template>
  <div v-dom-bgc="bgcColor">
    <h3>vue3自定义指令、main.ts注册指令</h3>
    <a href="https://www.bilibili.com/video/BV1dW4y1a7f8/">b站视频</a>
    <hr />
    <div v-font-size-color="{ color, fontSize }">测试字体</div>
    <el-button @click="changeFontSizeColor"> 改变字体大小和颜色 </el-button>
    <el-button @click="changeDomBgcColor"> 改变背景颜色 </el-button>
    <hr />
    <div v-font-size-col:[styleField]="fontSizeAndColor">测试字体</div>
    <el-button @click="changeFontSize"> 改变字体大小 </el-button>
    <el-button @click="changeColor"> 改变字体颜色 </el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";

//XXX 情况 1
const color = ref("red");
const fontSize = ref("15px");
const bgcColor = ref("pink");

const changeFontSizeColor = () => {
  color.value = color.value == "green" ? "red" : "green";
  fontSize.value = fontSize.value == "30px" ? "15px" : "30px";
};
const changeDomBgcColor = () => {
  bgcColor.value = bgcColor.value == "yellow" ? "pink" : "yellow";
};



//XXX 情况 2
const styleField = ref("fontSize");
const fontSizeAndColor = ref("20px");

const changeFontSize = () => {
  styleField.value = "fontSize";
  fontSizeAndColor.value = "40px";
};
const changeColor = () => {
  styleField.value = "color";
  fontSizeAndColor.value = "red";
};
</script>

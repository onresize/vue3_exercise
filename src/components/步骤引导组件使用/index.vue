<template>
  <h2></h2>
  <mark>方式一：</mark>
  <div>
    <h2>步骤引导组件使用: npm i vue3-intro-step --save</h2>
    <h2>搭配npm i animate.css --save 动画更顺畅</h2>
    <el-link herf="https://www.npmjs.com/package/vue3-intro-step" target="_bank"
      >npm参考</el-link
    >
  </div>

  <h2></h2>
  <mark>方式二：</mark>
  <div id="intro-box">
    <h2 class="intro-name">driver.js</h2>
    <el-button id="intro-button">展示图片</el-button>
    <div id="intro-bottom">测试非可视区域</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

const driver = ref();
const steps = [
  {
    element: ".intro-name",
    popover: {
      title: "插件名称",
      description: "插件为driver.js",
      // position: "top",
    },
  },
  {
    element: "#intro-button",
    popover: {
      title: "展示图片",
      description: `测试能否展示html片段：<img
      src="https://img0.baidu.com/it/u=962361882,2281204904&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
      alt=""
      style="width: 200px; height: 200px"
    />`,
      position: "bottom",
    },
  },
  {
    element: "#intro-bottom",
    popover: {
      title: "给非可视区域设置引导",
      description: "给非可视区域设置引导,测试是否会自动滚动",
      // position: 'bottom'
    },
  },
];
const handleShowGuide = () => {
  driver.value.defineSteps(steps);
  driver.value.start();
};
onMounted(() => {
  driver.value = new Driver({
    animate: true,
    doneBtnText: "完成",
    closeBtnText: "关闭",
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    keyboardControl: true,
  });
  setTimeout(() => {
    handleShowGuide();
  }, 100);
});
</script>

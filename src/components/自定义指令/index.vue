<template>
  <div>
    <div v-dom-bgc="bgcColor" style="margin-top: 36px; height: 240px">
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
    <el-button type="warning" v-longpress="longpress">长按2s触发指令</el-button>
    <el-button type="primary" v-debounce="debounceClick"
      >防抖按钮 (0.5秒后执行)</el-button
    >
    <el-button type="primary" v-throttle="throttleClick"
      >节流按钮 (每隔1S秒后执行)</el-button
    >
    <el-input
      placeholder="请输入内容"
      v-model="data"
      style="width: 400px; height: 36px"
    >
      <template #append>
        <el-button v-copy="data">复制</el-button>
      </template>
    </el-input>
    <el-card
      class="card-box"
      v-waterMarker="{
        text: '自定义水印指令',
        textColor: 'rgba(180, 180, 180, 0.6)',
      }"
    >
      <svg
        data-v-07b8fae0=""
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        width="400"
        height="500"
      >
        <g transform="translate(200,110)">
          <g stroke="#000" stroke-width="1.5">
            <line
              stroke-opacity="1"
              x1="98.45981917939729"
              y1="35.223751824327955"
              x2="-79.95103921621164"
              y2="67.58533849981897"
            ></line>
            <line
              stroke-opacity="1"
              x1="-79.95103921621164"
              y1="67.58533849981897"
              x2="-18.505298739003013"
              y2="-102.78100975049361"
            ></line>
            <line
              stroke-opacity="1"
              x1="-18.505298739003013"
              y1="-102.78100975049361"
              x2="98.45981917939729"
              y2="35.223751824327955"
            ></line>
          </g>
          <g stroke="#fff" stroke-width="1.5">
            <circle
              fill="#1f77b4"
              cx="98.45981917939729"
              cy="35.223751824327955"
              r="8"
            ></circle>
            <circle
              fill="#ff7f0e"
              cx="-79.95103921621164"
              cy="67.58533849981897"
              r="8"
            ></circle>
            <circle
              fill="#2ca02c"
              r="8"
              cx="-18.505298739003013"
              cy="-102.78100975049361"
            ></circle>
          </g>
        </g>
      </svg>
    </el-card>
    <h3>演示按钮权限v-permission(当前路由只给了下面按钮增、改的权限)</h3>
    <el-row>
      <el-button v-permission="[Route.path, 'add']">增加</el-button>
      <el-button v-permission="[Route.path, 'remove']">删除</el-button>
      <el-button v-permission="[Route.path, 'edit']">修改</el-button>
      <el-button v-permission="[Route.path, 'search']">查询</el-button>
    </el-row>
    <el-button circle v-draggable class="drag-box">拖拽指令</el-button>
  </div>
</template>

<script setup>
import { ref, useSlots } from "vue";
import { useRoute } from "vue-router";

const Route = useRoute();
const slots = useSlots();
console.log("当前slots：", slots);
const data = ref("我是被复制的内容 🍒 🍉 🍊");
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

const longpress = () => {
  ElMessage.warning("长按事件触发成功 🎉🎉🎉");
};
const debounceClick = () => {
  ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
const throttleClick = () => {
  ElMessage.success("我是节流按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped>
.el-button {
  margin: 8px;
}

.card-box {
  width: 100%;
  height: 230px;
}

.drag-box {
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  border-radius: 50%;
  user-select: none;
  color: #ffffff;
  font-weight: bold;
  background-color: #00c6ff;
  box-shadow: 0 0 0.1rem #00c6ff, 0 0 0.2rem #00c6ff, 0 0 0.3rem #00c6ff,
    0 0 0.4rem #00c6ff;
}
</style>

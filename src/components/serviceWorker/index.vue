<template>
  <div>
    <h3>service Worker实践</h3>
    <h3>
      <el-link href="https://developer.mozilla.org/zh-CN/docs/Web/API/notification" target="_bank">MDN参考(Notification API)</el-link>
      &nbsp;&nbsp;&nbsp;
      <el-link href="https://blog.csdn.net/weixin_33841722/article/details/88731760" target="_bank">CSDN参考</el-link>
    </h3>
    <el-button @click="toMessage">发送一条消息</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import myIcon from "@/assets/img/1.webp";

const toMessage = () => {
  console.log("发送一条消息");

  if (!("Notification" in window)) {
    // 检查是否有Notification这个api
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // 有通知权限、直接创建消息
    const notification = new Notification("通知", {
      body: "这是一条测试消息",
      icon: myIcon,
    });
    notification.onclick = function (e) {
      console.log("点击了消息", e);
    };
    // …
  } else if (Notification.permission !== "denied") {
    // 询问获取通知权限
    Notification.requestPermission().then((permission) => {
      // 允许通知后
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
  }
};
</script>

<style scoped lang="less"></style>

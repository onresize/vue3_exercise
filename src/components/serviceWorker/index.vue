<template>
  <div>
    <h3>service Worker实践</h3>
    <h3>
      <el-link href="https://developer.mozilla.org/zh-CN/docs/Web/API/notification" target="_bank">MDN参考(Notification API)</el-link>
      &nbsp;&nbsp;
      <el-link href="https://blog.csdn.net/weixin_33841722/article/details/88731760" target="_bank">CSDN参考</el-link>
      &nbsp;&nbsp;
      <el-button @click="toMessage">测试消息通知API</el-button>
    </h3>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="2">
        <template #title>
          <el-icon class="header-icon"> <info-filled /> </el-icon><span style="color: #37474f; font-size: 15px; font-weight: bold"> &nbsp;实践说明：</span>
        </template>
        <div class="txt_div">
          <span> 基于web-push测试网址： https://web-push-codelab.glitch.me (如下嵌套页面) </span>
          <div style="color: red; margin-top: 10px">注意：测试需要开启vpn</div>
          <div style="margin-top: 10px">操作步骤：</div>
          <span> 1.点击测试消息订阅按钮、复制下面出现的json字符串、粘贴到Subscription to Send To下、发送之后注意右下角windows通知 </span>
          <span> 2.如果出错了下方Public Key刷新了、复制这个key值、在项目utils文件夹下找到subscribeUser.js将vapidPublicKey变量进行替换后重试 </span>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-button @click="toStartMessage" class="msg_btn">测试消息订阅</el-button>
    <code class="json_code">
      {{ state.pushSubscription }}
      <el-button class="copy_btn" icon="DocumentCopy" circle title="copy" v-copy="state.pushSubscription"></el-button>
    </code>
    <el-card>
      <iframe class="frame_box" src="https://web-push-codelab.glitch.me/" frameborder="0"></iframe>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import { useMainStore } from "@/store/pinia.ts";
import { subscribeUser } from "@/utils/subscribeUser.js";
import myIcon from "@/assets/img/1.webp";

const PiniaStore = useMainStore();

const activeNames = ref(["1"]);
const state = reactive({
  pushSubscription: "",
});

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

const toStartMessage = async () => {
  await subscribeUser(); // 开启消息订阅
  await nextTick();
  state.pushSubscription = PiniaStore.JsonKey;
};
</script>

<style scoped lang="less">
.txt_div {
  font-size: 15px;
  font-weight: bold;
  font-family: "微软雅黑";
  background: gold;
  padding: 15px;
  border-radius: 10px;
  span {
    display: inline-block;
  }
}
.json_code {
  min-height: 50px;
  display: block;
  margin-bottom: 10px;
  padding: 15px 10px 10px 60px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  font-family: "微软雅黑";
  color: #303133;
  overflow: hidden;
  position: relative;

  .copy_btn {
    transform: all 1.5s liner;
    position: absolute;
    top: calc(50% - 14px);
    left: 10px;
  }
}
.msg_btn {
  margin: 10px 0;
}
.frame_box {
  width: calc(100vw - 330px);
  height: calc(100vh - 400px);
}
</style>

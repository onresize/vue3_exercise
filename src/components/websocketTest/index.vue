<template>
  <div class="mixinHeight">
    <h3>websocket连接测试(每隔10秒心跳响应)</h3>
    <el-card>
      <el-button :disabled="state.connectDisabled" id="connect" @click="connectClick">连接</el-button>
      <el-button :disabled="state.sendMessageDisabled" id="sendMessage" @click="sendMessageClick">发送</el-button>
      <el-button :disabled="state.destroyDisabled" id="destroy" @click="destroyClick">关闭</el-button>
    </el-card>

    <el-card class="itemBoxCard" v-if="PiniaStore.MessageList.length">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="`当前消息: ${PiniaStore.MessageList.length}条`" name="1">
          <el-card class="p_Card">
            <el-input class="ipt" v-for="(item, idx) in PiniaStore.MessageList" :key="idx" :value="idx + ': ' + item" placeholder="" disabled></el-input>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from "vue";
import { useMainStore } from "@/store/pinia.ts";
import { messageCenter } from "./lib/messageCenter.js";
import MyWebSocket from "./lib/webSocket.js";

const PiniaStore = useMainStore();

const name = "zhangsan"; //连接用户名
let wsUrl = "ws://127.0.0.1:2048/ws/?name=" + name;
let myWebSocket,
  contentCount = 0;
messageCenter.on("changeBtnState", setButtonState); //设置按钮样式
messageCenter.on("reconnect", reconnectWebSocket); //接收重连消息

const state = reactive({
  connectDisabled: false,
  sendMessageDisabled: true,
  destroyDisabled: true,
});

// XXX连接
const connectClick = () => {
  reconnectWebSocket();
};
// XXX发送
const sendMessageClick = () => {
  // 发消息
  myWebSocket.sendMsg({
    ModeCode: "message",
    msg: `hello ${Date.now()}`,
  });
};
// XXX关闭
const destroyClick = () => {
  clear(myWebSocket);
};

function reconnectWebSocket() {
  // 入口函数
  if (myWebSocket) {
    //防止多个websocket同时执行
    clear(myWebSocket);
  }
  connectWebSocket();
}
// 终止连接
function clear(myWebSocket) {
  myWebSocket?.clear();
  myWebSocket = null;
}
function connectWebSocket() {
  contentCount += 2; // 重连时间随重连次数累加
  console.log(`${3 + contentCount}秒后重连`);
  myWebSocket = new MyWebSocket(wsUrl);
  myWebSocket.init(
    {
      //time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时间，一般的，断线重连时间等于心跳时间间隔加断线重连时间（忽略超时等待）
      time: 10 * 1000,
      timeout: 1 * 1000,
      reconnect: (3 + contentCount) * 1000,
    },
    true
  );
}

/*
 * 设置按钮是否可点击
 * @param state：open表示开启状态，close表示关闭状态
 */
function setButtonState(val) {
  switch (val) {
    case "open":
      state.connectDisabled = true;
      state.sendMessageDisabled = false;
      state.destroyDisabled = false;
      break;
    case "close":
      state.connectDisabled = false;
      state.sendMessageDisabled = true;
      state.destroyDisabled = true;
      break;
  }
}

const activeNames = ref(["1"]);
const handleChange = (val) => {
  console.log(val);
};

onUnmounted(() => {
  // 销毁关闭socket
  destroyClick();
  PiniaStore.changeMessageListNUll([]);
});
</script>

<style scoped lang="less">
.itemBoxCard {
  margin-top: 10px;
  width: 100%;
  height: calc(100vh - 250px);
  box-sizing: border-box;

  .p_Card {
    width: 100%;
    height: calc(100vh - 350px);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;

    // 局部滚动条美化
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      display: block;
    }
  }

  .ipt {
    margin: 5px;
  }
}
</style>

<script setup>
import { ref, reactive } from "vue";

const state = reactive({
  isShowIpt: false,
  speedIptVal: "",
  isShowSpeedAnimation: false,
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.oSpeechRecognition || window.msSpeechRecognition;

const recognition = SpeechRecognition ? new SpeechRecognition() : null;
const recognitionStatus = ref("识别未启动");
const recognizedText = ref("");

if (recognition) {
  recognition.continuous = false; // 设置是持续听还是听到声音之后就关闭接收。
  recognition.interimResults = true; // 设置是否允许临时结果，临时结果是识别的中间过程，这时候返回结果的isFinal = false。

  recognition.onstart = (e) => {
    console.log("识别已启动---------", e);
    recognitionStatus.value = "识别已启动";
  };

  recognition.onresult = (event) => {
    console.log("onresult:", event);
    const recognized = event.results[event.results.length - 1][0].transcript;
    recognizedText.value = recognized;
  };

  recognition.onend = () => {
    recognitionStatus.value = "确认已结束";
  };
} else {
  recognitionStatus.value = "不支持识别";
}

const startRecognition = () => {
  if (recognition) {
    recognition.start(); // 开始语音识别
  }
};

const stopRecognition = () => {
  if (recognition) {
    recognition.stop(); // 停止语音识别
  }
};

const mousedownClick = () => {
  console.log("鼠标按下事件******");
  state.isShowSpeedAnimation = true;
  btnControlClick();
};

const mouseupClick = () => {
  console.log("鼠标抬起事件>>>>>");
  state.isShowSpeedAnimation = false;
  setTimeout(() => {
    state.isShowIpt = true;
  }, 500);
  // 结束录音
  recorder.stop();
};

const btnControl = document.getElementById("btn_control");

const APPID = "0ddf1d0a";
const API_SECRET = "YThjYzcwNDA0MjNkMDU4YmMwYzg5MjBk";
const API_KEY = "5e852be42bc3e6bcf601a7eeb4268aa5";

let btnStatus = "UNDEFINED"; // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"

const recorder = new RecorderManager("/sdk");

let iatWS;
let resultText = "";
let resultTextTemp = "";
let countdownInterval;

function getWebSocketUrl() {
  // 请求地址根据语种不同变化
  var url = "wss://iat-api.xfyun.cn/v2/iat";
  var host = "iat-api.xfyun.cn";
  var apiKey = API_KEY;
  var apiSecret = API_SECRET;
  var date = new Date().toGMTString();
  var algorithm = "hmac-sha256";
  var headers = "host date request-line";
  var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
  var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
  var signature = CryptoJS.enc.Base64.stringify(signatureSha);
  var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
  var authorization = btoa(authorizationOrigin);
  url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
  return url;
}

function toBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function changeBtnStatus(status) {
  btnStatus = status;
  if (status === "CONNECTING") {
    resultText = "";
    resultTextTemp = "";
  }
}

function renderResult(resultData) {
  // 识别结束
  let jsonData = JSON.parse(resultData);
  if (jsonData.data && jsonData.data.result) {
    let data = jsonData.data.result;
    let str = "";
    let ws = data.ws;
    for (let i = 0; i < ws.length; i++) {
      str = str + ws[i].cw[0].w;
    }
    // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
    // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
    if (data.pgs) {
      if (data.pgs === "apd") {
        // 将resultTextTemp同步给resultText
        resultText = resultTextTemp;
      }
      // 将结果存储在resultTextTemp中
      resultTextTemp = resultText + str;
    } else {
      resultText = resultText + str;
    }
    state.speedIptVal = resultTextTemp || resultText || "";
  }
  if (jsonData.code === 0 && jsonData.data.status === 2) {
    iatWS.close();
  }
  if (jsonData.code !== 0) {
    iatWS.close();
    console.error(jsonData);
  }
}

function connectWebSocket() {
  const websocketUrl = getWebSocketUrl();
  if ("WebSocket" in window) {
    iatWS = new WebSocket(websocketUrl);
  } else if ("MozWebSocket" in window) {
    iatWS = new MozWebSocket(websocketUrl);
  } else {
    alert("浏览器不支持WebSocket");
    return;
  }
  changeBtnStatus("CONNECTING");
  iatWS.onopen = (e) => {
    // 开始录音
    recorder.start({
      sampleRate: 16000,
      frameSize: 1280,
    });
    var params = {
      common: {
        app_id: APPID,
      },
      business: {
        language: "zh_cn",
        domain: "iat",
        accent: "mandarin",
        vad_eos: 5000,
        dwa: "wpgs",
      },
      data: {
        status: 0,
        format: "audio/L16;rate=16000",
        encoding: "raw",
      },
    };
    iatWS.send(JSON.stringify(params));
    changeBtnStatus("OPEN");
  };
  iatWS.onmessage = (e) => {
    renderResult(e.data);
  };
  iatWS.onerror = (e) => {
    console.error(e);
    recorder.stop();
    changeBtnStatus("CLOSED");
  };
  iatWS.onclose = (e) => {
    recorder.stop();
    changeBtnStatus("CLOSED");
  };
}

recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
  if (iatWS.readyState === iatWS.OPEN) {
    iatWS.send(
      JSON.stringify({
        data: {
          status: isLastFrame ? 2 : 1,
          format: "audio/L16;rate=16000",
          encoding: "raw",
          audio: toBase64(frameBuffer),
        },
      })
    );
    if (isLastFrame) {
      changeBtnStatus("CLOSING");
    }
  }
};
recorder.onStop = () => {
  clearInterval(countdownInterval);
};

function btnControlClick() {
  if (btnStatus === "UNDEFINED" || btnStatus === "CLOSED") {
    connectWebSocket();
  } else if (btnStatus === "CONNECTING" || btnStatus === "OPEN") {
    // 结束录音
    recorder.stop();
  }
}
</script>

<template>
  <el-card style="margin: 10px">
    <div>
      <el-tag style="color: red; margin-right: 20px">需要开启梯子</el-tag>
      <el-button @click="startRecognition">开启语音识别</el-button>
      <el-button @click="stopRecognition">关闭语音识别</el-button>
      <p>{{ recognitionStatus }}</p>
      <p>{{ recognizedText }}</p>
    </div>
  </el-card>

  <el-card style="margin: 10px">
    <el-input
      v-model="state.speedIptVal"
      clearable
      @clear="
        () => {
          state.isShowIpt = false;
        }
      "
      placeholder="长按使用语音输入内容"
      class="ipt"
    >
      <template #append>
        <div class="speed_box" @mouseup.stop.prevent="$D(mouseupClick, 500)" @mousedown.stop.prevent="$D(mousedownClick, 500)">
          <img v-if="state.isShowSpeedAnimation" src="@/assets/img/mic-animate.gif" alt="" draggable="false" />
          <svg-icon v-else name="mkf" class="speed_ico" />
        </div>
      </template>
    </el-input>
    <p v-show="state.isShowIpt">
      <vuetyped :key="state.speedIptVal" :strings="[`${state.speedIptVal}`]" :loop="false" :smart-backspace="true">
        <div class="typing" />
      </vuetyped>
    </p>
  </el-card>
</template>

<style scoped lang="less">
.ipt {
  width: 400px;
  user-select: none;

  .speed_box {
    cursor: pointer;
    width: 40px;
    display: grid;
    place-content: center;
    font-size: 16px;

    &:hover {
      background-color: rgba(144, 147, 153, 0.3);
    }

    .speed_ico {
      height: 30px;
    }

    img {
      width: 30px;
      height: 30px;
    }
  }

  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0 !important;
  }
}
</style>

<script setup>
import { ref, reactive } from "vue";

const state = reactive({
  speedIptVal: "",
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.oSpeechRecognition || window.msSpeechRecognition;

const recognition = SpeechRecognition ? new SpeechRecognition() : null;
const recognitionStatus = ref("识别未启动");
const recognizedText = ref("");

if (recognition) {
  recognition.continuous = true; // 设置是持续听还是听到声音之后就关闭接收。
  recognition.interimResults = true; // 设置是否允许临时结果，临时结果是识别的中间过程，这时候返回结果的isFinal = false。

  recognition.onstart = () => {
    recognitionStatus.value = "识别已启动";
  };

  recognition.onend = () => {
    recognitionStatus.value = "确认已结束";
  };

  recognition.onresult = (event) => {
    console.log("onresult:", event);
    const recognized = event.results[event.results.length - 1][0].transcript;
    recognizedText.value = recognized;
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
</script>

<template>
  <!-- <el-input v-model="state.speedIptVal" placeholder="使用语音输入内容" class="ipt">
    <template #append>
      <div class="speed_box">
        <svg-icon name="mkf" class="speed_ico" />
      </div>
    </template>
  </el-input> -->

  <div>
    <el-button @click="startRecognition">开启语音识别</el-button>
    <el-button @click="stopRecognition">关闭语音识别</el-button>
    <p>{{ recognitionStatus }}</p>
    <p>{{ recognizedText }}</p>
  </div>
</template>

<style scoped lang="less">
.ipt {
  width: 400px;

  .speed_box {
    cursor: pointer;
    width: 40px;
    text-align: center;
    font-size: 16px;

    &:active {
      background-color: rgba(144, 147, 153, 0.3);
    }
  }

  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0 !important;
  }
}
</style>

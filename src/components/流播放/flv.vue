<template>
  <div class="box">
    <el-button @click.prevent="toShowFlv">测试flv直播流弹窗</el-button>

    <el-dialog v-model="state.visible" title="监控实时画面" width="840px" class="dialog_box" :before-close="closeDiag" draggable>
      <FlvVideo v-if="state.FlvUrl" ref="FlvVideoRef" :taskInfo="{ FlvUrl: state.FlvUrl, id: state.id }" :style="{ height: '474px' }" class="video_body"> </FlvVideo>
      <template #footer>
        <span class="dialog-footer" v-if="false"></span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "videoFlv",
};
</script>

<script setup>
import { ref, reactive, onMounted, onUnmounted, defineAsyncComponent, getCurrentInstance } from "vue";
import FlvVideo from "@/myCom/flvCom/flv-video.vue";

// const FlvVideo = defineAsyncComponent(() =>
//   import("@/myCom/flvCom/flv-video.vue")
// );

const { appContext, proxy } = getCurrentInstance();

const FlvVideoRef = ref(null);
const state = reactive({
  visible: false,
  FlvUrl: "",
  id: "VideoFlv",
});

const toShowFlv = async (id = "566625681") => {
  state.visible = true;
  state.FlvUrl = "https://flvopen.ys7.com:9188/openlive/6e31c12fe0f340339aafb065841e8dc5.flv";
  // state.FlvUrl = 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'
};

const closeDiag = () => {
  state.visible = false;
  // FlvVideoRef.value?.destroy()
};

const options = Array.from({ length: 100 }).map((_, idx) => idx + 1);

console.log("options:", options);
</script>

<style scoped lang="less">
.box {
  width: 97%;
  height: 100%;
  box-sizing: border-box;
  // border: 5px solid red;
}
</style>

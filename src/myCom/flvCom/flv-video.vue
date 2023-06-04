<template>
  <div class="videoBox">
    <video id="videoElementDom" ref="flvPlayerRef" controls style="width: 100%; height: 100%; object-fit: fill"></video>
  </div>
</template>

<script type="module">
import flvjs from 'https://cdn.jsdelivr.net/npm/flv.js@1.6.2/+esm'
export default {
  name: "videoFlv",
};
</script>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  taskInfo: {
    type: Object,
    default: () => { },
  },
});

const state = reactive({
  flvPlayer: null
})

const flvPlayerRef = ref(null);
const taskInfo = computed(() => props.taskInfo);

const createVideo = () => {
  if (!taskInfo.value?.FlvUrl) return
  if (flvjs.isSupported()) {
    console.log('flv组件拿到props', taskInfo.value)
    var videoElementDom = flvPlayerRef.value;
    let player = flvjs.createPlayer({
      type: "flv",
      isLive: true,
      hasAudio: false,
      url: taskInfo.value?.FlvUrl, //你的url地址
      // url: 'https://flvopen.ys7.com:9188/openlive/6e31c12fe0f340339aafb065841e8dc5.flv', //你的url地址
    });
    player.attachMediaElement(videoElementDom);

    try {
      player.load();
      setTimeout(function () {
        player.play();
      }, 300);
    } catch (err) {
      console.log(err)
    }
    state.flvPlayer = player
  }
};

const destroy = () => {
  console.log('flv组件销毁----------')
  state.flvPlayer?.pause(); //暂停播放数据流
  state.flvPlayer?.unload(); //取消数据流加载
  state.flvPlayer?.detachMediaElement(); //将播放实例从节点中取出
  state.flvPlayer?.destroy(); //销毁播放实例
  state.flvPlayer = null;
};
defineExpose({ destroy });

onMounted(() => {
  console.log('执行flv组件onMounted-------------')
  createVideo();
});
onUnmounted(() => {
  destroy()
})
</script>
<style scoped>
.videoBox {
  width: 800px;
  height: 450px;
  border: solid 1px #ccc;
}
</style>

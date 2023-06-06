<template>
  <el-card style="overflow-y: scroll">
    <h2>teleport传送门实现滚动小窗口播放器同状态切换video播放</h2>
    <h3 style="color: red">
      注意： 这里teleport的 to 属性在 index.html中的标签下才有效果
    </h3>
    <h2>
      <el-link
        href="https://blog.csdn.net/Boale_H/article/details/120288101"
        target="_blank"
        >关于外链视频请求403报错问题参考：</el-link
      >
    </h2>
    <!-- 被监听的大视频窗口 -->
    <div class="videoContainerDom" id="videoContainerDom">
      <!-- 传送门到父级 -->
      <teleport to=".conSmallVideo" :disabled="isModel">
        <video
          class="videoTarget"
          id="videoTarget"
          v-if="xgSrc"
          :src="xgSrc"
          controls
          autoPlay
        ></video>
      </teleport>
    </div>

    <!-- 模拟滚动 -->
    <div style="height: 2000px"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

let isModel = ref(false);
let isFalse = ref(true);
let xgSrc = ref("");

onMounted(() => {
  xgSrc.value =
    "https://ckplayer-video.oss-cn-shanghai.aliyuncs.com/mp4/1_1920x1080.mp4";
  nextTick(() => {
    document.getElementById("videoTarget").volume = 0.2;
  });
  const { stop } = useIntersectionObserver(
    document.getElementById("videoContainerDom"),
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 布尔值 视口区域内 true 否则就是 false
      isFalse.value = isIntersecting;
      console.log("监听窗口是否在页面", isFalse.value);
      isModel.value = isFalse.value ? true : false;
    }
  );
});
</script>

<style lang="less" scoped>
.videoContainerDom {
  position: relative;
  width: 800px;
  height: 540px;
  .videoTarget {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
}
</style>

<template>
  <div class="box" :style="{ backgroundImage: `url(${dataImg})` }">
    <video ref="videoBoxRef" src="@/assets/video/05+.mp4" poster="@/assets/img/tt.jpg" style="width: 100%; height: 100%" loop @click="pauseVideo"></video>
    <div :class="[isShow ? 'none' : 'text_title']" v-show="showBtn == 'none' ? false : true">
      <em> vue3 + vue-router4.0 + vite + element-Plus </em>
    </div>
    <img class="img-btn" src="https://dm30webimages.lynkco.com.cn/LynkCoPortal/Content/images/icon_play@2x.png" alt="" @click="playVideo" :style="{ display: showBtn }" />
    <div class="xgTips"><span>播放/暂停</span><span class="shortcutKey">K</span></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import _ from "lodash";
import { dependencies, devDependencies } from "../../package.json";
// import { getWallpaper } from "@/api/welcome.js";
import * as objApi from "@/api/welcome.js";

const { getWallpaper } = objApi.default;
let dataImg = ref("");
const videoBoxRef = ref(null);
const showBtn = ref("block");
const isShow = ref(true);

const state = reactive({
  isPlayVideo: false, // 区分按键 k、播放/暂停
});

const playVideo = () => {
  showBtn.value = "none";
  videoBoxRef.value.play();
};

const pauseVideo = () => {
  showBtn.value = "block";
  videoBoxRef.value.pause();
};

const Wallpaper = async () => {
  const [err, data] = await getWallpaper();
  if (err) {
    return false;
  } else {
    console.log(data.data);
    dataImg.value = data.data;
    // dataImg.value = `https://img.alicdn.com/imgextra/i4/O1CN01tc92ri1YHA4hoBZu5_!!6000000003033-2-tps-1920-1300.png`;
  }
};
Wallpaper();

// 防抖监听按键
const ListenK = () => {
  document.onkeydown = _.debounce(({ key }) => {
    console.log("key:", key);
    if (key == "k") {
      state.isPlayVideo = !state.isPlayVideo;
      if (state.isPlayVideo) {
        // 播放
        playVideo();
      } else {
        // 暂停
        pauseVideo();
      }
    }
  }, 250);
};

const delStr = (str) => {
  //XXX 正则匹配到 不包含str中'bgColor'的部分
  let r = str.match(/^((?!bgColor).)+$/);
  // console.log(r);
  if (r) {
    return r[0];
  }
};

const colorArr = reactive(["#CCFF99", "#FFCC99", "#CCCCFF", "#FF6666", "#CC3399", "#FFFFFF"]);
// 取随机颜色
const randomColor = () => {
  return colorArr.sort(() => Math.random() - Math.random()).at(0);
};

let obj = reactive({ ...dependencies, ...devDependencies }),
  objArr = [];
let { entries, fromEntries } = Object;
let arr = entries(obj);

for (let item of arr) {
  // let r = item[0].replace(/\-(\w)/g, (_, word) => word.toUpperCase()); // '-'之后的字母转成大写
  // item[0] = r.replace(/\/(\w)/g, (_, word) => word.toUpperCase()); // '/'之后的字母转成大写
  objArr.push(fromEntries([item]));
}
objArr.forEach((item) => {
  item.bgColor = randomColor();
});
// console.log(objArr);

onMounted(() => {
  ListenK();
  setTimeout(() => {
    isShow.value = false;
  }, 1000);
});

onUnmounted(() => {
  document.onkeydown = null;
});
</script>

<style scoped lang="less">
.box {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  border-radius: 20px;

  video {
    position: relative;
    object-fit: cover;
    z-index: 1;
    border-radius: 10px;
  }

  .img-btn {
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 50%;
    cursor: pointer;
    zoom: 0.4;
    transform: translate(-50%, -50%);

    &:hover + .xgTips {
      visibility: visible;
    }
  }

  .xgTips {
    background-color: #323442;
    border-radius: 4px;
    color: #fff;
    cursor: default;
    font-size: 12px;
    padding: 10px;
    text-align: center;
    width: 100px;
    box-sizing: border-box;
    position: absolute;
    z-index: 4;
    left: 50%;
    transform: translateX(-50%);
    top: 38%;
    transition-delay: 0.05s !important;
    -webkit-transition-delay: 0.05s !important;
    transition-property: visibility;
    -webkit-transition-property: visibility;
    visibility: hidden;
    white-space: nowrap;

    .shortcutKey {
      align-items: center;
      background: #fff;
      border: 1px solid #fff;
      border-radius: 3px;
      color: #323442;
      display: flex;
      display: inline-flex;
      font-family: PingFang SC, DFPKingGothicGB-Medium, sans-serif;
      font-size: 13px;
      font-weight: 500;
      height: 18px;
      justify-content: center;
      line-height: 21px;
      margin: 0 5px;
      vertical-align: baseline;
      width: 18px;
    }
  }

  .animation-Box {
    transition: width 0.8s ease-out;
  }
}

.none {
  display: none;
}

.text_title {
  // border: 3px solid red;
  position: absolute;
  top: 10%;
  z-index: 2;
  font-size: 3vw;
  width: 63vw;
  height: 80px;
  transition: all 1s ease;
  font-weight: bold;
  user-select: none;
  text-shadow: 5px 5px 5px #ccc;
  animation-name: zoomInDown;
  animation-duration: 1s;

  // animation-delay: 1.2s;
  @keyframes zoomInDown {
    from {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    60% {
      opacity: 1;
      transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
}
</style>

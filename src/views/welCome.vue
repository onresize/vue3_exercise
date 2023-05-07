<template>
  <div class="box" :style="{ backgroundImage: `url(${dataImg})` }">
    <div :class="[isShow ? 'none' : 'text_title']">
      <em> vue3 + vue-router4.0 + vite + element-Plus </em>
    </div>
    <div
      :class="[
        'flex',
        'animation-Box',
        !isShow ? 'infoZIndex' : 'beforeZIndex',
      ]"
      style="overflow-x: hidden"
    >
      <el-tag v-for="item in objArr" :key="item" class="tag" color="#000">
        <div
          v-for="(val, key) in item"
          :key="val"
          :style="{ color: item.bgColor }"
        >
          {{ delStr(key) }}
        </div>
      </el-tag>
    </div>
    <div class="bottom_box">
      <div class="card">
        <div class="content">
          <div class="front">
            <h3 class="title linear colorful">请作者喝杯冰阔落🍻</h3>
            <h3 class="title-pay">
              使用微信支付 <span>鼠标悬停使用支付宝支付</span>
            </h3>
            <img
              class="subtitle-img"
              src="../assets/img/wx.jpg"
              alt=""
              srcset=""
            />
          </div>

          <div class="back">
            <h3 class="title">请作者喝杯咖啡☕️</h3>
            <h3 class="title-pay">
              使用支付宝支付 <span>移开鼠标使用微信支付</span>
            </h3>
            <img
              class="subtitle-img"
              src="../assets/img/zfb.jpg"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
      <!-- <iframe
        width="500"
        height="300"
        :src="'https://www.bilibili.com'"
        frameborder="3"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
        scrolling="auto"
      ></iframe> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { dependencies, devDependencies } from "../../package.json";
import { getWallpaper } from "@/api/welcome.js";

let dataImg = ref("");
const isShow = ref(true);

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

onMounted(() => {
  setTimeout(() => {
    isShow.value = false;
  }, 1000);
});

const delStr = (str) => {
  //XXX 正则匹配到 不包含str中'bgColor'的部分
  let r = str.match(/^((?!bgColor).)+$/);
  // console.log(r);
  if (r) {
    return r[0];
  }
};

const colorArr = reactive([
  "#CCFF99",
  "#FFCC99",
  "#CCCCFF",
  "#FF6666",
  "#CC3399",
  "#FFFFFF",
]);
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
</script>

<style scoped lang="less">
.box {
  height: 97%;
  position: relative;
  top: 30px;
  bottom: 30px;
  border-radius: 20px;
  background-origin: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .animation-Box {
    transition: width .8s ease-out;
  }
}
.none {
  display: none;
}
.text_title {
  // border: 3px solid red;
  position: absolute;
  top: 100px;
  left: calc(50% - 31vw);
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
.bottom_box {
  animation-name: rightToLeft;
  animation-duration: 1s;
  position: absolute;
  top: 440px;
  left: calc(100% - 55vw);

  @keyframes rightToLeft {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(0);
    }
  }

  .card {
    margin-top: 10px;
    height: 32vh;
    width: 38vw;
    max-width: 450px;
    cursor: pointer;
  }

  .content {
    border-radius: 10px;
    text-align: center;
    position: relative;
    transition: all 2.25s;
    background-color: #00c250;
    padding: 5em;
    transform-style: preserve-3d;
    height: 100%;
    margin-left: 15px;
  }

  .card:hover .content {
    transform: rotateY(0.5turn);
  }

  .front,
  .back {
    border-radius: 10px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 1em;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .title {
    transform: translateZ(5rem);
    font-size: 1.7rem;
  }
  .subtitle-img {
    transform: translateZ(2rem);
    margin-top: 15px;
    border-radius: 10px;
    width: 18vw;
    max-width: 360px;
    height: 28vh;
    max-height: 380px;
  }
  .subtitle {
    transform: translateZ(2rem);
  }

  .back {
    transform: rotateY(0.5turn);
    background-color: #1677ff;
  }

  .title-pay {
    transform: translateZ(3rem);
  }
  .title-pay span {
    transform: translateZ(3rem);
    font-size: 0.7em;
  }
}
.flex {
  border: 3px solid transparent;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #333 inset;
  padding: 10px 0 5px 0;
  overflow: scroll;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: calc(100vw - 400px);
  height: 220px;
  animation-name: leftToRight;
  animation-duration: 1s;
  position: absolute;
  top: 200px;
  left: 40px;

  @keyframes leftToRight {
    from {
      transform: translateX(-100vw);
    }
    to {
      transform: translateX(0);
    }
  }

  .tag {
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    margin: 3px;
    text-shadow: 0 0 0.1rem #00c6ff, 0 0 0.2rem #00c6ff, 0 0 0.3rem #00c6ff,
      0 0 0.4rem #00c6ff;
  }
}
.infoZIndex {
  z-index: 1;
}
.beforeZIndex {
  z-index: -1;
}

@property --offset {
  syntax: "<length>";
  inherits: false;
  initial-value: 5px;
}

@property --deg {
  syntax: "<angle>";
  inherits: false;
  initial-value: 1deg;
}

.linear {
  color: #000;
  cursor: pointer;
}

.linear {
  color: transparent;
  background: repeating-radial-gradient(
    circle at 0 0,
    #000 calc(var(--offset) - 5px),
    #000 var(--offset),
    #fff var(--offset),
    #fff calc(var(--offset) + 5px)
  );
  -webkit-background-clip: text;
  animation: move 0.5s infinite linear;
}

.colorful {
  background-image: linear-gradient(
      var(--deg),
      red,
      orange,
      yellow,
      green,
      cyan,
      blue,
      darkviolet
    ),
    repeating-radial-gradient(
      circle at 0 0,
      #000 calc(var(--offset) - 5px),
      #000 var(--offset),
      #fff var(--offset),
      #fff calc(var(--offset) + 5px)
    );
  background-blend-mode: screen;
  animation: move 0.5s infinite linear, rotate 20s infinite linear;
}

@keyframes move {
  to {
    --offset: 15px;
  }
}

@keyframes rotate {
  to {
    --deg: 361deg;
  }
}
</style>

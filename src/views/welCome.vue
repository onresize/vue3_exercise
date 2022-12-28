<template>
  <div>
    <div className="text_title">
      vue3 + vue-router4.0 + vite2 + element-Plus
    </div>
    <div class="flex">
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
            <h3 class="title">请作者喝杯冰阔落🍻</h3>
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { dependencies, devDependencies } from "../../package.json";

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
console.log(objArr);
</script>

<style scoped lang="less">
.text_title {
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  zoom: 2.5;
  user-select: none;
  text-shadow: 5px 5px 5px #ccffcc;
}
.bottom_box {
  width: calc(100vw - 300px);
  height: 300px;
  display: flex;
  justify-content: center;

  .card {
    margin-top: 10px;
    height: 41vh;
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
    width: 28vw;
    max-width: 360px;
    height: 38vh;
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: calc(100vw - 300px);

  .tag {
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    margin: 3px;
    text-shadow: 0 0 0.1rem #00c6ff, 0 0 0.2rem #00c6ff, 0 0 0.3rem #00c6ff,
      0 0 0.4rem #00c6ff;
  }
}
</style>

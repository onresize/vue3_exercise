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

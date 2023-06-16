<template>
  <div class="mixinHeight">
    <h4>
      vite + vue3中不能使用require方式引入静态资源、可用两种方式替代
      <br />
      1.直接使用 new URL(url, import.meta.url) 语法
      <br />
      2. import xxx from 'xxx.jpg'
    </h4>
    <div class="lazy-com-box" id="scrollBox">
      <picCard class="item-box" v-for="(item, i) in pArr" :key="i" :pTitle="item.title" :pic="item.src"></picCard>
    </div>
    <el-button v-show="isShow" circle title="返回顶部" class="toTop" @click.prevent="toTopClick">👆</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, getCurrentInstance, nextTick } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import picCard from "@/myCom/lazyCom/index.vue";
// import picCard from "@/myCom/lazyCom/asyncCom.vue";
import { findNew } from "./apiArr.js";
import { useLazyData } from "@/hooks/useLazyData.js";

// 获取全局定义的方法
let { appContext, proxy } = getCurrentInstance();
console.log(appContext.config.globalProperties);

let pArr = ref([
  {
    title: "img0",
    src: new URL("@/assets/lazyPic/1.jpg", import.meta.url).href,
  },
  {
    title: "img1",
    src: new URL("@/assets/lazyPic/2.jpg", import.meta.url).href,
  },
  {
    title: "img2",
    src: new URL("@/assets/lazyPic/3.jpg", import.meta.url).href,
  },
  {
    title: "img3",
    src: new URL("@/assets/lazyPic/4.jpg", import.meta.url).href,
  },
  {
    title: "img4",
    src: new URL("@/assets/lazyPic/5.jpg", import.meta.url).href,
  },
  {
    title: "img5",
    src: new URL("@/assets/lazyPic/6.jpg", import.meta.url).href,
  },
  {
    title: "img6",
    src: new URL("@/assets/lazyPic/7.jpg", import.meta.url).href,
  },
  {
    title: "img7",
    src: new URL("@/assets/lazyPic/8.jpg", import.meta.url).href,
  },
]);

let isShow = ref(false);
let pageNum = ref(0);

const rolling = async () => {
  // 滚动过的距离
  var scrollTop = document.getElementById("scrollBox").scrollTop;
  // 当前可视区的高度
  var clientHeight = document.getElementById("scrollBox").clientHeight;
  // 滚动条的长度
  var scrollHeight = document.getElementById("scrollBox").scrollHeight;

  // 当滚动过的距离+可视区的高度>=滚动条长度时，就相当于滚动到了底部
  if (Math.ceil(scrollTop) + Math.ceil(clientHeight) + 5 >= scrollHeight) {
    pageNum.value++;
    console.log("滚动到底部------------了", pArr.value.length);
    if (pArr.value.length >= 26) {
      console.log("执行return");
      pageNum.value = 0;
      appContext.config.globalProperties.$D(messageWarn, 400);
      return;
    }
    const { result: res } = await findNew(pageNum.value);
    console.log("获取数据:", res);
    setTimeout(() => {
      pArr.value = [...pArr.value, ...res];
    }, 1000);
  }
};

const messageWarn = () => {
  isShow.value = true;
  ElMessage.warning("暂无更多数据 🎉🎉🎉");
};

const toTopClick = () => {
  document.getElementById("scrollBox").scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
  isShow.value = false;
};

onMounted(() => {
  document.getElementById("scrollBox").addEventListener("scroll", rolling, false);
});
</script>

<style scoped lang="less">
.lazy-com-box {
  width: 505px;
  height: 640px;
  border: 3px solid red;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
  box-sizing: border-box;
  position: relative;
  .item-box {
    margin: 7px;
  }
}
.toTop {
  position: absolute;
  left: 830px;
  bottom: 50px;
}
</style>

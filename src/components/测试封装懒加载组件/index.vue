<template>
  <div>
    <h4>
      vite + vue3中不能使用require方式引入静态资源、可用两种方式替代
      <br />
      1.直接使用 new URL(url, import.meta.url) 语法
      <br />
      2. import xxx from 'xxx.jpg'
    </h4>
    <div class="lazy-com-box">
      <!-- <div class="box" id="targetID" ref="targetID"></div> -->
      <picCard
        class="item-box"
        v-for="(item, i) in pArr"
        :key="i"
        :pIndex="i"
        :pic="item.src"
      ></picCard>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
// import picCard from "@/myCom/lazyCom/index.vue";
import picCard from "@/myCom/lazyCom/asyncCom.vue";
import { findNew } from "./apiArr.js";
import { useLazyData } from "@/hooks/useLazyData.js";

let isFalse = ref(true);
let pArr = ref(
  new Array(
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
    {
      title: "img8",
      src: new URL("@/assets/lazyPic/9.jpg", import.meta.url).href,
    },
    {
      title: "img9",
      src: new URL("@/assets/lazyPic/10.jpg", import.meta.url).href,
    },
    {
      title: "img10",
      src: new URL("@/assets/lazyPic/11.jpg", import.meta.url).href,
    },
    {
      title: "img11",
      src: new URL("@/assets/lazyPic/12.jpg", import.meta.url).href,
    },
    {
      title: "img12",
      src: new URL("@/assets/lazyPic/13.jpg", import.meta.url).href,
    },
    {
      title: "img13",
      src: new URL("@/assets/lazyPic/14.jpg", import.meta.url).href,
    },
    {
      title: "img14",
      src: new URL("@/assets/lazyPic/15.jpg", import.meta.url).href,
    },
    {
      title: "img15",
      src: new URL("@/assets/lazyPic/16.jpg", import.meta.url).href,
    },
    {
      title: "img16",
      src: new URL("@/assets/lazyPic/17.jpg", import.meta.url).href,
    },
    {
      title: "img17",
      src: new URL("@/assets/lazyPic/18.jpg", import.meta.url).href,
    },
    {
      title: "img18",
      src: new URL("@/assets/lazyPic/19.jpg", import.meta.url).href,
    },
    {
      title: "img19",
      src: new URL("@/assets/lazyPic/20.jpg", import.meta.url).href,
    },
    {
      title: "img20",
      src: new URL("@/assets/lazyPic/21.jpg", import.meta.url).href,
    },
    {
      title: "img21",
      src: new URL("@/assets/lazyPic/22.jpg", import.meta.url).href,
    },
    {
      title: "img22",
      src: new URL("@/assets/lazyPic/23.jpg", import.meta.url).href,
    },
    {
      title: "img23",
      src: new URL("@/assets/lazyPic/24.jpg", import.meta.url).href,
    },
    {
      title: "img24",
      src: new URL("@/assets/lazyPic/25.jpg", import.meta.url).href,
    },
    {
      title: "img25",
      src: new URL("@/assets/lazyPic/26.jpg", import.meta.url).href,
    }
  )
);
onMounted(() => {
  //XXX HOOKs方式
  // const result = useLazyData(document.getElementById("targetID"), findNew);
  // XXX 直接写方式、不用考虑pinia传值
  // const { stop } = useIntersectionObserver(
  //   document.getElementById("targetID"),
  //   ([{ isIntersecting }], observerElement) => {
  //     // isIntersecting 布尔值 视口区域内 true 否则就是 false
  //     isFalse.value = isIntersecting;
  //     console.log("监听窗口是否在页面", isIntersecting);
  //     if (!isIntersecting) {
  //       findNew().then((data) => {
  //         console.log("获取数据：", data);
  //         // pArr.value = [...data.result, ...pArr.value];
  //       });
  //     }
  //   }
  // );
});
</script>

<style scoped lang="less">
.lazy-com-box {
  width: 500px;
  height: 600px;
  border: 3px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
  box-sizing: border-box;
  position: relative;
  .box {
    position: absolute;
    width: 470px;
    height: 630px;
    border: 3px solid green;
  }
  .item-box {
    margin-top: 10px;
  }
}
</style>

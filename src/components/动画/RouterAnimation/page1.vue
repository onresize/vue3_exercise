<template>
  <div class="page1 w240">
    <colaCom class="cola_box"> </colaCom>
    <h2 class="text_box" @click="emitCount">{{ PiniaStore.shoesCount }}</h2>
    <!-- <h2 @click="emitCount">{{ VuexStore.state.shoesCount }}</h2> -->
    <h3>getters中的值：{{ PiniaStore.doubleCount }}</h3>
    <h3>getters传参累加：{{ PiniaStore.doubleCountPlus(3) }}</h3>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { gsap } from "gsap";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import { useMainStore } from "@/store/pinia.ts";
import { setStorage, getStorage } from "@/utils/funcTools";
import colaCom from "@/myCom/colaCom/index.vue";

const route = useRoute();
const VuexStore = useStore();
const PiniaStore = useMainStore();
console.log("pinia中getters中的值：", PiniaStore.doubleCount, PiniaStore.doubleCountPlus(3));

if (getStorage("shoesCount")) {
  PiniaStore.shoesCount = getStorage("shoesCount");
}

const x = ref(100);
const y = ref(100);
const scale = ref(1);
const rotation = ref(0);

// 累加
const emitCount = () => {
  // VuexStore.commit("addCount", 1);

  // 1.pinia直接操作state方法一
  // PiniaStore.shoesCount++;

  // 2.pinia直接操作state方法二、（可修改多个属性）
  // PiniaStore.$patch({
  //   shoesCount: PiniaStore.shoesCount + 1,
  // });

  // 3.pinia调用actions方法三
  // PiniaStore.addCount(2);
  PiniaStore.addDelayCount(2);
  setStorage("shoesCount", PiniaStore.shoesCount);
};

onBeforeRouteLeave((to) => {
  console.log("page1路由离开：", to);
  if (to.name == "page2") {
    to.query = {
      x: x.value,
      y: y.value,
      scale: scale.value,
      rotation: rotation.value,
    };
  }
});

onMounted(() => {
  // 如果没有传入值, 则初始化
  if (!route.query.x) {
    console.log("init");
    gsap.set(".page1", {
      x: x.value,
      y: y.value,
      scale: scale.value,
      rotation: rotation.value,
    });
    return;
  }

  // 如果有传入值, 则使用 fromTo 动画
  if (route.query.x) {
    console.log("fromTo");
    //XXX 这里的'.page1'和标签上的class相互对应
    gsap.fromTo(
      ".page1",
      {
        x: route.query.x,
        y: route.query.y,
        scale: route.query.scale,
        rotation: route.query.rotation,
      },
      {
        x: x.value,
        y: y.value,
        scale: scale.value,
        rotation: rotation.value,
        duration: 1,
      }
    );
    return;
  }
});
</script>

<style scoped lang="less">
.w240 {
  width: 240px;
  height: 240px;
  line-height: 240px;
  text-align: end;
  border-radius: 50%;
  // background-image: url("@/assets/img/shoes.webp");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // border: 2px solid red;

  .cola_box {
    position: relative;
  }

  .text_box {
    position: absolute;
    top: 0px;
    right: 0px;
  }
}

h2 {
  user-select: none;
  cursor: pointer;
}
</style>

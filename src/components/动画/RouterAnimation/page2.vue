<template>
  <div class="page2 w240">
    <colaCom class="cola_box"> </colaCom>
    <!-- <h2 @click="emitCount">{{ Store.state.shoesCount }}</h2> -->
    <h2 class="text_box" @click="emitCount1">{{ PiniaStore.shoesCount }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { gsap } from "gsap";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import { useMainStore } from "@/store/pinia.ts";
import { setStorage, getStorage } from "@/utils/funcTools";
import colaCom from "@/myCom/colaCom/index.vue";

const route = useRoute();
const Store = useStore();
const PiniaStore = useMainStore();

const count = ref(0);
const toX = ref(200);
const toY = ref(200);
const toScale = ref(1.2);
const toRotation = ref(90);

if (getStorage("shoesCount")) {
  PiniaStore.shoesCount = getStorage("shoesCount");
}

const emitCount = () => {
  Store.dispatch("asyncAddCount", 1);
};
const emitCount1 = () => {
  PiniaStore.addDelayCount(1);
  setStorage("shoesCount", PiniaStore.shoesCount);
};

onBeforeRouteLeave((to) => {
  console.log("page2路由离开：", to);
  if (to.name == "page1") {
    to.query = {
      x: toX.value,
      y: toY.value,
      scale: toScale.value,
      rotation: toRotation.value,
    };
  }
});

onMounted(() => {
  console.log("执行了mounted");

  //XXX 这里的'.page2'和标签上的class相互对应
  gsap.fromTo(
    ".page2",
    {
      x: route.query.x,
      y: route.query.y,
      scale: route.query.scale,
      rotation: route.query.rotation,
    },
    {
      x: toX.value,
      y: toY.value,
      scale: toScale.value,
      rotation: toRotation.value,
      duration: 1,
    }
  );
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

<template>
  <div class="page2 w240">
    <h2 @click="emitCount">{{ Store.state.shoesCount }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { gsap } from "gsap";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const Store = useStore();

const count = ref(0);
const toX = ref(200);
const toY = ref(200);
const toScale = ref(1.2);
const toRotation = ref(90);

const emitCount = () => {
  Store.dispatch("asyncAddCount", 1);
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

<style scoped>
.w240 {
  width: 240px;
  height: 240px;
  line-height: 240px;
  text-align: end;
  border-radius: 50%;
  background-image: url("https://www.nikestore.com.cn/prod%2FNIKEOUTLETS%2FDIP-g15p1800g3quekj9g6bc%2FUNEX%2FDV1681-100-%E5%88%97%E8%A1%A8%E5%9B%BE-1.png?etag=1657603532165");
  background-size: 100% 83%;
  background-repeat: no-repeat;
}
h2 {
  user-select: none;
  cursor: pointer;
}
</style>

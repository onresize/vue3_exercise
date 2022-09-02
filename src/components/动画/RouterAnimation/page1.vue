<template>
  <div class="page1 w240">
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

const x = ref(100);
const y = ref(100);
const scale = ref(1);
const rotation = ref(0);

const emitCount = () => {
  Store.commit("addCount", 1);
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

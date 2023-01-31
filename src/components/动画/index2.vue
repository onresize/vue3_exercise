<template>
  <div>
    <br />
    <el-input v-model="keyword" style="width: 200px" />
    <transition-group
      tag="ul"
      name="coder"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <li v-for="(item, index) in showNames" :key="item" :data-index="index">
        {{ item }}
      </li>
    </transition-group>
    <label
      ><b
        >v-model搭配computed对象形式get、set的用法：（输入数字会自动计算除以2、如果该值隐式转换为false会直接赋空）</b
      ></label
    >
    <el-input v-model="modelVal" style="width: 200px" />
  </div>
  <mark>待看：https://blog.csdn.net/u014418267/article/details/110451685</mark>
</template>

<script setup>
import { ref, computed } from "vue";
import gsap from "gsap";
// npm install gsap

const names = ref([
  "abc",
  "cba",
  "nba",
  "why",
  "lilei",
  "hmm",
  "kobe",
  "james",
]);

const keyword = ref("");
const aaa = ref(100);
const modelVal = computed({
  get() {
    console.log("触发get");
    if (!Boolean(aaa.value)) return (aaa.value = "");
    return aaa.value * 2;
  },
  set(val) {
    console.log("触发set", val);
    return (aaa.value = val / 4);
  },
});

let showNames = computed(() =>
  names.value.filter((item) => item.indexOf(keyword.value) !== -1)
);

function beforeEnter(el) {
  el.style.opacity = 0;
  el.style.height = 0;
}
function enter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: "1.5em",
    delay: el.dataset.index * 0.5,
    onComplete: done,
  });
}
function leave(el, done) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.2,
    onComplete: done,
  });
}
</script>

<style scoped></style>

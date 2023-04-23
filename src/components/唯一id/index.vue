<template>
  <div class="box">
    <h2>唯一id两种形式</h2>
    <mark>1.第三方uuid模块 import { v4 as uuidv4 } from 'uuid'</mark>
    <br />
    <br />
    <mark>2.系统内置加密模块、直接使用 console.log(crypto.randomUUID())</mark>
    <h1>
      <!-- XXX切换页面数字状态仍在累加 -->
      使用keepAlive对此组件做了缓存默认执行onActivated、onDeactivated周期、验证组件是否缓存：{{
        tim
      }}
    </h1>
    <h3>PS：缓存使用过多消耗内存</h3>
    <pre>
    注意：keep-alive中的include匹配name的组件在vue3中、没有name
    <mark>方式一：是通过写两个script标签来解决，一个使用setup，一个不使用</mark>
    &lt;script>
       export default {
         name: "onlyId",
       }
    &lt;/script>
    <br>
    <mark>方式二：借助vite-plugin-vue-setup-extend插件</mark>
    npm install vite-plugin-vue-setup-extend --save

    1、配置vite.config.ts
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import VueSetupExtend from 'vite-plugin-vue-setup-extend'
    export default defineConfig({
      plugins: [
        vue(),
        VueSetupExtend()
      ]
    })

    2、在组件中使用
    &lt;script name='testAddName'>&lt;/script>
    &lt;script setup name='testAddName'>&lt;/script>
  </pre>
  </div>
</template>

<!-- <script>
export default {
  name: "onlyId",
};
</script> -->
<script setup name="onlyId">
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
} from "vue";
import { useRoute } from "vue-router";

// const route = useRoute();
// console.log("唯一id:", crypto.randomUUID());
let obj = reactive({ arr: [1, 2, 3, 4, 5, 6] });

let tim = ref(0);
let r = setInterval(() => {
  tim.value++;
  if (tim.value == 160) {
    clearInterval(r);
    tim.value = 0;
    return;
  }
}, 1000);

// 写多个if判断时、if内部有定时器、return放定时器内外的区别、return放定时器外部符合预期
onMounted(() => {
  console.log("执行onMounted------------");
  for (let i = 0; i < obj.arr.length; i++) {
    if (obj.arr[i] == 1) {
      setTimeout(() => {
        console.log(111111);
      }, 1000);
      return;
    }
    if (obj.arr[i] == 2) {
      console.log(222222);
    }
    if (obj.arr[i] == 3) {
      console.log(333333);
    }
  }
});
onActivated(() => {
  console.log("执行onActivated------------");
});
onDeactivated(() => {
  console.log("执行onDeactivated------------");
});
onUnmounted(() => {
  console.log("执行onUnmounted------------");
});
</script>

<style scoped>
.box {
  overflow-y: scroll;
}
pre {
  border: 2px solid red;
  font-size: 18px;
  width: fit-content;
  border-radius: 10px;
  padding: 10px 30px 0 0;
  font-family: "微软雅黑";
}
</style>

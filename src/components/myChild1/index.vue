<template>
  <div class="mixinHeight">
    <h3>我是父组件、这里验证vue3.0版本使用setup()选项的方式父组件通过ref获取子组件的方法 和 参数</h3>
    <h3>这里子组件不需要 和 vue3.2一样defineExpose暴露方法和参数、直接用就行</h3>
    <h3>我是父组件: {{ title }}</h3>
    <button @click="handleClick">调用子组件的方法</button>
    <hr />
    <myChild ref="child" v-model:title="title" @childClick="childClick" msg="父组件msg" />
  </div>
</template>

<script>
import { ref } from "vue";
import myChild from "./myChild.vue";

export default {
  components: {
    myChild,
  },
  setup() {
    // 获取子组件
    const child = ref();
    const title = ref("默认title");
    const handleClick = () => {
      // 调用子组件的方法
      child.value.childMethod();
    };
    const childClick = (e) => {
      console.log("子组件传递的方法：", e);
    };
    return {
      title,
      child,
      handleClick,
      childClick,
    };
  },
};
</script>

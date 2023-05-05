<template>
  <div>
    <h3>
      父、子、孙元素分别hover没有像js一样阻止冒泡方法、想要实现效果：用js方法onmouseover和onmouseout处理
    </h3>
    <br />
    <h3>useAttrs()向下传递参数 和 useSlots()子组件获取父组件中的插槽</h3>
    <div
      class="father-box"
      :style="{ backgroundColor: PiniaStore.fatherColor, color: pColor }"
      @mouseover="mouseoverClick"
      @mouseout="mouseoutClick"
    >
      <h2>父组件: {{ obj.age }}</h2>
      <child v-bind="obj">
        <!-- 默认插槽 -->
        <template v-slot>
          <h4>
            默认插槽: <span>{{ obj.age }}</span>
          </h4>
        </template>
        <!-- 头部插槽 -->
        <template #header>
          <h4>
            头部插槽: <span>{{ obj.age }}</span>
          </h4>
        </template>
        <!-- 内容插槽 -->
        <template #content>
          <h4>
            内容插槽: <span>{{ obj.age }}</span>
          </h4>
        </template>
        <!-- 底部插槽 -->
        <template v-slot:footer>
          <h4>
            底部插槽: <span>{{ obj.age }}</span>
          </h4>
        </template>
      </child>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";
import child from "./child.vue";

const PiniaStore = useMainStore(pinia);

const pColor = ref("#000");
const pAge = ref("20");
const obj = ref({
  age: "12",
});

const mouseoverClick = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // console.log("父组件鼠标移入：");
  PiniaStore.fatherColor = "#ffcccc";
  pColor.value = "#fff";
};
const mouseoutClick = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // console.log("父组件鼠标移出：");
  PiniaStore.fatherColor = "#fff";
  pColor.value = "#000";
};
</script>

<style scoped lang="less">
.father-box {
  width: 500px;
  height: 550px;
  border: 3px solid red;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.6s ease-out;
  h2 {
    width: 100%;
    text-align: center;
  }
  span {
    color: red;
    margin-right: 10px;
  }
}
</style>

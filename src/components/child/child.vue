<template>
  <el-card>
    <div class="flex">
      <div class="box" v-for="(item, i) in list" :key="i">
        <div class="bb">
          <h3>name:{{ item.name }}</h3>
        </div>
        <div class="bb">
          <h3>title:{{ item.title }}</h3>
        </div>
        <div class="bb">
          <button @click="clickBtn(item.title)">触发事件给父组件</button>
        </div>
        <!-- 子组件computed拿到props的值： -->
        <h3>Props.abc的值: {{ Props.abc }}</h3>
        <h3>computed计算后的值: {{ newList }}</h3>
        <h3>赋值变量 r 的值: {{ r }}</h3>
        <h3>赋值响应式变量 z 的值: {{ z }}</h3>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";

let arr = reactive<number[]>([1, 4, 5]);
const getAA = () => {
  console.log(
    "父组件调用子组件中的getAA()方法:",
    new Date().toLocaleDateString()
  );
};

// type obj = {
//   name: string;
//   title: string;
// };
// type props = {
//   list?: obj[];
//   abc: Number;
// };

// 设置定义的接口 父组件传参的默认值
// withDefaults(defineProps<props>(), {
//   list: () => [{ name: "name", title: "标题" }],
// });
let Props = defineProps(["list", "abc"]);

let r = Props.abc + "****";

let z = ref("");
z.value = Props.abc + "++";
// 接收到父组件的值并使用computed计算他的值;'
let newList = computed(() => {
  return Props.abc + "----";
});
console.log("拿到修改后的值", newList.value);

let myAbc = computed(() => Props.abc);

watch(
  myAbc,
  (val) => {
    console.log("子组件监听props的abc值", val);
  },
  {
    immediate: true,
    deep: true,
  }
);

const emit = defineEmits(["getTitle"]);
const clickBtn = (title: string): void => {
  emit("getTitle", title);
};

// 子组件中定义的arr数组通过defineExpose暴露给父组件、通过ref拿到这个属性
defineExpose({
  arr, // 数组属性
  getAA, // 方法
});
</script>

<style scoped lang="less">
.flex {
  display: flex;
  justify-content: space-between;
}

.box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 400px;
  border-radius: 15px;
  border: 2px solid black;

  .bb {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>

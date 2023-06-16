<template>
  <el-card class="mixinHeight">
    <table border style="width: 600px">
      <thead>
        <tr align="center">
          <th>名称</th>
          <th>数量</th>
          <th>价格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in dataList" :key="i" align="center">
          <td>{{ item.name }}：{{ item.price }}元</td>
          <td>
            <button @click="reduce(item)">-</button>
            {{ item.num }}
            <button @click="add(item)">+</button>
          </td>
          <td>{{ item.price * item.num }}</td>
          <td>
            <button @click="del(i)">删除</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr align="center">
          <td></td>
          <td></td>
          <td></td>
          <td>总价：{{ total }}</td>
        </tr>
      </tfoot>
    </table>
    <h3>computed传参的值：{{ r }}</h3>
    <div style="display: flex">
      <div v-for="(item, i) in dataList" :key="i">
        <el-button @click="myComputed(item.price)" class="el_btn"> computed传参的用法 </el-button>
      </div>
    </div>
    <br />
    <el-select v-model="value" multiple filterable allow-create default-first-option :reserve-keyword="false" placeholder="展示闪动动画" class="apply-shake">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";

let r = ref<string | number>(0);
let total = ref(0);
let price = ref<number | string>(1);
type shop = {
  name: string;
  num: number;
  price: number;
};
let dataList = reactive<shop[]>([
  { name: "拖鞋", num: 1, price: 20 },
  { name: "袜子", num: 1, price: 10 },
  { name: "衣服", num: 1, price: 120 },
  { name: "鞋子", num: 1, price: 200 },
]);
total = computed<number>(() =>
  dataList.reduce((pre, v) => {
    return pre + v.num * v.price;
  }, 0)
);
const reduce = (item: shop): void => {
  item.num--;
};
const add = (item: shop): void => {
  item.num++;
};
const del = (i: number): void => {
  dataList.splice(i, 1);
};
// 演示computed传参
const myComputed = computed(() => (price: number) => {
  console.log("价钱", price);
  r.value = price;
});
onMounted(() => {
  console.log("总价total：", total.value);
});

const value = ref<string[]>([]);
const options = [
  {
    value: "HTML",
    label: "HTML",
  },
  {
    value: "CSS",
    label: "CSS",
  },
  {
    value: "JavaScript",
    label: "JavaScript",
  },
];

watch(
  value,
  (val) => {
    console.log("监听select值----", val);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped>
.el_btn {
  margin: 0 10px 0 0;
}
.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

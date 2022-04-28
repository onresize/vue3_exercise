<template>
  <el-card class="card">

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
          <td>{{ item.name }}</td>
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
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
let total = ref<number | string>(0);

let price = ref<number | string>(1); //$0
type shop = {
  name: string;
  num: number;
  price: number;
};
let dataList = reactive<shop[]>([
  { name: "拖鞋", num: 1, price: 20 },
  { name: "袜子", num: 3, price: 10 },
  { name: "衣服", num: 1, price: 120 },
  { name: "鞋子", num: 4, price: 200 },
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
</script>

<style scoped>
.card {
  width: 99%;
  height: 99%;
}
</style>

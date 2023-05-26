<template>
  <div class="right_box">
    <div
      v-if="PiniaStore.isShowRightChart"
      class="chart"
      ref="pieChartRef"
    ></div>
    <div v-else class="v_for_list">
      <div v-for="(itm, idx) in tabList" :key="idx" class="item">test</div>
    </div>
  </div>
</template>

<script>
import publicFunc from "@/mixins/publicFunc";

export default {
  mixins: [publicFunc],
};
</script>

<script setup>
import {
  ref,
  watch,
  getCurrentInstance,
  nextTick,
  onUnmounted,
} from "vue";
import { useMainStore } from "@/store/pinia.ts";
import * as echarts from "echarts";
import "echarts-gl";

const PiniaStore = useMainStore();
const { appContext, proxy } = getCurrentInstance();

let statusChartVal = ref(null);
let pieChartRef = ref("pieChartRef");
let tabList = ref([]);

const initChart = () => {
  const statusChart = echarts.init(pieChartRef.value);
  statusChartVal.value = statusChart;
  var pieData = [
    {
      value: 58,
      name: "相邻纠纷",
    },
    {
      value: 42,
      name: "物业及其管理",
    },
    {
      value: 22,
      name: "用水排水通行",
    },
    {
      value: 20,
      name: "相邻污染损害",
    },
    {
      value: 6,
      name: "城市管理",
    },
    {
      value: 4,
      name: "其他",
    },
  ];
  var xData = [
    "相邻纠纷",
    "物业及其管理",
    "用水排水通行",
    "相邻污染损害",
    "城市管理",
    "其他",
  ];
  const option = proxy.getPie2D(pieData, xData, 240, 28, 26, 0.5);
  statusChart.setOption(option);
};

const destroyChart = () => {
  statusChartVal.value?.dispose();
};

watch(
  () => PiniaStore.isShowRightChart,
  async (val) => {
    console.log("监听到当前isShowRightChart：", val);
    if (val) {
      await nextTick();
      console.log("加载charts----------");
      initChart();
    } else {
      destroyChart();
      console.log("加载列表----------");
      const res = await proxy.awaitPromise(Array(5));
      console.log("请求的res", res);
      tabList.value = res;
    }
  },
  { immediate: true, deep: true }
);

onUnmounted(() => {
  destroyChart();
  PiniaStore.changeRightChartShow(true);
});
</script>

<style scoped lang='less'>
.right_box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .chart {
    width: 100%;
    height: 700px;
    box-sizing: border-box;
    border: 3px solid red;
  }
  .v_for_list {
    width: 100%;
    height: 300px;
    padding: 5px;
    box-sizing: border-box;
    border: 3px solid black;
    .item {
      box-sizing: border-box;
      width: 100%;
      height: 54px;
      line-height: 54px;
      text-align: center;
      font-size: 20px;
      margin: 3px 0;
      border: 3px solid red;
    }
  }
}
</style>

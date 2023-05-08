<template>
  <div class="box">
    <h3>基于vue3封装的瀑布流组件、CSS和JS两种模式</h3>
    <el-link href="https://blog.csdn.net/Dandrose/article/details/130221417">
      v3参考：
    </el-link>
    <el-link href="https://blog.csdn.net/Dandrose/article/details/128197705">
      v2参考：
    </el-link>
    <div style="height: calc(100vh - 200px); overflow-y: auto">
      <Waterfall
        :images="imgList"
        :columnCount="2"
        :columnGap="30"
        :width="600"
        mode="JS"
        backgroundColor="#F2F4F8"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Waterfall from "@/myCom/waterfall/waterfall.vue";

const imgList = ref([
  {
    title: "image-0",
    src: "https://img0.baidu.com/it/u=1346293879,1216188986&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  },
  {
    title: "image-1",
    src: "https://img1.baidu.com/it/u=3455772487,1839910736&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  },
  {
    title: "image-2",
    src: "https://img0.baidu.com/it/u=2894575446,206838321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082",
  },
  {
    title: "image-3",
    src: "https://img0.baidu.com/it/u=3668818600,4198960452&fm=253&fmt=auto?w=1280&h=800",
  },
  {
    title: "image-4",
    src: "https://img1.baidu.com/it/u=293889573,3208996596&fm=253&fmt=auto?w=1422&h=800",
  },
  {
    title: "image-5",
    src: "https://img0.baidu.com/it/u=3256563557,2294778956&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711",
  },
  {
    title: "image-6",
    src: "https://img1.baidu.com/it/u=4060201754,291453270&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1084",
  },
  {
    title: "image-7",
    src: "https://img1.baidu.com/it/u=4119545635,1667312792&fm=253&fmt=auto&app=138&f=PNG?w=281&h=499",
  },
  {
    title: "image-8",
    src: "https://img0.baidu.com/it/u=1775963641,1501039305&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=499",
  },
  {
    title: "image-9",
    src: "https://img0.baidu.com/it/u=2359496606,281119058&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
  },
  {
    title: "image-10",
    src: "https://img1.baidu.com/it/u=3771754291,3193429800&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083",
  },
  {
    title: "image-11",
    src: "https://img0.baidu.com/it/u=1037755496,1126803478&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=710",
  },
]);
</script>

<style scoped lang="less">
.box {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

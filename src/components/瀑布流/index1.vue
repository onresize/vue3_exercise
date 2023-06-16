<template>
  <div class="mixinHeight">
    <h2>css布局方式实现瀑布流</h2>
    <div class="content">
      <div class="box">
        <el-card class="item" v-for="(item, idx) in imgList" :key="idx" :data-num="idx">
          <img :src="item.src" :alt="item.title" />
          <h3>{{ item.title }}</h3>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

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
@import "@/styles/mixin.less";

.content {
  width: 600px;
  height: 600px;
  border: 3px solid red;
  overflow-y: auto;
}
.box {
  margin: 10px;
  column-count: 3;
  column-gap: 10px;
}
.item {
  margin-bottom: 10px;
  position: relative;
  .BBA(); // 这是less的mixin用法
  h3 {
    width: 100%;
    text-align: center;
  }
}
.item img {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="box">
    <div class="imageBox" v-for="img in imgList" :key="img.url">
      <img :src="img.url" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const imgList = reactive([
  {
    url: "https://img0.baidu.com/it/u=1346293879,1216188986&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  },
  {
    url: "https://img1.baidu.com/it/u=3455772487,1839910736&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  },
  {
    url: "https://img0.baidu.com/it/u=2894575446,206838321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082",
  },
  {
    url: "https://img0.baidu.com/it/u=3668818600,4198960452&fm=253&fmt=auto?w=1280&h=800",
  },
  {
    url: "https://img1.baidu.com/it/u=293889573,3208996596&fm=253&fmt=auto?w=1422&h=800",
  },
  {
    url: "https://img0.baidu.com/it/u=3256563557,2294778956&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711",
  },
  {
    url: "https://img1.baidu.com/it/u=4060201754,291453270&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1084",
  },
  {
    url: "https://img1.baidu.com/it/u=4119545635,1667312792&fm=253&fmt=auto&app=138&f=PNG?w=281&h=499",
  },
  {
    url: "https://img0.baidu.com/it/u=1775963641,1501039305&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=499",
  },
  {
    url: "https://img0.baidu.com/it/u=2359496606,281119058&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
  },
  {
    url: "https://img1.baidu.com/it/u=3771754291,3193429800&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083",
  },
  {
    url: "https://img0.baidu.com/it/u=1037755496,1126803478&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=710",
  },
]);
</script>

<style scoped lang="less">
.box {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

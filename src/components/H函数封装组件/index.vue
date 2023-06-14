<template>
  <myTextCom
    v-bind="{
      color: 'pink',
      fontSize: '20px',
      modelValue,
    }"
  >
    <template v-slot:default> <el-input v-model="modelValue" placeholder="" clearable></el-input></template>

    <!-- XXX没有顶部和底部插槽、就显示默认插槽 -->
    <!-- <template #top> <div>顶部</div> </template>
    <template #bottom> <div>底部</div> </template> -->
  </myTextCom>
  <myPicCom
    v-bind="{
      width: '200px',
      height: '200px',
    }"
  />

  <pre>
    <el-link href="https://blog.csdn.net/NGUP_LEE/article/details/128207449" class="text">参考1：</el-link>
    <el-link href="https://www.zhangshengrong.com/p/ArXGZr44Nj/" class="text">参考2：</el-link>
    <el-link href="https://blog.csdn.net/weixin_45291937/article/details/129258862" class="text">参考3：</el-link>
    <el-link href="https://cn.vuejs.org/guide/extras/render-function.html" class="text">官方: 参考4</el-link>
  </pre>
</template>

<script setup>
import { ref, reactive } from "vue";
import { myTextCom, myPicCom } from "@/myCom/hCom";

const modelValue = ref("h函数-双向绑定值");
</script>

<style scoped lang="less">
pre {
  font-size: 15px;
  font-family: "微软雅黑";
  width: 300px;
  display: flex;
  justify-content: space-around;
  .text {
    display: block;
    border: 2px solid red;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>

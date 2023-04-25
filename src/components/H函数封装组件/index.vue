<template>
  <myTextCom
    v-bind="{
      color: 'pink',
      fontSize: '20px',
      modelValue,
    }"
  >
    <template v-slot:default>
      <el-input v-model="modelValue" placeholder="" clearable></el-input
    ></template>

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
    CSDN: https://blog.csdn.net/NGUP_LEE/article/details/128207449
          https://www.zhangshengrong.com/p/ArXGZr44Nj/
          https://blog.csdn.net/weixin_45291937/article/details/129258862
    官方：https://cn.vuejs.org/guide/extras/render-function.html
  </pre>
</template>

<script setup>
import { ref, reactive } from "vue";
import { myTextCom, myPicCom } from "@/myCom/hCom";

const modelValue = ref("h函数-双向绑定值");
</script>

<style scoped>
pre {
  font-size: 22px;
}
</style>

<template>
  <div class="mixinHeight">
    <h3>演示css选择器:slotted 和 :global用法</h3>
    <User>
      <div class="green">局部:slotted选择器</div>
    </User>
    <div class="red">全局:global选择器</div>
    <el-link href="https://xiaoman.blog.csdn.net/article/details/124754590">(:slotted、:global、useCssModule)参考：useCssModule使用场景一般用于TSX 和 render 函数居多</el-link>
    <el-card style="margin-top: 10px">
      <div :class="[css.pink]">测试useCssModule用法</div>
      <div :class="css.border">test</div>
    </el-card>
  </div>
</template>

<script setup>
import { useCssModule } from "vue";
import User from "./user.vue";
const css = useCssModule("zs");

console.log("useCssModule常量：", css);
</script>

<style module="zs">
.pink {
  color: pink;
  font-size: 16px;
  font-weight: bold;
}
.border {
  border: 2px solid red;
  width: fit-content;
  padding: 10px;
  margin: 5px;
}
</style>

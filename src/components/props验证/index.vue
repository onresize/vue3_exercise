<template>
  <div>
    <el-card>
      <Child :str="str" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Child from "./child.vue";

let str = ref('false11')

</script>

<style scoped lang='less'></style>

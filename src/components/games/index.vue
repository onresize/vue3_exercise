<template>
  <el-card class="box">
    <h2>演示各种GamesDemo</h2>
    <el-card class="flex">
      <Rocket />
    </el-card>

    <el-card class="flex">
      <Ball />
    </el-card>
  </el-card>
</template>
 
<script setup>
import Rocket from "@/myCom/rocket/Game.vue";
import Ball from "@/myCom/ball/Game.vue";
</script>
 
<style scoped >
.box {
  overflow-y: scroll;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
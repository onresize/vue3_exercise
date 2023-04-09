<template>
  <div>
    <h2>演示各种GamesDemo</h2>
    <!-- <el-card class="flex">
      <Rocket />
    </el-card> -->

    <el-card class="flex">
      <Ball />
    </el-card>
  </div>
</template>
 
<script setup>
import Rocket from "@/myCom/rocket/Game.vue";
import Ball from "@/myCom/ball/Game.vue";
</script>
 
<style scoped >
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
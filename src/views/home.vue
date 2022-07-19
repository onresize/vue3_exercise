<template>
  <!-- 内容主体区 -->
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-card style="height: 100vh; box-sizing: border-box">
      <el-aside class="home_container_aside" :width="'220px'">
        <div v-for="(item, index) in RouterList" :key="index" class="aa">
          <div class="cc">
            <router-link :to="item" active-class="bb" class="info_style"
              >{{ item }}测试
            </router-link>
          </div>
        </div>
      </el-aside>
    </el-card>
    <!-- 右侧内容 -->
    <el-main class="home_container_main">
      <!-- home改用嵌套路由 占位符 -->
      <router-view :key="key"></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";

let router = useRoute();
let key = computed(() =>
  router.name
    ? String(router.name) + new Date()
    : String(router.path) + new Date()
);
let RouterList = reactive<string[]>([
  "computed",
  "child",
  "myChild1",
  "model",
  "watch",
  "otherComponent",
  "slot",
  "actionComP",
  "teleport",
  "teleport-video",
  "vueUse",
  "globalData",
  "routerName",
  "vueTsx",
  "myjsx",
  "costomRef",
  "suspense",
  "nextTick",
  "icon",
  "i18",
  "regExp",
  "asyncAction",
  "customHook",
]);
</script>

<style scoped lang="less">
// 设置隐藏滚动条且还能滚动
.container {
  overflow: hidden;
}
.home_container_main {
  height: 100vh;
  overflow: scroll;
}



.aa {
  margin: 10px;
  width: 100%;
  display: inline-flex;
}

.bb {
  width: 190px;
  height: 30px;
  line-height: 30px;
  background: #ccffff;
  border-radius: 10px;
  text-align: center;
}

.info_style {
  text-decoration: none;
}

.cc {
  width: 190px;
  height: 30px;
  line-height: 30px;
  background: #ffcc99;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}

a {
  display: inline-block;
  width: 190px;
  height: 30px;
  color: black;
}

.home_container {
  overflow-y: hidden;
}

.home_container_aside {
  height: 100vh;
  padding-bottom: 30px;
  overflow-x: hidden;
}

.el-aside::-webkit-scrollbar {
  display: none;
}
</style>

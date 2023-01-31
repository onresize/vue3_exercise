<template>
  <!-- 内容主体区 -->
  <el-container class="container" @onscroll="homeScroll($event)">
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
    <el-main
      class="home_container_main"
      @contextmenu.prevent="showMenu($event)"
    >
      <ul
        v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li @click="refresh">
          <RefreshRight
            style="width: 1em; height: 1em; margin-right: 2px"
          ></RefreshRight>
          刷新页面
        </li>
        <li v-if="route.name !== 'welcome'" @click="closePage">
          <CircleClose
            style="width: 1em; height: 1em; margin-right: 2px"
          ></CircleClose>
          关闭当前
        </li>
      </ul>
      <div class="fixed_div">
        <div class="tags-view-wrapper">
          <router-link
            v-for="tag in visitedViews.arr"
            ref="tag"
            :key="tag.name"
            :to="{ path: tag.name }"
            tag="span"
            class="tags-view-item"
            :class="route.fullPath === tag.name ? 'active' : ''"
          >
            {{ tag.title }}
            <CircleClose
              v-show="tag.name !== '/welcome'"
              style="width: 1em; height: 1em"
              class="close"
              @click.prevent.stop="closeSelectedTag(tag.name)"
            ></CircleClose>
          </router-link>
        </div>
      </div>
      <!--XXX 设置跨路由的动画、所有的router-view加上key只会导致动画失效 -->
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component class="child-view" :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { watch, computed, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

const route = useRoute();
const Router = useRouter();
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
);
let visitedViews = reactive({
  arr: [{ name: "/welcome", title: "欢迎页" }],
});
let RouterList = reactive<string[]>([
  // "screen",
  "postMeaasge",
  "downLoadZip",
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
  "jsonStringIfy",
  "FileReader",
  "encrypt",
  "introCom",
  "waterfall",
  "loading",
  "animation1",
  "animation2",
  "animation3",
  "fatherChild",
  "fatherPrivate",
  "slotCss",
  "directive",
  "onlyId",
]);

onBeforeRouteUpdate((to) => {
  console.log("路由改变", to);
  let r = visitedViews.arr.some((v) => v.name === to.path);
  if (r) return;
  visitedViews.arr.push({
    name: to.path,
    title: to.path.substr(1),
  });
});

let visible = ref(false);
let left = ref<number | string>(0);
let top = ref<number | string>(0);

const closeMenu = () => {
  visible.value = false;
};

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.addEventListener("click", closeMenu);
  }
});

const showMenu = (e: any) => {
  // console.log("点击了右键", e);
  top.value = e.clientY;
  left.value = e.clientX;
  visible.value = true;
};

const homeScroll = (e: any) => {
  // console.log("页面滚动了", e);
  visible.value = false;
};

const refresh = () => {
  Router.go(0);
};

const closePage = () => {
  Router.push("/");
};

const closeSelectedTag = (name: any) => {
  visitedViews.arr = visitedViews.arr.filter((v) => v.name !== name);
};

onMounted(() => {
  window.addEventListener("scroll", homeScroll, true);
});
</script>

<style scoped lang="less">
.fixed_div {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 262px);
  height: 36px;
  transition: width 0.28s;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.14);
  padding-top: 5px;
  box-sizing: border-box;
  .tags-view-wrapper {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: scroll;
    .tags-view-item {
      width: fit-content;
      display: inline-block;
      position: relative;
      text-decoration: transparent;
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 6px;
      font-size: 12px;
      margin-left: 5px;
      border-radius: 4px;
      transition: all 0.1s ease-in-out;
      .close {
        transition: all 0.3s ease-in;
        &:hover {
          color: red;
        }
      }
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 10px;
      }
      &.active {
        background-color: #1890ff;
        color: #fff;
        border-color: #1890ff;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
// 跨路由动画
.child-view {
  // position: absolute;
  // z-index: -1;
  width: calc(100vw - 330px);
  height: 100%;
  transition: all 0.7s cubic-bezier(0.58, 0.09, 0.33, 0.91);
}
/* 进入 */
.slide-fade-enter-from {
  transform: translateX(-calc(100vw));
  opacity: 0;
}
/* 离开 */
.slide-fade-leave-to {
  transform: translateX(260px);
  opacity: 0;
}
// 设置隐藏滚动条且还能滚动
.container {
  overflow: hidden !important;
}
.home_container_main {
  height: 100vh;
  overflow-y: scroll;
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
  transition: 0.6s;
}

.info_style {
  text-decoration: none;
  transition: 0.6s;
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

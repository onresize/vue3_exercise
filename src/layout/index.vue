<template>
  <div>
    <!-- 内容主体区 -->
    <el-container class="container" @onscroll="homeScroll($event)">
      <!-- 侧边栏 -->
      <el-card class="left_card">
        <el-aside class="home_container_aside" width="220px">
          <div
            v-for="(item, index) in RouteList.routes"
            :key="index"
            class="aa"
          >
            <div class="cc">
              <router-link
                :to="item.path"
                active-class="bb"
                class="info_style"
                @click="scrollBy(item)"
              >
                <svg-icon :name="item.ICON" />
                {{ item.path.substr(1) }}页
              </router-link>
            </div>
          </div>
        </el-aside>
      </el-card>
      <!-- 右侧内容 -->
      <el-main class="home_container_main">
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
          <li v-if="visitedViews.arr.length >= 2" @click="closeOtherPage">
            <CircleClose
              style="width: 1em; height: 1em; margin-right: 2px"
            ></CircleClose>
            关闭其他
          </li>
        </ul>
        <div class="fixed_div">
          <div class="tags-view-wrapper">
            <el-scrollbar ref="scrollbarRef">
              <router-link
                v-for="tag in visitedViews.arr"
                :key="tag.path"
                :to="{ path: tag.path }"
                :class="[
                  route.fullPath === tag.path ? 'active' : '',
                  'tags-view-item',
                ]"
                @contextmenu.prevent="showMenu($event)"
              >
                {{ tag.path?.substr(1) }}
                <CircleClose
                  v-show="tag.path !== '/welcome'"
                  style="width: 1em; height: 1em"
                  class="close"
                  @click.prevent.stop="closeSelectedTag(tag.path)"
                ></CircleClose>
              </router-link>
            </el-scrollbar>
          </div>
        </div>
        <div class="right_quit">
          <el-tooltip effect="dark" content="退出登录" placement="left-start">
            <div @click="quit">
              <svg
                t="1678947494218"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2767"
                width="30"
                height="30"
              >
                <path
                  d="M887.3 492.3L759.8 333c-6.2-7.7-15.4-12-24.9-12-3.5 0-7.1 0.6-10.5 1.8-12.8 4.5-21.3 16.6-21.3 30.1v95.6h-255c-35.2 0-63.7 28.5-63.7 63.7s28.5 63.7 63.7 63.7H703v95.6c0 13.5 8.6 25.6 21.3 30.1 3.5 1.2 7 1.8 10.5 1.8 9.5 0 18.7-4.3 24.9-12L887.2 532c9.4-11.5 9.4-28 0.1-39.7zM575.5 767.2H320.1c-34.9 0-63.3-28.5-63.3-63.7V321v-0.5c0-34.9 28.5-63.2 63.8-63.2h254.9c35.2 0 63.8-28.5 63.8-63.7s-28.5-63.7-63.8-63.7H256.8c-70.4 0-127.5 57.1-127.5 127.5v510c0 70.4 57.1 127.5 127.5 127.5h318.7c35.2 0 63.8-28.5 63.8-63.7 0-35.4-28.6-64-63.8-64z m0 0"
                  fill="#666666"
                  p-id="2768"
                ></path>
              </svg>
            </div>
          </el-tooltip>
        </div>
        <!--XXX 设置跨路由的动画、所有的router-view加上key值会导致动画失效 -->
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <!-- 多个用逗号分隔字符串   include="home,about"-->
            <!-- 正则表达式 (使用 `v-bind`  :include="/home|about/") -->
            <!-- 数组 (使用 `v-bind`  :include="['home', 'about']") -->
            <keep-alive include="onlyId">
              <component class="child-view" :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { watch, computed, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/pinia.ts";
import { setStorage, getStorage } from "@/utils/funcTools";
import { loginBroadcast } from "@/utils/broadcast";

const route = useRoute();
const Router = useRouter();
const PiniaStore = useMainStore();
const scrollbarRef = ref(null);
let { AuthRoutes } = storeToRefs(PiniaStore); // 不丢失响应式
// const key = computed(() =>
//   route.name ? String(route.name) + new Date() : String(route.path) + new Date()
// );

let visitedViews = reactive({
  arr: [{ path: "/welcome", title: "欢迎页" }],
});

let RouteList = reactive({
  routes: [],
  MapArr: [],
});

const randomSvg = () => {
  return PiniaStore.iconList.sort(() => Math.random() - Math.random()).at(0);
};

// 迭代塞入svg
AuthRoutes.value.forEach((v) => {
  v.ICON = randomSvg() || "bug";
});
RouteList.routes = AuthRoutes;

if (
  getStorage("ActiveBread")?.length &&
  getStorage("ActiveBread")?.length != 1
) {
  visitedViews.arr = getStorage("ActiveBread");
}
onBeforeRouteUpdate((to) => {
  // console.log("路由改变", to);
  let r = visitedViews.arr.some((v) => v.path === to.path);
  if (r) return;
  visitedViews.arr.push({
    path: to.path,
    title: to.path.substr(1),
  });
  setStorage("ActiveBread", visitedViews.arr);
});

let visible = ref(false);
let left = ref(0);
let top = ref(0);
let PathName = ref("");

const scrollBy = (item) => {
  let pIndex = null;
  let activeRouterArr = PiniaStore.ActiveBread;
  activeRouterArr.find((v, i) => {
    if (v.path == item.path) {
      pIndex = i;
    }
  });

  // 当前面包屑数组没有包含点击的路由、就添加到面包屑数组中
  RouteList.MapArr = activeRouterArr.map((v) => v.path);

  if (!RouteList.MapArr.includes(item.path)) {
    activeRouterArr.push(item);
    PiniaStore.changeActiveBread(activeRouterArr);
  }
  // console.log("当前路由面包屑数组：--------", PiniaStore.ActiveBread, pIndex);
  if (pIndex >= 18) {
    scrollbarRef.value.scrollTo({
      left: 4000,
      behavior: "smooth",
    });
  } else {
    scrollbarRef.value.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }
  // console.log("移动顶部滚动条----------------", pIndex);
};

const closeMenu = () => {
  visible.value = false;
};

watch(visible, (val) => {
  // console.log("监听------------------", val);
  if (val) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.addEventListener("click", closeMenu);
  }
});

const quit = () => {
  Router.push("/login");
  loginBroadcast.postMessage("false");
  window.localStorage.clear();
  PiniaStore.changeAuthRoutes([]);
  PiniaStore.changeActiveBread([{ path: "/welcome", title: "欢迎页" }]);
  PiniaStore.changeState(true);
};

const showMenu = (e) => {
  e.returnValue = false; // ie禁用默认事件
  e.preventDefault();
  console.log("点击了右键", e.srcElement.pathname || window.location.pathname);
  PathName.value = e.srcElement.pathname || window.location.pathname;
  top.value = e.clientY;
  left.value = e.clientX;
  visible.value = true;
};

const homeScroll = (e) => {
  // console.log("页面滚动了", e);
  visible.value = false;
};

const refresh = async () => {
  Router.replace({ path: "/redirect" + PathName.value });
};

const closePage = () => {
  closeSelectedTag(PathName.value);
  Router.push("/welcome");
};

const closeOtherPage = () => {
  let arr = visitedViews.arr.filter((v) => v.path == PathName.value);
  PathName.value != "/welcome" &&
    arr.unshift({ path: "/welcome", title: "欢迎页" });
  visitedViews.arr = arr;
  setStorage("ActiveBread", visitedViews.arr);
  PiniaStore.changeActiveBread(visitedViews.arr);
  Router.push(PathName.value);
};

const closeSelectedTag = (name) => {
  visitedViews.arr = visitedViews.arr.filter((v) => v.path !== name);
  setStorage("ActiveBread", visitedViews.arr);
  PiniaStore.changeActiveBread(visitedViews.arr);
  Router.push("/welcome");
};

onMounted(() => {
  window.addEventListener("scroll", homeScroll, true);
});
</script>

<style scoped lang="less">
@import "@/styles/mixin.less";

.fixed_div {
  .clearfix();
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
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

    .tags-view-item {
      width: fit-content;
      // position: relative;
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

.right_quit {
  cursor: pointer;
  position: fixed;
  bottom: 2px;
  right: 2px;
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
  // 掘金背景
  background-image: linear-gradient(
      90deg,
      rgba(60, 10, 30, 0.04) 3%,
      transparent 0
    ),
    linear-gradient(1turn, rgba(60, 10, 30, 0.04) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
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
  display: flex;

  .left_card {
    height: calc(100vh - 36px);
    box-sizing: border-box;
    position: relative;
    top: 36px;
  }
}

.home_container_main {
  height: calc(100vh - 38px);
  margin-top: 36px;
  overflow-y: hidden;
  overflow-x: hidden;
  flex: 1;
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
  margin-left: -20px;
  padding-left: 20px;
  border-radius: 10px;
  text-align: left;
}

.info_style {
  text-decoration: none;

  &:hover {
    color: #fff;
  }
}

.cc {
  width: 190px;
  height: 30px;
  line-height: 30px;
  background: #ffcc99;
  border-radius: 10px;
  padding-left: 20px;
  text-align: left;
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
  height: calc(100vh - 80px);
  padding-bottom: 70px;
  overflow-x: hidden;
}

.el-aside::-webkit-scrollbar {
  display: none;
}
</style>

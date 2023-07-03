<template>
  <div>
    <!-- 内容主体区 -->
    <el-container class="container" @onscroll="homeScroll($event)">
      <!-- 侧边栏 -->
      <el-card class="left_card">
        <el-aside class="home_container_aside" width="220px">
          <div v-for="(item, index) in RouteList.routes" :key="index" class="aa">
            <!-- @click="scrollBy(item)" -->
            <div class="cc">
              <router-link :to="item.path" active-class="bb" class="info_style">
                <svg-icon :name="item.ICON" />
                {{ item.path.substr(1) }}页
              </router-link>
            </div>
          </div>
        </el-aside>
      </el-card>
      <!-- 右侧内容 -->
      <el-main class="home_container_main">
        <div :class="['cla_box', route.path != '/web_Interview' ? 'pd_all_20' : 'pd_oth_20']">
          <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li @click="refresh">
              <RefreshRight style="width: 1em; height: 1em; margin-right: 2px"></RefreshRight>
              刷新页面
            </li>
            <li v-if="route.name !== 'welcome'" @click="closePage">
              <CircleClose style="width: 1em; height: 1em; margin-right: 2px"></CircleClose>
              关闭当前
            </li>
            <li v-if="visitedViews.arr.length >= 2" @click="closeOtherPage">
              <CircleClose style="width: 1em; height: 1em; margin-right: 2px"></CircleClose>
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
                  :class="[route.fullPath === tag.path ? 'active' : '', 'tags-view-item']"
                  @contextmenu.prevent="showMenu($event)"
                >
                  {{ tag.path?.substr(1) }}
                  <CircleClose v-show="tag.path !== '/welcome'" style="width: 1em; height: 1em" class="close" @click.prevent.stop="closeSelectedTag(tag.path)"></CircleClose>
                </router-link>
              </el-scrollbar>
            </div>
            <div class="quit_box">
              <div class="right_l">
                <el-popover
                  :width="174"
                  popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 10px;border-radius: 50%;"
                  @before-enter="beforeEnter"
                  @after-leave="afterLeave"
                >
                  <template #reference>
                    {{ state.nowTime }}
                  </template>
                  <template #default>
                    <clock v-if="state.isShowClock"></clock>
                  </template>
                </el-popover>
              </div>
              <div class="right_center">
                <SwitchIcon unmount-persets />
              </div>
              <!-- 默认头像 -->
              <div class="right_r" @click="showDrawer">
                <img :src="loginInfo?.avatarUrl || loginInfo?.avatar_url || state.avatarSrc" alt="" />
              </div>
            </div>
          </div>
          <!-- 退出按钮 -->
          <div class="right_quit">
            <el-tooltip effect="dark" content="退出登录" placement="left-start">
              <div @click="quit">
                <svg t="1678947494218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2767" width="26" height="26">
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
                <div class="child-view" :style="{ 'overflow-y': route.path == '/web_Interview' ? 'auto' : 'hidden' }">
                  <component :is="Component"></component>
                </div>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
    <!-- 登录信息抽屉 -->
    <el-drawer v-model="state.drawer" title="" :with-header="false" size="400px">
      <div class="avatar_box">
        <img :src="loginInfo?.avatarUrl || loginInfo?.avatar_url || state.avatarSrc" alt="" />
      </div>
      <!-- gitee登录后信息模板 -->
      <el-card class="avatar_card" v-show="loginInfo?.avatar_url">
        <div>
          <label>用户名：</label><span>{{ loginInfo?.name }}</span>
        </div>
        <div>
          <label>简介：</label><span>{{ loginInfo?.bio }}</span>
        </div>
        <div>
          <label>邮箱：</label><span>{{ loginInfo?.email }}</span>
        </div>
        <div class="flex_bottom">
          <div class="item_box" v-for="(item, idx) in state.domList" :key="idx">
            <div class="top_txt">{{ item.num }}</div>
            <div class="name_txt">{{ item.name }}</div>
          </div>
        </div>
      </el-card>
      <!-- 网易云登录信息模板 -->
      <el-card class="avatar_card" v-show="loginInfo?.avatarUrl">
        <div>
          <label>用户名：</label><span>{{ loginInfo?.nickname }}</span>
        </div>
        <div>
          <label>简介：</label><span>{{ loginInfo?.signature }}</span>
        </div>
        <div>
          <label>IP：</label><span class="top_txt">{{ loginInfo?.lastLoginIP }}</span>
        </div>
      </el-card>
      <el-card class="avatar_card1" style="margin-top: 10px" v-show="state.FmList?.length && loginInfo?.avatarUrl">
        <el-icon class="freshIcon" title="刷新" @click.prevent="getFmList">
          <RefreshRight />
        </el-icon>
        <div class="item_box" v-for="(item, idx) in state.FmList" :key="idx" @click="playOrPauseSong(item, idx)">
          <div :style="{ color: state.isPlayIdx == idx ? 'red' : '#303133' }" class="top_txt">{{ item.name }}</div>
          <audio :src="state.audioUrl" id="Audio" preload></audio>
        </div>
      </el-card>
    </el-drawer>
    <!-- 全局按钮音效 -->
    <audio src="" id="eventAudio" controls hidden></audio>
  </div>
</template>

<script>
import publicFunc from "@/mixins/publicFunc";

export default {
  mixins: [publicFunc],
};
</script>

<script setup>
import { watch, computed, reactive, ref, nextTick, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/pinia.ts";
import { setStorage, getStorage } from "@/utils/funcTools";
import { loginBroadcast } from "@/utils/broadcast";
import { SwitchIcon } from "vue-dark-switch";
import clock from "@/myCom/clock/index.vue";
import { loginStatus, subcount, likelist, songUrl, personalFm } from "@/api/authLogin.js";

const route = useRoute();
const Router = useRouter();
const PiniaStore = useMainStore();
const scrollbarRef = ref(null);
let { AuthRoutes, isLogin163 } = storeToRefs(PiniaStore); // 不丢失响应式
// const key = computed(() =>
//   route.name ? String(route.name) + new Date() : String(route.path) + new Date()
// );

let loginInfo = getStorage("loginInfo");
console.log("本地storage取登录信息：", loginInfo);

const { proxy } = getCurrentInstance();
let visitedViews = reactive({
  arr: [{ path: "/welcome", title: "欢迎页" }],
});

let RouteList = reactive({
  routes: [],
  MapArr: [],
});

const state = reactive({
  isPlayIdx: null,
  audioUrl: "",
  FmList: [],
  isShowClock: false,
  nowTime: "",
  drawer: false,
  avatarSrc: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/11/172a2c2c076cd9f2~tplv-t2oaga2asx-no-mark:180:180:180:180.awebp",
  domList: [
    { name: "Stars", num: "0" },
    { name: "Watches", num: "0" },
    { name: "Followers", num: "0" },
    { name: "Following", num: "0" },
  ],
});

const beforeEnter = () => {
  state.isShowClock = true;
};
const afterLeave = () => {
  state.isShowClock = false;
};

const getNowTime = () => {
  state.nowTime = new Date().toLocaleTimeString();

  setTimeout(getNowTime, 1000);
};
getNowTime();

const randomSvg = () => {
  return PiniaStore.iconList.sort(() => Math.random() - Math.random()).at(0);
};

// 迭代塞入svg
AuthRoutes.value.forEach((v) => {
  v.ICON = randomSvg() || "bug";
});
RouteList.routes = AuthRoutes;

if (getStorage("ActiveBread")?.length && getStorage("ActiveBread")?.length != 1) {
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

const loopAdd0 = () => {
  state.domList[0].num++;
  if (state.domList[0].num >= loginInfo?.stared) return;
  window.requestAnimationFrame(loopAdd0);
};
const loopAdd1 = () => {
  state.domList[1].num++;
  if (state.domList[1].num >= loginInfo?.watched) return;
  window.requestAnimationFrame(loopAdd1);
};
const loopAdd2 = () => {
  state.domList[2].num++;
  if (state.domList[2].num >= loginInfo?.followers) return;
  window.requestAnimationFrame(loopAdd2);
};
const loopAdd3 = () => {
  state.domList[3].num++;
  if (state.domList[3].num >= loginInfo?.following) return;
  window.requestAnimationFrame(loopAdd3);
};

const showDrawer = async () => {
  // await get163Info()
  state.drawer = true;
  if (loginInfo?.avatar_url) {
    await proxy.sleepFunc(500);
    window.requestAnimationFrame(loopAdd0);
    window.requestAnimationFrame(loopAdd1);
    window.requestAnimationFrame(loopAdd2);
    window.requestAnimationFrame(loopAdd3);
  }
};

const get163Info = async () => {
  const [_, res] = await loginStatus(); // 获取登录状态
  let { userId, avatarUrl, nickname, signature } = res.data?.profile;
  console.log("用户login状态：", res.data?.profile);
  PiniaStore.changeLoginInfo(res.data?.profile);
  getFmList();
};

const getFmList = async () => {
  const [err, data] = await personalFm();
  console.log("私人FM:", data.data);
  state.FmList = data.data;
};

const playOrPauseSong = async (item, idx) => {
  state.audioUrl = "";
  let music = document.getElementById("Audio");
  console.log("播放/暂停歌曲：", item);
  // 点击正在播放的歌曲、暂停操作
  if (state.isPlayIdx == idx) {
    music?.pause();
    state.isPlayIdx = null;
    return;
  }
  const [err, { data }] = await songUrl(item.id);
  console.log("当前音乐url:", data[0].url);
  state.isPlayIdx = idx;
  state.audioUrl = data[0].url;
  await nextTick();
  state.audioUrl && music?.play();
};

const scrollBy = (item) => {
  console.log("scrollBy---------------");
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

watch(
  () => state.drawer,
  (val) => {
    console.log("监听抽屉开关：", val);
    if (!val) {
      state.domList = [
        { name: "Stars", num: "0" },
        { name: "Watches", num: "0" },
        { name: "Followers", num: "0" },
        { name: "Following", num: "0" },
      ];
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
watch(
  () => route,
  (val) => {
    // 登录了网易云的情况
    if (val.name == "welcome" && isLogin163) {
      console.log("layout页监听路由：", val);
      get163Info();
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const quit = () => {
  loginBroadcast.postMessage("false");
  Router.push("/login");
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
  PathName.value != "/welcome" && arr.unshift({ path: "/welcome", title: "欢迎页" });
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

.avatar_card {
  border-radius: 20px;
  height: fit-content;
  position: relative;
  top: 100px;
  padding-top: 75px;

  .flex_bottom {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    .item_box {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .name_txt {
        padding-top: 2px;
        color: #40485b;
        font-size: 12px;
        display: block;
      }
    }
  }

  .top_txt {
    font-size: 18px;
    font-weight: bold;
    color: #005980;
  }
}

.avatar_card1 {
  border-radius: 20px;
  height: fit-content;
  position: relative;
  top: 100px;

  .freshIcon {
    position: absolute;
    right: 8px;
    top: 5px;
    cursor: pointer;
  }

  .item_box {
    width: 100%;
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border: 1px solid #e4e7ed;
    display: flex;
    justify-content: center;
    cursor: pointer;

    .top_txt {
      font-size: 16px;
      font-weight: bold;
    }

    &:hover {
      transition: all 0.3s ease-in-out;
      background: -moz-linear-gradient(-45deg, #ffffff 20%, #ffb08e 100%);
      background: -webkit-linear-gradient(-45deg, #ffffff 20%, #ffb08e 100%);
      background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
    }

    & + div {
      margin-top: 5px;
    }
  }
}

.avatar_box {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
  left: calc(50% - 90px);
  top: 24px;
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  overflow: hidden;
  // cursor: zoom-in;

  &:hover {
    transform: rotate(666turn);
    transition-delay: 0.3s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}

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
    // border: 2px solid red;
    width: calc(100% - 160px);
    height: 100%;
    white-space: nowrap;

    .tags-view-item {
      width: fit-content;
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

  .quit_box {
    position: absolute;
    right: 3px;
    top: 3px;
    box-sizing: border-box;
    width: 150px;
    height: 30px;
    // border: 2px solid green;
    display: flex;
    justify-content: space-around;

    .right_l {
      width: 65px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      color: #606266;
      // border: 2px solid red;
    }

    .right_center {
      display: flex;
      align-items: center;
      margin-right: 5px;
    }

    .right_r {
      user-select: none;
      cursor: pointer;
    }

    img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      object-fit: fill;
    }
  }
}

.right_quit {
  cursor: pointer;
  position: fixed;
  bottom: 0px;
  right: 1px;
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

.child-view {
  overflow-x: hidden;
  width: calc(100vw - 330px);
  height: 100%;
  transition: all 0.6s cubic-bezier(0.58, 0.09, 0.33, 0.91);
  // 掘金背景
  background-image: linear-gradient(90deg, rgba(60, 10, 30, 0.04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, 0.04) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
}

/* 进入 */
.slide-fade-enter-from {
  // transform: translateX(-100vw);
  opacity: 0;
}

/* 离开 */
.slide-fade-leave-to {
  // transform: translateX(260px);
  opacity: 0;
}

// 设置隐藏滚动条且还能滚动
.container {
  display: flex;

  .left_card {
    height: calc(100vh - 36px);
    box-sizing: border-box;
    position: relative;
    top: 36px;
  }
}

.home_container_main {
  overflow: hidden !important;

  .cla_box {
    box-sizing: border-box;
    height: calc(100vh - 38px);
    margin-top: 36px;
    flex: 1;
  }

  .pd_all_20 {
    padding: 20px;
  }

  .pd_oth_20 {
    padding: 20px 20px 0 20px;
  }
}

:deep(.el-main) {
  --el-main-padding: 0;
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

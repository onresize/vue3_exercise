// admin路由
export const AdminRoutes = [
  {
    path: "/baiduMap",
    meta: { title: "baiduMap" },
    component: () => import("@cp/百度Map/map.vue"),
  },
  {
    path: "/flv",
    meta: { title: "flv" },
    component: () => import("@cp/流播放/flv.vue"),
  },
  {
    path: "/uploadFile",
    meta: { title: "uploadFile" },
    component: () => import("@cp/上传文件本地和七牛云/index.vue"),
  },
  {
    path: "/websocketTest",
    meta: { title: "websocketTest" },
    component: () => import("@cp/websocketTest/index.vue"),
  },
  {
    path: "/postMeaasge",
    meta: { title: "postMeaasge" },
    component: () => import("@cp/postMeaasge/index.vue"),
  },
  {
    path: "/downLoadZip",
    meta: { title: "downLoadZip" },
    component: () => import("@cp/downLoadZip/index.vue"),
  },
  {
    path: "/computed",
    meta: { title: "computed" },
    component: () => import("@cp/computed/index.vue"),
  },
  {
    path: "/child",
    meta: { title: "child" },
    component: () => import("@cp/child/index.vue"),
  },
  {
    path: "/myChild1",
    meta: { title: "myChild1" },
    component: () => import("@cp/myChild1/index.vue"),
  },
  {
    path: "/model",
    meta: { title: "model" },
    component: () => import("@cp/model/index.vue"),
  },
  {
    path: "/watch",
    meta: { title: "watch" },
    component: () => import("@cp/watch/index.vue"),
  },
  {
    path: "/otherComponent",
    meta: { title: "otherComponent" },
    component: () => import("@cp/动态组件component/index.vue"),
  },
  {
    path: "/slot",
    meta: { title: "slot" },
    component: () => import("@cp/slot插槽/index.vue"),
  },
  {
    path: "/teleport",
    component: () => import("@cp/teleport传送组件/index.vue"),
  },
  {
    path: "/teleport-video",
    component: () => import("@cp/teleport传送组件/index1.vue"),
  },
  {
    path: "/vueUse",
    component: () => import("@cp/vueUse使用/index.vue"),
  },
  {
    path: "/globalData",
    component: () => import("@cp/全局变量和函数/index.vue"),
  },
  {
    path: "/vueTsx",
    component: () => import("@cp/tsx的使用/index.vue"),
  },
  {
    path: "/myjsx",
    component: () => import("@cp/myjsx/index.jsx"),
  },
  {
    path: "/costomRef",
    component: () => import("@cp/costomRef实现敏感词替换/index.vue"),
  },
  {
    path: "/actionComP",
    component: () => import("@cp/异步组件/index.vue"),
  },
  {
    path: "/suspense",
    component: () => import("@cp/suspense实现骨架屏/index.vue"),
  },
  {
    path: "/nextTick",
    component: () => import("@cp/nextTickTest/index.vue"),
  },
  {
    path: "/icon",
    component: () => import("@cp/icon/index.vue"),
  },
  {
    path: "/i18",
    component: () => import("@cp/i18国际化/index.vue"),
  },
  {
    path: "/regExp",
    component: () => import("@cp/正则踩坑/index.vue"),
  },
  {
    path: "/asyncAction",
    component: () => import("@cp/微任务宏任务执行顺序/index.vue"),
  },
  {
    path: "/customHook",
    component: () => import("@cp/自定义Hook/index.vue"),
  },
  {
    path: "/jsonStringIfy",
    component: () => import("@cp/JSON.stringify妙用/index.vue"),
  },
  {
    path: "/FileReader",
    component: () => import("@cp/FileReader/index.vue"),
  },
  {
    path: "/encrypt",
    component: () => import("@cp/加密解密/index.vue"),
  },
  {
    path: "/introCom",
    component: () => import("@cp/步骤引导组件使用/index.vue"),
  },
  {
    path: "/waterfall",
    component: () => import("@cp/瀑布流/index.vue"),
  },
  {
    path: "/waterfall1",
    component: () => import("@cp/瀑布流/index1.vue"),
  },
  {
    path: "/loading",
    component: () => import("@cp/loading动画/index.vue"),
  },
  {
    path: "/animation1",
    component: () => import("@cp/动画/index1.vue"),
  },
  {
    path: "/animation2",
    component: () => import("@cp/动画/index2.vue"),
  },
  {
    path: "/fatherChild",
    component: () => import("@cp/父子组件更简单的传参/index.vue"),
  },
  {
    path: "/fa_ch_grandCh",
    component: () => import("@cp/父子孙组件/index.vue"),
  },
  {
    path: "/fatherPrivate",
    component: () => import("@cp/父子组件setup私有数据defineExpose/index.vue"),
  },
  {
    path: "/slotCss",
    component: () => import("@cp/slot插槽css伪选择器/index.vue"),
  },
  {
    path: "/directive",
    component: () => import("@cp/自定义指令/index.vue"),
  },
  {
    path: "/labelIndex",
    component: () => import("@cp/label滚动到指定位置/index.vue"),
  },
  {
    path: "/onlyId",
    name: "onlyId",
    // 该页面做了缓存
    component: () => import("@cp/唯一id/index.vue"),
  },
  {
    path: "/threeJS_vue",
    name: "threeJS_vue",
    component: () => import("@cp/threeJS_vue/index.vue"),
  },
  {
    path: "/games",
    name: "games",
    component: () => import("@cp/games/index.vue"),
  },
  {
    path: "/debounce_throttle",
    name: "debounce_throttle",
    component: () => import("@cp/全局封装防抖节流测试/index.vue"),
  },
  {
    path: "/provide_inject",
    name: "provide_inject",
    component: () => import("@cp/依赖注入/index.vue"),
  },
  {
    path: "/hFun",
    name: "hFun",
    component: () => import("@cp/H函数封装组件/index.vue"),
  },
  {
    path: "/css_vBind",
    name: "css_vBind",
    component: () => import("@cp/css_scss_less_vBind使用/index.vue"),
  },
  {
    path: "/delete",
    name: "delete",
    component: () => import("@cp/delete使用/index.vue"),
  },
  {
    path: "/testLazyCom",
    name: "testLazyCom",
    component: () => import("@cp/测试封装懒加载组件/index.vue"),
  },
  {
    path: "/getFileApi",
    name: "getFileApi",
    component: () => import("@cp/获取本地系统文件夹/index.vue"),
  },
  {
    path: "/webWorker",
    name: "webWorker",
    component: () => import("@cp/webWorker/index.vue"),
  },
  {
    path: "/storageBeOverDu",
    name: "storageBeOverDu",
    component: () => import("@cp/storageBeOverDu/index.vue"),
  },
  {
    path: "/propsValidator",
    name: "propsValidator",
    component: () => import("@cp/props验证/index.vue"),
  },
  {
    path: "/RecurrenceBug",
    name: "RecurrenceBug",
    component: () => import("@cp/RecurrenceBug/index.vue"),
  },
  {
    path: "/dragModal",
    name: "dragModal",
    component: () => import("@cp/演示多个拖拽弹窗/index.vue"),
  },
  {
    path: "/grid",
    name: "grid",
    component: () => import("@cp/grid样式/index.vue"),
  },
  {
    path: "/httpCode",
    name: "httpCode",
    component: () => import("@cp/httpCode/index.vue"),
  },
  {
    path: "/corsTest",
    name: "corsTest",
    component: () => import("@cp/corsTest/index.vue"),
  },
  {
    path: "/animation3",
    component: () => import("@cp/动画/index3.vue"),
    children: [
      {
        path: "/page1",
        name: "page1",
        // components: {
        //   default: () => import("@cp/动画/RouterAnimation/page1.vue"),
        // },
        component: () => import("@cp/动画/RouterAnimation/page1.vue"),
      },
      {
        path: "/page2",
        name: "page2",
        // components: {
        //   default: () => import("@cp/动画/RouterAnimation/page2.vue"),
        // },
        component: () => import("@cp/动画/RouterAnimation/page2.vue"),
      },
    ],
  },

  // 应用场景tab切换、命名视图
  {
    path: "/routerName",
    component: () => import("@cp/viewName/index.vue"),
    alias: ["/t1", "/t2", "/t3"], // 别名、通过设置别名的路由也能访问到这个页面
    meta: { name: "路由元信息1" }, // 路由元信息
    // 默认重定向显示v1页面、并传参
    redirect: (to) => {
      console.log("路由重定向", to);
      return {
        path: "/v1",
        query: {
          name: "张大胖",
        },
      };
    },
    children: [
      {
        path: "/v1",
        components: {
          default: () => import("@cp/viewName/default.vue"),
        },
      },
      {
        path: "/v2",
        components: {
          aa: () => import("@cp/viewName/A.vue"),
          bb: () => import("@cp/viewName/B.vue"),
        },
      },
    ],
  },
];

// 普通用户路由
export const OriginRoutes = [
  {
    path: "/baiduMap",
    meta: { title: "baiduMap" },
    component: () => import("@cp/百度Map/map.vue"),
  },
  {
    path: "/postMeaasge",
    meta: { title: "postMeaasge" },
    component: () => import("@cp/postMeaasge/index.vue"),
  },
  {
    path: "/downLoadZip",
    meta: { title: "downLoadZip" },
    component: () => import("@cp/downLoadZip/index.vue"),
  },
  {
    path: "/computed",
    meta: { title: "computed" },
    component: () => import("@cp/computed/index.vue"),
  },
  {
    path: "/child",
    meta: { title: "child" },
    component: () => import("@cp/child/index.vue"),
  },
];

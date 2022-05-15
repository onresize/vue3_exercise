import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/computed",
  },
  {
    path: "/home",
    component: () => import("@views/home.vue"),
    children: [
      {
        path: "/computed",
        component: () => import("@cp/computed/index.vue"),
      },
      {
        path: "/child",
        component: () => import("@cp/child/index.vue"),
      },
      {
        path: "/myChild1",
        component: () => import("@cp/myChild1/index.vue"),
      },
      {
        path: "/model",
        component: () => import("@cp/model/index.vue"),
      },
      {
        path: "/watch",
        component: () => import("@cp/watch/index.vue"),
      },
      {
        path: "/otherComponent",
        component: () => import("@cp/动态组件component/index.vue"),
      },
      {
        path: "/slot",
        component: () => import("@cp/slot插槽/index.vue"),
      },
      {
        path: "/actionComP",
        component: () => import("@cp/异步组件/index.vue"),
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
        path: '/vueTsx',
        component: () => import("@cp/tsx的使用/index.vue"),
      },
      {
        path: '/myjsx',
        component: () => import("@cp/myjsx/index.jsx"),
      },
      {
        path: '/costomRef',
        component: () => import("@cp/costomRef实现敏感词替换/index.vue"),
      },
      {
        path: '/suspense',
        component: () => import("@cp/suspense实现骨架屏/index.vue"),
      },
      // 应用场景tab切换、命名视图
      {
        path: "/routerName",
        component: () => import("@cp/viewName/index.vue"),
        alias: ["/t1", "/t2", "/t3"], // 别名、通过设置别名的路由也能访问到这个页面
        meta: { name: "路由元信息1" }, // 路由元信息
        // 默认重定向显示v1页面、并传参
        redirect: (to) => {
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
    ],
  },
];

export default routes;

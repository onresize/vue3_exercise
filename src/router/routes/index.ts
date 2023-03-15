import type { RouteRecordRaw } from "vue-router";

import Layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "login",
  },
  {
    // 重定向配置、项目内置页面刷新规则
    path: "/redirect",
    component: Layout,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "login" },
    component: () => import("@views/login.vue"),
  },
  // 匹配不到页面跳404
  { path: "/:pathMatch(.*)", redirect: { name: "404" } },
  {
    path: "/screen",
    component: () => import("~@cp/大屏适配/index.vue"),
  },
  {
    path: "/layoutPage",
    name: "layoutPage",
    component: Layout,
    redirect: "welCome",
    children: [
      {
        path: "/404",
        name: "404",
        meta: { title: "404" },
        component: () => import("@views/404.vue"),
      },
      {
        path: "/welCome",
        name: "welcome",
        meta: { title: "welCome" },
        component: () => import("@views/welCome.vue"),
      },
    ],
  },
];

export default routes;

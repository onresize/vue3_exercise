import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "login",
  },
  {
    // 重定向配置、项目内置页面刷新规则
    path: "/redirect",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  //XXX 匹配不到页面跳404、这种写法地址栏会不会显示'/404'
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    meta: { title: "404" },
    component: () => import("@views/404.vue"),
  },
  //XXX 匹配不到页面跳404、这种写法每次没有匹配到会地址栏会变成'/404'
  // { path: "/:pathMatch(.*)", redirect: { name: "NotFound" } },
  // {
  //   path: "/404",
  //   name: "NotFound",
  //   meta: { title: "404" },
  //   component: () => import("@/views/404.vue"),
  // },
  {
    path: "/login",
    name: "login",
    meta: { title: "login" },
    component: () => import("@views/login.vue"),
  },
  {
    path: "/screen",
    component: () => import("~@cp/大屏适配/index.vue"),
  },
  {
    path: "/layoutPage",
    name: "layoutPage",
    component: () => import("@/layout/index.vue"),
    redirect: "welCome",
    children: [
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

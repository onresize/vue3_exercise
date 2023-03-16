import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

//路由重复的问题 解决
router.$addRoute = (params) => {
  router.matcher = new Router({
    // 重置路由规则
    scrollBehavior: () => ({
      y: 0,
    }),
  }).matcher;
  router.addRoute(params); // 添加路由
};

export default router;

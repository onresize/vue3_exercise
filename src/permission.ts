import NProgress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia.ts";
import router from "@/router";
import config from "@/config";

const PiniaStore = useMainStore(pinia);

// router4.0版本、next参数可选、vue2不支持router4.0
// TODO浏览器大刷新页面跳404
router.beforeEach((to, from, next) => {
  console.log("mainJS进入了路由:", to, from);
  NProgress.start();
  if (["/", "/login"].indexOf(to.path) !== -1) {
    console.log("路由11111111111111111111111111");
    next();
  } else {
    console.log("路由222222222222222222222222222");
    if (PiniaStore.registerRouteFresh && PiniaStore.AuthRoutes == 0) {
      console.log("路由3333333333333333333333333");
      router.removeRoute("NotFound");
      PiniaStore.PromiseRoutes().then(() => {
        console.log("路由44444444444444444444444");
        PiniaStore.changeState(false);
        next({ path: to.path });
      });
    } else {
      console.log("路由555555555555555555555555555");
      router.addRoute("layoutPage", {
        path: "/:pathMatch(.*)",
        name: "NotFound",
        meta: { title: "404" },
        component: () => import("@views/404.vue"),
      });
      next();
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
  // console.log("mainJS离开了路由:", to.fullPath, from);
  const { title } = to.meta;
  const { websiteTitle } = config;
  document.title = title ? `${title + "页"}` : websiteTitle;
});

// 判定项目在浏览器又多个标签页的情况、根据登录状态给出对应弹窗提示
// MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel
import { useMainStore } from "@/store/pinia.ts";
const PiniaStore = useMainStore();
const loginBroadcast = new BroadcastChannel("login");

loginBroadcast.onmessage = (event) => {
  const { data } = event;
  // if (data === "true") {
  //   window.alert("你在其它页面登录了");
  // } else if (data === "false") {
  //   window.alert("你在其它页面退出登录了");
  // }
};

export { loginBroadcast };

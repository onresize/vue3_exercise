import { createApp } from "vue";
import App from "@/App.vue";
import { useMainStore } from "@/store/pinia.ts";

const PiniaStore = useMainStore();

const files = import.meta.globEager("./svg/*.svg");

const getStr = (str) => {
  let r1 = str.lastIndexOf("/") + 1;
  let r2 = str.lastIndexOf(".");
  return str.substring(r1, r2);
};

const iconWhiteList = ["gitee", "qq", "weibo"];

let modules = Object.keys(files),
  iconList = [];

modules.forEach((v) => {
  iconList.push(getStr(v));
});

iconList = iconList.filter((v) => !iconWhiteList.includes(v));

// console.log("本地图片svg：", iconList);

PiniaStore.changeSvgList(iconList);

import hljs from "highlight.js";
// 官网提供多种高亮代码主题（https://highlightjs.org/static/demo/）
import "highlight.js/styles/github.css";
// import 'github-markdown-css'
import { useMainStore } from "@/store/pinia";

const PiniaStore = useMainStore();

const highLight = {
  mounted(el, binding) {
    console.log("highLight指令：", el, binding);
    let blocks = el.querySelectorAll("pre code");
    let leftBlocks = el.querySelectorAll(".markdown-body h3");
    let leftArr = [];
    // md左侧大纲
    leftBlocks.forEach((v, i) => {
      let pId = "pId" + (i + 1);
      v.setAttribute("id", pId);
      let pHTML = { html: v.innerHTML, id: pId };
      leftArr = [...leftArr, pHTML];
    });
    console.log("指令加载大纲数组:", leftArr);
    PiniaStore.changeMDList(leftArr);

    // md代码块
    blocks.forEach((itemEl) => {
      hljs.highlightBlock(itemEl);
    });
  },
  beforeUnmount(el) {
    PiniaStore.changeMDList([]);
  },
};

export default highLight;

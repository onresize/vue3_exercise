import hljs from "highlight.js";
// 官网提供多种高亮代码主题（https://highlightjs.org/static/demo/）
import "highlight.js/styles/github.css";

const highLight = {
  mounted(el, binding) {
    console.log("highLight指令：", el, binding);
    let blocks = el.querySelectorAll("pre code");
    // console.log(blocks)
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });

    el.addEventListener("click", el.__handleClick__);
  },
};

export default highLight;

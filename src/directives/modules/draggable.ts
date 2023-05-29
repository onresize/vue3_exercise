/*
	需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

	思路：
		1、设置需要拖拽的元素为absolute，其父元素为relative。
		2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
		3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
		4、鼠标松开(onmouseup)时完成一次拖拽

	使用：在 Dom 上加上 v-draggable 即可
	<div class="dialog-model" v-draggable></div>
*/
import type { Directive } from "vue";
interface ElType extends HTMLElement {
  parentNode: any;
}
const draggable: Directive = {
  mounted: function (el: ElType) {
    el.style.cursor = "move";
    el.style.position = "absolute";
    el.onmousedown = function (ev) {
      console.log("拖拽指令：", ev);
      // 鼠标按下的位置
      const mouseXStart = ev.clientX;
      const mouseYStart = ev.clientY;
      console.log("按下开始", mouseXStart, mouseYStart);
      // 当前滑块位置
      const rectLeft = el.offsetLeft;
      const rectTop = el.offsetTop;
      document.onmousemove = (e) => {
        // 鼠标移动的位置
        const mouseXEnd = e.clientX;
        const mouseYEnd = e.clientY;
        const moveX = mouseXEnd - mouseXStart + rectLeft;
        const moveY = mouseYEnd - mouseYStart + rectTop;
        console.log(rectLeft, rectTop);

        el.style["top"] = moveY + "px";
        el.style["left"] = moveX + "px";
      };
      document.onmouseup = () => {
        console.log("鼠标抬起");
        // 取消事件
        document.onmousemove = null;
      };
    };
  },
};
export default draggable;

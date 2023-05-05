import type { Directive, DirectiveBinding } from "vue";
import loadingGif from '@/assets/lazyPic/loading1.gif'

// 图片懒加载
const lazy: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // console.log('图片懒加载指令:',el)
    const imgSrc = el.src
    el.src = loadingGif

    // 观察者
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
      // console.log('图片懒加载指令触发了')
      if (isIntersecting) {
        setTimeout(() => {
          // 进入可视区、加载图片
          el.src = imgSrc
          // 停止观察、防止重复加载相同图片
          observer.unobserve(el)
        }, 2000)
      }
    })
    // 开始观察
    observer.observe(el)
  },
};

export default lazy;

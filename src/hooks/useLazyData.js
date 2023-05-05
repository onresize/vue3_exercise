// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 数据懒加载函数
 * @param {Element} target -Dom对象  监听对象
 * @param {Function} apiFn -API函数 监听完发请求拿数据
 */
// 数据懒加载函数
export const useLazyData = (target, apiFn) => {
  const result = ref([])
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // 监听的目标元素
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入可视区
      console.log('是否进入可视区:', isIntersecting)
      if (!isIntersecting) {
        // stop()
        // 调用传进来的api函数 获取数据
        apiFn().then(data => {
          console.log('获取数据：', data)
          result.value = data.result
        })
      }
    },
    //  threshold: 0   只要dom盒子与可视区相交就触发加载数据
    {
      threshold: 0.05
    }
  )
  //得到数据 将来直接使用就行了
  return result
}

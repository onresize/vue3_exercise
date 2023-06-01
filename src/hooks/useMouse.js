import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'

//XXX 这里拿不到getCurrentInstance方法
// console.log(getCurrentInstance())

const useEventListener = (tag, evt, callback) => {

  tag.addEventListener(evt, callback, false)

  onUnmounted(() => {
    tag.removeEventListener(evt, callback, false)
  })
};

const useMouse = () => {
  const x = ref(0)
  const y = ref(0)

  // js拿全局定义的值
  const { proxy, appContext } = getCurrentInstance();
  // console.log(proxy)
  // console.log(appContext)
  // console.log(appContext.config.globalProperties)
  // console.log(getCurrentInstance())

  useEventListener(document, 'mousemove', (e) => {
    x.value = e.pageX
    y.value = e.pageY
    proxy.$T(() => {
      console.log(x.value, y.value)
    })
  })

  return [x, y]
}

export default useMouse


import { ref, onMounted, onUnmounted } from 'vue'

const useEventListener = (target, evt, callback) => {
  onMounted(() => {
    target.addEventListener(evt, callback, false)
  })
  onUnmounted(() => {
    target.removeEventListener(evt, callback, false)
  })
};

const useMouse = () => {
  const x = ref(0)
  const y = ref(0)
  useEventListener(window, 'mousemove', (e) => {
    x.value = e.pageX
    y.value = e.pageY
  })
  // console.log(x.value, y.value)
  return [x.value, y.value]
}

export default useMouse


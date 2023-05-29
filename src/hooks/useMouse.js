import { ref, onMounted, onUnmounted } from 'vue'

const useMouse = () => {
  const x = ref(0)
  const y = ref(0)

  const useEventListener = (evt, callback) => {
    onMounted(() => {
      document.addEventListener(evt, callback, false)
    })
    onUnmounted(() => {
      document.removeEventListener(evt, callback, false)
    })
  };

  useEventListener('mousemove', (e) => {
    x.value = e.pageX
    y.value = e.pageY
  })
  // console.log(x.value, y.value)
  // return [x.value, y.value]
  return { x, y }
}

export default useMouse


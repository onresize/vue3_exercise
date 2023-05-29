import { ref, onMounted, onUnmounted } from "vue";

export function useMouse() {
  var x = ref(0);
  var y = ref(0);
  const setPoint = (e) => {
    x.value = e.pageX;
    y.value = e.pageY;
    console.log(x.value, y.value);
  };

  onMounted(() => {
    document.addEventListener("mousemove", setPoint);
  });
  onUnmounted(() => {
    document.removeEventListener("mousemove", setPoint);
  });
  return { x, y };
}

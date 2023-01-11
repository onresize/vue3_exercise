import { ref } from "vue";

export function useTimer(end: number) {
  const count = ref<number>(end);
  const timer = ref<number>();

  const getNow = (): void => {
    timer.value = setInterval(() => {
      count.value--;
      count.value === 0 && clearInterval(timer.value);
    }, 1000);
  };
  getNow();

  function setTimer(tim: number): void {
    count.value = tim;
    getNow();
  }
  return [count, setTimer];
}

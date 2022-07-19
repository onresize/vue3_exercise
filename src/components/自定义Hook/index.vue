<template>
  <h2>使用自定义useTimer倒计时Hook</h2>
  {{ count }}
  <el-button @click="setTimer(5)">设置数字</el-button>

  <pre class="ft-20 ft-bold bg-pink border-10 pg-t-20" style="color: #ff6600">
    <span class="span-top">自定义Hook:</span>
    import { onMounted, ref } from "vue";

    export function useTimer(end: number) {
      const count = ref&lt;number>(end);
      const timer = ref&lt;number>();
      

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

   </pre>
</template>

<script setup lang="ts">
import { useTimer } from "./useTimer";

const [count, setTimer] = useTimer(3);
</script>

<style scoped>
.span-top {
  color: #fff;
}
</style>

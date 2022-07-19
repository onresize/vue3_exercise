<template>
  <div>
    <h2>探究宏任务微任务执行顺序 (两者都是异步)</h2>
    <h3>宏任务： 定时器、RAF、Dom操作、ajax请求</h3>
    <h3>微任务：Promise.then()回调、async/await、nextTick()</h3>
    <pre class="ft-20 ft-bold bg-pink border-10 pg-t-20">
      <span class="pSpan">
      console.log('----------start-----------')

      setTimeout(() => {
          console.log('setTimeout')
      }, 0)

      new Promise((res, rej) => {
          for(var i = 0; i &lt 4; i++) {
              console.log(i)
          } 
          this.$nextTick(() => {
        	 console.log("nextTick");
          });
          res()
      }).then(() => {
          console.log('Promise.then()')
      })

      console.log('----------end-----------')
      </span>



      // 以上执行顺序为
      <span class="nSpan">
      ----------start-----------
      0
      1
      2
      3
      ----------end-----------
      Promise.then()
      nextTick
      setTimeout
      </span>
    </pre>
  </div>
</template>

<script setup>
import { nextTick } from "vue";
console.log("----------start-----------");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

new Promise((res, rej) => {
  for (var i = 0; i < 4; i++) {
    console.log(i);
  }
  nextTick(() => {
    console.log("nextTick");
  });
  res();
}).then(() => {
  console.log("Promise.then()");
});

console.log("----------end-----------");
</script>

<style scoped>
.pSpan {
  color: #CC6600
}
.nSpan {
  color: #999999
}
</style>

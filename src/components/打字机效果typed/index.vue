<script setup>
import { reactive, onMounted } from "vue";

const func1 = () => {
  // 获取容器
  const container = document.getElementById("content");
  // 把需要展示的全部文字进行切割
  const data = "最简单的打字机效果实现".split("");
  // 需要追加到容器中的文字下标
  let index = 0;
  function writing() {
    if (index < data.length) {
      // 追加文字
      container.innerHTML += data[index++];
      let timer = setTimeout(writing, 100);
      console.log(index); // 这里会依次打印 1 2 3 4 5 6 7 8 9 10 11
    }
  }
  writing();
};

const func2 = () => {
  // 获取容器
  const container = document.getElementById("content1");
  // 把需要展示的全部文字进行切割
  const data = "最简单的打字机效果实现".split("");
  // 需要追加到容器中的文字下标
  let index = 0;
  let timer = null;
  function writing() {
    if (index < data.length) {
      // 追加文字
      container.innerHTML += data[index++];
      // 没错，也可以通过，clearTimeout取消setInterval的执行
      // index === 4 && clearTimeout(timer)
    } else {
      clearInterval(timer);
    }
    console.log(timer); // 这里会打印出 1 1 1 1 1 ...
  }
  // 使用 setInterval 时，结束后不要忘记进行 clearInterval
  timer = setInterval(writing, 100);
};

const func3 = () => {
  const container = document.getElementById("content2");
  const data =
    "与 setTimeout 相比，requestAnimationFrame 最大的优势是 由系统来决定回调函数的执行时机。具体一点讲就是，系统每次绘制之前会主动调用 requestAnimationFrame 中的回调函数，如果系统绘制率是 60Hz，那么回调函数就每16.7ms 被执行一次，如果绘制频率是75Hz，那么这个间隔时间就变成了 1000/75=13.3ms。换句话说就是，requestAnimationFrame 的执行步伐跟着系统的绘制频率走。它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。".split(
      ""
    );
  let index = 0;
  function writing() {
    if (index < data.length) {
      container.innerHTML += data[index++];
      requestAnimationFrame(writing);
    }
  }
  writing();
};

onMounted(() => {
  func1();
  func2();
  func3();
});
</script>

<template>
  <div class="mixinHeight pBox">
    <h3>打字机效果多种实现方案</h3>
    <el-link href="https://blog.csdn.net/qq_41581588/article/details/127050185" target="_bank">参考:</el-link>

    <el-card class="p_card">
      <h3>实现一：setTimeout()</h3>
      <div id="content"></div>
    </el-card>
    <el-card class="p_card">
      <h3>实现二：setInterval()</h3>
      <div id="content1"></div>
    </el-card>
    <el-card class="p_card">
      <h3>实现三：requestAnimationFrame()</h3>
      <div id="content2"></div>
    </el-card>
    <el-card class="p_card">
      <h3>实现四：css方式</h3>
      <div id="content3">大江东去浪淘尽，千古风流人物</div>
    </el-card>
    <el-card class="p_card">
      <h3>实现五(vue-typed-js暂不支持vue3)：yarn add vue3typed</h3>
      <div id="content4">
        <vuetyped :strings="['面试官你好', '我叫XYZ', '来自XXX']" :loop="false" :smart-backspace="true">
          <div class="typing" />
        </vuetyped>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.pBox {
  overflow-y: auto !important;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: block !important;
  }
}

.p_card {
  margin: 10px;
}

// 设置容器样式
#content,
#content1 {
  height: 40px;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  background-color: antiquewhite;
}

#content2 {
  height: 160px;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  background-color: antiquewhite;
}

#content3 {
  font-weight: bold;
  // background-color: antiquewhite;
  font-size: 20px;
  width: 0;
  height: 20px;
  line-height: 20px;
  border-right: 1px solid darkgray;
  /*
  Steps(<number_of_steps>，<direction>)
    steps接收两个参数：第一个参数指定动画分割的段数；第二个参数可选，接受 start和 end两个值，指定在每个间隔的起点或是终点发生阶跃变化，默认为 end。
    */
  animation: write 4s steps(14) forwards infinite;
  overflow: hidden;

  @keyframes write {
    0% {
      width: 0;
    }

    100% {
      width: 280px;
    }
  }
}

#content4 {
  height: 30px;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  background-color: antiquewhite;
}

// 产生光标闪烁的效果
#content::after,
#content1::after,
#content2::after {
  content: "|";
  color: darkgray;
  animation: blink 1s infinite;
}

@keyframes blink {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>

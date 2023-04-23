<template>
  <div class="box">
    <h2>
      JSON.stringify妙用
      <el-link
        href="https://www.cnblogs.com/frank-link/p/15041633.html"
        target="_blank"
      >
        博客园参考：
      </el-link>
    </h2>
    <el-card class="card">
      <code class="code">
        {{ state.a }}
      </code>
    </el-card>
    <pre class="ft-20 ft-bold bg-pink border-10 pg-t-20" style="color: #ff6600">
    <span>
      <u>JSON.string(a, b, c)： 第一个参数为要转换的值、第二个参数可以是数组和函数做处理、第三个参数为输出字符串的缩进</u>
    </span>

    <span style="color: #fff">JSON.stringify(obj) 打印如下：</span>
    const obj = {
      name: "张三",
      year: 2022,
      like: ["篮球", "羽毛球"],
      reg: new RegExp(),      // 空对象
      sy: Symbol(''),         // 对象中被忽略、数组中为null
      fn: function () {},     // 对象中被忽略、数组中为null
      a: undefined,           // 对象中被忽略、数组中为null
      b: null,                // null
      c: NaN,                 // null
      d: Infinity,            // null
      e: -Infinity,           // null
      f: new Date(),          // 对应日期字符串
    };


    <span style="color: #fff">取对象中某个值转换、此时JSON.stringify第二个参数为数组</span>
    console.log(JSON.stringify(obj, ["name", "year"]));   // {"name":"张三","year":2022}


    <span style="color: #fff">toJSON()方法: 可以在要序列化的对象中添加 toJSON()方法，序列化时会基于这个方法返回适当的 JSON 表示。</span>
    let json1 = {
      a: 1,
      b: "sss",
      c: ["2", "1"],
      toJSON() {
        return this.b;
      },
    };
    console.log(JSON.stringify(json1));
    </pre>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const obj = {
  name: "张三",
  year: 2022,
  like: ["篮球", "羽毛球"],
  reg: new RegExp(), // 空对象
  sy: Symbol(""), // 对象中被忽略、数组中为 null
  fn: function () {}, // 对象中被忽略、数组中为  null
  a: undefined, // 对象中被忽略、数组中为 null
  b: null, // null
  c: NaN, // null
  d: Infinity, // null
  e: -Infinity, // null
  f: new Date(), // 对应日期字符串
};

let state = reactive({
  a: JSON.stringify(obj),
  arr: [
    { name: "小明", sort: 91 },
    { name: "小刚", sort: 70 },
    { name: "小红", sort: 48 },
  ],
});

//XXX 取对象中某个值转换、此时JSON.stringify第二个参数为数组
console.log(JSON.stringify(obj, ["name", "year"]));

//XXX 当JSON.stringify()第二个参数为函数时、第三个参数为字符串缩进
// 将下列数组中sort字段转成对应 A|B|c 等级输出
const methods = reactive({
  replacer(key, value) {
    let r = "";
    if (key === "sort") {
      if (value >= 90) {
        r = "A";
      } else if (value >= 60 && value < 90) {
        r = "B";
      } else {
        r = "C";
      }
      return r;
    }
    return value;
  },
});
console.log(JSON.stringify(state.arr, methods.replacer, 2));

//XXX toJSON()方法: 可以在要序列化的对象中添加 toJSON()方法，序列化时会基于这个方法返回适当的 JSON 表示。
let json1 = {
  a: 1,
  b: "sss",
  c: ["2", "1"],
  toJSON() {
    return this.b;
  },
};
console.log(JSON.stringify(json1));
</script>

<style scoped>
.box {
  overflow-y: scroll;
}
.card {
  width: fit-content;
  /* aspect-ratio: 1/0.2; */
}
.code {
  font-family: "楷体";
  font-size: 20px;
  font-weight: bold;
}
</style>

<template>
  <div>
    <h2>正则基本使用</h2>
    <div class="pre-div">
      <pre>
        <span>检测正则表达式的方法：</span>
          let reg = new RegExp(/best/i);
          let str = "get-element-by-id";
          let str1 = "the best"

          <span class="pSpan">
           1.match()方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
          </span>
          str.match(/\-(\w)/g); <span class="nSpan">// ['-e', '-b', '-i']</span>

          <span class="pSpan">
           2.search()方法检索字符串中符合要求的子字符串、
           如果符合条件则返回第一个字母索引在字符串中索引、否则返回-1
          </span>
          str1.search(reg); <span class="nSpan">// 4</span>


          <span class="pSpan">
           3.exec()方法用于检索字符串中的正则表达式的匹配、
           如果字符串中有匹配的值返回该匹配值，否则返回 null。
          </span>
          reg.exec(str1); <span class="nSpan">// best</span>


          <span class="pSpan">
           4.test()方法用于检测一个字符串是否匹配某个模式.
           如果字符串中有匹配的值返回 true ，否则返回 false。
          </span>
          reg.test(str); <span class="nSpan">// true</span>


          <span class="pSpan">
           5.replace(a, b)方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
           a参数为正则表达式、b参数为替换的字符串 或 一个替换文本的箭头函数
          </span>
          str1.replace(reg, '123'); <span class="nSpan">// "the 123"</span>
      </pre>
    </div>

    <div class="pre-div noSelect">
      <pre>
      <span>1.字符串：下划线转驼峰 (a_b -> aB)</span>
      const formatToHump = (value) => {
        return value.replace(/\_(\w)/g, (_, word) => word.toUpperCase())
      }
      </pre>
    </div>
    <div class="pre-div noSelect">
      <pre>
      <span>2.字符串：驼峰转下划线 (aB -> a_b)</span>
      const formatToLine = (value) => {
        return value.replace(/([A-Z])/g, '_$1').toLowerCase()
      }
      </pre>
    </div>
  </div>
</template>

<script setup>
//XXX 1.将str转成去除'-'、转成驼峰命名、(get-element-by-id -> getElementById)
let str = "get-element-by-id";
let arr = [];
const a = str.replace(/\-(\w)/g, (_, word) => word.toUpperCase());
console.log("正则转化后的a----------", a);

//XXX 2.驼峰转下划线、(getElementById -> get_element_by_id)
let str1 = "getElementById";
const a1 = str1.replace(/([A-Z])/g, "_$1").toLowerCase();
const a2 = str1.replace(/([A-Z])/g, "-$1").toLowerCase();
console.log("正则转化后的a1----------", a1); // get_element_by_id
console.log("正则转化后的a2----------", a2); // get-element-by-id

//XXX 3.小写驼峰 --> 下划线形式 (saKuRa -> sa_ku_ra)
var str2 = "saKuRa";
function code(str) {
  return str.replace(/[A-Z]/g, (word) => "_" + word.toLowerCase());
}
console.log("正则转化后的str2----------", code(str2));
</script>

<style scoped lang="less">
.noSelect {
  user-select: none; // 不可选中文本
}
.pre-div {
  background-color: pink;
  border-radius: 10px;
  padding: 2px 0 0 0;
  font-size: 20px;
  font-weight: bold;
  color: white;

  .nSpan {
    color: #ff9933;
    font-size: 19px;
    font-family: "楷体";
  }
  .pSpan {
    color: green;
    font-size: 19px;
    font-family: "楷体";
  }
  span {
    color: #000;
    font-size: 23px;
    font-family: "楷体";
  }
}
</style>

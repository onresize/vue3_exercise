<template>
  <div class="web_box">
    <el-card class="card_one">
      <span class="sp">web面试md总结</span>
    </el-card>
    <div class="card_two">
      <WebInterview v-highLight class="pre_Code_Box"></WebInterview>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import WebInterview from "@/md/面试总结题.md";
</script>

<style scoped lang="less">
.web_box {
  overflow-y: auto !important;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: block !important;
  }
  .card_one {
    position: sticky;
    top: 0;
    .sp {
      font-size: 20px;
      font-weight: bold;
    }
    margin-bottom: 10px;
  }
}

.card_two {
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  padding: 15px;
  overflow: hidden;

  .pre_Code_Box :deep(pre) {
    code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
      font-size: 16px;
      font-family: Source Code Pro, DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas, Inconsolata, Courier, monospace, PingFang SC,
        Microsoft YaHei, sans-serif;
      line-height: 30px;
      background: radial-gradient(pink, transparent);
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      border: 1px solid #e4e7ed;
      border-radius: 10px;

      // 局部滚动条美化
      &::-webkit-scrollbar {
        width: 3px;
        height: 8px;
      }
      // 局部滚动轴
      &::-webkit-scrollbar-thumb {
        background-color: #ffcc99;
        border-radius: 10px;
        &:hover {
          background-color: #ffcc99;
        }
      }
    }
  }
  .pre_Code_Box :deep(pre) {
    ::selection {
      background: #ffcc99 !important;
    }
  }
  .pre_Code_Box :deep(p) {
    a {
      text-decoration: none !important;
      background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
      &::selection {
        background: transparent !important;
      }
    }
  }
}
</style>

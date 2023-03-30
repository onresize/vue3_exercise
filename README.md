# vue3-ts-vite-pinia

基于 Vite 的 Vue 3 项目，默认使用 TypeScript 作为开发语言。

## 为什么学习这个🤷‍♂️

b站视频学习: [(小满zs)](https://www.bilibili.com/video/BV1dS4y1y7vd)

## 工程启动指南

1. npm install
2. npm run dev

### commit 类型

- feat: 新增特性或功能

- fix: 修复问题

- docs: 修改文档

- style: 修改代码格式

- perf: 性能优化

- chore: 构建过程或者辅助工具的变动

- merge: 代码合并

- refactor: 代码重构，不引入新功能和修复问

- test: 新增、修改测试用例

- revert: 回滚某个更早之前的提交

- sync: 同步主线或分支的 Bug

- ci: 与 CI(持续集成服务)有关的改动

- build: 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交

### commit 图标

- 初次提交:tada:

- 新增特性:new:

- bug修复:beetle:

- css更新:lipstick:

- 文档更新:memo:

- 改动重构:hammer:

- 废弃删除:wastebasket:

- 提升性能:zap:


### commit 描述

根据以上 git commit 指南，将是如下的格式：

```bash
feat: 添加xxx
fix: 修改xxx
```

##### git commit提交代码时跳过 eslint校验

```js
在使用命令 git commit -m '提交信息' 将本地代码提交到远程仓库时候， 如果项目安装了 per-commit，则会在Git键入提交信息前进行代码风格检查，如果代码不符合相应规则，则报错。

解决方法有两种：
1、简单粗暴，删除掉pre-commit钩子
进入项目的.git文件夹（隐藏文件），根据路径 ./git/hooks/pre-commit 找到对应的pre-commit文件，直接删除。

2、使用--no -verify跳过检查。
git commit -m '提交信息' --no-verify
```


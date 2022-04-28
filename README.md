# vue3-ts-vite-starter

This template should help you quickly create a Vue 3 project based on Vite, using TypeScript as the development language by default.

这个模板应该能帮你快速创建一个基于 Vite 的 Vue 3 项目，默认使用 TypeScript 作为开发语言。

## Usage

You can use a tool like [create-preset](https://github.com/awesome-starter/create-preset) to scaffold your project with this template.

你可以使用 [create-preset](https://github.com/awesome-starter/create-preset) 之类的工具通过此模板来搭建你的项目。

```bash
npm create preset@latest init
```

## Why Use This Template

Why not use [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) to generate the basic template of the project?

Because the basic template only has the simplest basic configuration, and the actual production project requires a lot of additional tool dependencies to improve development efficiency.

为什么不使用 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) 来生成项目的基础模板？

因为基础模板只有最简单的配置，而实际生产的项目里，需要很多额外的提高开发效率的工具依赖。

## How to learn

If you are not very familiar with Vue 3 and TypeScript, or even have no contact at all, don’t worry, I have compiled an introductory guide, suitable for developers who do not have Vue 3 development experience to read, a book written based on the development process of a project , It is recommended to read and coding at the same time.

> Btw: Currently only Chinese version, it is recommended to read through Google Translate with Chrome.

See: [Learning Vue3](https://vue3.chengpeiquan.com/)

如果你对 Vue 3 和 TypeScript 不是很熟悉，甚至完全没有接触过，不用担心，我整理了一个入门指南，适合没有 Vue 3 开发经验的开发者阅读，以一个项目的开发过程来写的一本书，建议一边 Reading ，一边 Coding 。

点击阅读：[Vue3.0学习教程与实战案例](https://vue3.chengpeiquan.com/)

## 工程启动指南

1. npm install
2. npm run dev

## git commit 指南

```bash
<类型>[可选 范围]: <描述>
```

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

### commit 范围

本次 commit 影响的范围（可选）

### commit 描述

本次 commit 的简短描述，结尾不加句号或者其他标点符号

根据以上 git commit 指南，将是如下的格式：

```bash
feat: 登录界面开发
fix: 购物车计算
```
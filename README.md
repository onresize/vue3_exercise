# vue3-ts-vite-pinia

基于 Vite 的 Vue 3 项目，默认使用 TypeScript 作为开发语言。

## 为什么学习这个🤷‍♂️

b站视频学习: [(小满zs)](https://www.bilibili.com/video/BV1dS4y1y7vd)

## 工程启动指南

1. yarn 

2. yarn dev

  ```js
  // 包环境运行版本
  yarn -v 1.22.17
  npm -v 7.20.3
  cnpm -v 7.1.0
  pnpm -v 7.9.0

  node 16.x.x版本
  ```
## 脚本命令
   ```js
   yarn build       手动更新版本并打包

   yarn build:vite  自动更新版本并生成tag后打包

   yarn preview     本地预览dist包

   yarn lint    检查代码语法并修复

   yarn format      统一重置代码格式

   yarn commit      约定式代码提交规范、具体参考如下git cz

   yarn release     更新版本、自动打tag

   yarn prepare     commit时校验信息是否符合规范、执行自定义hook钩子

   yarn format-code  格式化暂存区代码风格

   yarn check-conflict  暂存区代码冲突检测

   yarn check-keyword  暂存区代码检测debugger

   node_server文件夹： 部分node接口(上传、websocket)
   ```

## commitizen 使用

[commitizen](https://github.com/commitizen/cz-cli) 是一个 cli 工具，用于规范化 git commit 信息，可以代替 git commit

```bash
git cz 
# ? Select the type of change that you're committing: docs:     Documentation only changes
# ? What is the scope of this change (e.g. component or file name): (press enter to skip) readme
# ? Write a short, imperative tense description of the change (max 86 chars):
# (46) update readme.md, add init project description
# ? Provide a longer description of the change: (press enter to skip) 

# ? Are there any breaking changes? No
# ? Does this change affect any open issues? No
# [main caae82e] docs(readme): update readme.md, add init project description
# 1 file changed, 7 insertions(+)
# zuo@zmac comitizen-practice-demo % 
```

如图，git cz 运行后，会有如下 6 个步骤

### 1.选择提交类型(必填)

Select the type of change that you're committing: (Use arrow keys)

类型 | 描述
--- | ---
feat |     A new feature 
fix |    A bug fix 
docs |    Documentation only changes 
style |    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
refactor | A code change that neither fixes a bug nor adds a feature 
perf |     A code change that improves performance 
test |    Adding missing tests or correcting existing tests 
build |    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) 
ci |       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) 
chore |    Other changes that don't modify src or test files 
revert |   Reverts a previous commit 

### 2.选择 scope 模块名(选填)
What is the scope of this change (e.g. component or file name): (press enter to skip) 

### 3.填写精炼的提交信息(必填)
Write a short, imperative tense description of the change (max 86 chars):

### 4.填写补充信息(选填)
Provide a longer description of the change: (press enter to skip) 

### 5.选择是否有破坏性更新(默认no)
Are there any breaking changes?

### 6.是否关联是 open 状态的 issue(默认no)
Does this change affect any open issues?

可以关闭 github issue，**但注意 commit 信息里面的末尾也要加 '(#issue编号)'**，这样在 github 体验更好


## standard-version（自动生成、打tag） 
[standard-version](https://github.com/conventional-changelog/standard-version) 安装后，只需要 npm run release，就可以有 npm run version 的功能，而且提交信息是标准的 commitizen 规范，而且自动生成 changelog 自动打 tag，自动 commit。你只需要 push 即可。
```bash
npm install standard-version --save-dev

git tag // 打tag
git push --tags // 提交tag
```
scripts 设置
```js
// scripts
"release": "standard-version"
```

```bash
 npm run release

> comitizen-practice-demo@0.4.1 release /Users/zuo/Desktop/fecloe/comitizen-practice-demo
> standard-version

✔ bumping version in package.json from 0.4.1 to 0.4.2
✔ bumping version in package-lock.json from 0.4.1 to 0.4.2
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md
✔ committing package-lock.json and package.json and CHANGELOG.md
✔ tagging release v0.4.2
ℹ Run `git push --follow-tags origin main` to publish
zuo@zmac comitizen-practice-demo %
# git push
# git push --tags
```

需要注意的是：**CHANGELOG.md 是追加写入内容的，如果你之前没有对应的内容或删了之前的内容，会导致生成的内容较少，或者不完整。**

### release 特定版本
```bash
# 0.4.1
npm run release # 0.4.1 => 0.4.2
npm run release -- --prerelease # 0.4.2 to 0.4.3-0
npm run release # 0.4.3-0 to 0.4.3
npm run release -- --prerelease alpha # 0.4.3 to 0.4.4-alpha.0

# patch、minor、major
npm run release -- --release-as minor  # 0.4.4-alpha.0 to 0.5.0
npm run release -- --release-as patch # 0.5.0 to 0.5.1
npm run release -- --release-as major # 0.5.1 to 1.0.0
npm run release -- --release-as prepatch # 1.0.0 to 1.0.1-0
npm run release -- --release-as preminor # 1.0.1-0 to 1.1.0-0
npm run release -- --release-as premajor # 1.1.0-0 to 2.0.0-0

# 手动指定版本
npm run release -- --release-as 2.1.3-alpha.1 # 2.0.0-0 to 2.1.3-alpha.1
# ✔ bumping version in package.json from 2.0.0-0 to 2.1.3-alpha.1
# ✔ bumping version in package-lock.json from 2.0.0-0 to 2.1.3-alpha.1
# ✔ tagging release v2.1.3-alpha.1

npm run release # 2.1.3-alpha.1 to 2.2.0
```
对于版本号信息，参考 [npm version](https://docs.npmjs.com/cli/v7/commands/npm-version) 文档:

更多约定式提交 [参考](https://www.conventionalcommits.org/zh-hans/v1.0.0/)



## 项目集成约定式提交规范操作步骤

```js
npm install commitizen cz-conventional-changelog -D  // 安装规范化提交插件
根目录下创建.czrc文件、内容为： 
{"path": "cz-conventional-changelog"}
这步操作之后就能使用 git cz


npm install husky --save-dev // 安装husky、commit前自定义hook执行自定义脚本命令
配置 scripts：{ "prepare": "husky install" }
执行 npm run prepare


测试 husky 钩子作用，添加 pre-commit 钩子
npx husky add .husky/pre-commit "npm run 'xxx'"
# 查看当前目录 .husky 目录是否有生成 pre-commit 文件
# 如果需要删除这个钩子，直接 删除 .husky/pre-commit 文件即可


commitlint 安装配置
yarn add @commitlint/cli @commitlint/config-conventional -D
根目录下创建commitlint.config.js文件、内容为： 
module.exports = { extends: ['@commitlint/config-conventional'] }


再在.husky目录下创建 commit-msg文件、内容为： 
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"


这步操作之后commit时候信息不规范就会报错提示、（然后使用 git cz 规范式进行提交）
```

[demo参考](https://github.com/dev-zuo/commitizen-practice-demo)



##### git commit提交代码时跳过 eslint校验

```js
在使用命令 git commit -m '提交信息' 将本地代码提交到远程仓库时候， 如果项目安装了 per-commit，则会在Git键入提交信息前进行代码风格检查，如果代码不符合相应规则，则报错。

解决方法有两种：
1、简单粗暴，删除掉pre-commit钩子
进入项目的.git文件夹（隐藏文件），根据路径 ./git/hooks/pre-commit 找到对应的pre-commit文件，直接删除。

2、使用--no -verify跳过检查。
git commit -m '提交信息' --no-verify
```


# liver-collection

![CircleCI](https://img.shields.io/circleci/project/github/breathing-is-fun/liver-collection/master.svg)

[English](./README.md) | 简体中文

- **作者于 2018-08-09 弃坑 ~~回 steam 结婚了~~。望有志骑空士早日找到迷失的自己，作者累了，不能再陪你们在北极晒太阳了**

- 用作 Viramate 功能补全

- 善用 chrome 浏览器多用户登陆功能，为你的 gbf 单独创建一个账号

- 由于测试不充分，建议按照 gif 中演示的进行操作减少出 bug 的风险

- 遇到 bug 可以先刷新一下页面再试试

## ✨ 特性

- 两键舔婊 [操作及效果](#两键舔婊)
- 一键舔婊。需要开启 [监听剪切板] 选项 [操作及效果](#一键舔婊)
- ~~用于日常记录，比如你今天刷了多少记忆。当然，这个要本地建个数据库的，服务器是不会有的，这辈子都不会有的~~
- 隐藏所有侧边栏。这里建议用 Viramate 的童鞋把左侧的侧边栏改成水平的，不然面板会浮在页面上很难看的..[操作及效果](#隐藏侧边栏)
- 修改滚动条样式。现在的滚动条可以用鼠标拖了 [操作及效果](#修改滚动条)
- 共斗房间搜索，不符合条件的房间会被隐藏。~~多条件搜索以后再说~~ [操作及效果](#共斗搜索)
- ~~修改窗口大小~~（该功能因为不确定因素太多，卒） [遗照](#修改窗口大小)
- 一键查看所有队友天人情况 [操作及效果](#查看天人)
- 增加左右侧面板开关，喜欢维拉侧面板的不用强行关了
- 共斗房黑名单，下载黑名单的这个文件是用来共享的，但目前只能手动合并，更新时需要手动替换 json 文件，/assets/black_list.json [操作及效果](#黑名单)
- ~~检查作业。选择时间可以查看历史，时间以每日 0 点分隔~~ [遗照](#检查作业)
- 按键进房
  - F 键刷新
  - D 键跳转自定义地址并自动判断是否需要吃药。需要自行填入跳转地址，设置在选项页-通用设置中
- 隐藏首页无关项。 [操作及效果](#隐藏无关项)
- 自动进入单人场景。结算结束时会自动跳转到[按键进房]中填写的地址，并自动吃药。
- 刷带 HL 的本时，开启相关选项后，在结算页如果出现 HL 则提示。

## 🔨 用法

1. 到 [release](https://github.com/breathing-is-fun/liver-collection/releases/tag/1.1.6) 里把 `dist` 下下来

2. 这就是插件本体了，剩下的就是自行搜索如何把这个文件夹加进浏览器的扩展里了

## ⌨️ 开发

```bash
$ git clone https://github.com/breathing-is-fun/liver-collection.git
$ cd liver-collection
$ npm install
$ npm run build
```

## 演示效果

### 隐藏侧边栏

![img](./img/hideSlide.gif)

### 修改滚动条

![img](./img/changeScroll.gif)

### 共斗搜索

![img](./img/coopraidSearch.gif)

### 修改窗口大小

![img](./img/changeFrameSize.gif)

### 查看天人

![img](./img/checkCharacters.gif)

### 黑名单

![img](./img/checkBlackList.gif)

### 两键舔婊

![img](./img/simpleBattle.gif)

### 一键舔婊

![img](./img/oneKeyBattle.gif)

### 检查作业

![img](./img/checkHomework.png)

### 隐藏无关项

![img](./img/hideMenus.gif)

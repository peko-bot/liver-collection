# liver-collection

[![Greenkeeper badge](https://badges.greenkeeper.io/breathing-is-fun/liver-collection.svg)](https://greenkeeper.io/)

- **作者于 2016-04-16 入坑，2018-08-09 弃坑~~回 steam 结婚了~~。望有志骑空士早日找到迷失的自己，作者累了，不能再陪你们在北极晒太阳了**

- 用作 Viramate 功能补全

- 善用 chrome 浏览器多用户登陆功能，为你的 gbf 单独创建一个账号

- 因为我只有在课余时间才能写这个插件，所以测试肯定是不充分的，建议按照 gif 中演示的进行操作减少出 bug 的风险

- 遇到 bug 可以先刷新一下页面再试试

## 功能清单

- ~~用于日常记录，比如你今天刷了多少记忆。当然，这个要本地建个数据库的，服务器是不会有的，这辈子都不会有的~~

- 隐藏所有侧边栏，这里建议用 Viramate 的童鞋把左侧的侧边栏改成水平的，不然面板会浮在页面上很难看的..[操作及效果](#隐藏侧边栏)
- 修改滚动条样式，现在的滚动条可以用鼠标拖了 [操作及效果](#修改滚动条)
- 共斗房间搜索，不符合条件的房间会被隐藏。~~多条件搜索以后再说~~ [操作及效果](#共斗搜索)
- ~~修改窗口大小~~（该功能因为不确定因素太多，卒） [遗照](#修改窗口大小)
- 一键查看所有队友天人情况 [操作及效果](#查看天人)
- 增加左右侧面板开关，喜欢维拉侧面板的不用强行关了
- 共斗房黑名单，下载黑名单的这个文件是用来共享的，但目前只能手动合并，更新时需要手动替换 json 文件，/assets/black_list.json [操作及效果](#黑名单)
- 两键舔婊 [操作及效果](#两键舔婊)
- 一键舔婊。需要开启 [监听剪切板] 选项 [操作及效果](#一键舔婊)
- 检查作业。选择时间可以查看历史，时间以每日 0 点分隔 [效果](#检查作业)
- 按键进房。现支持 F 键刷新，D 键跳转自定义地址并自动判断是否需要吃药。需要自行填入跳转地址，设置在选项页-通用设置中
- 隐藏首页无关项。 [操作及效果](#隐藏无关项)
- 自动进入单人场景。结算结束时会自动跳转到[按键进房]中填写的地址，并自动吃药。
- 刷带 HL 的本时，开启相关选项后，在结算页如果出现 HL 则提示。

## 用法

### 如果你只是单纯要用

- 装好 git 跟 node.js，及学会它们几条命令。很多人只是把源码下下来，依赖也不装就来问了，这种恕我懒得回了。可以从[这里](http://bbs.ngacn.cc/read.php?tid=14415132&page=10#pid286608869Anchor)慢慢往下看，确定自己遇到的问题跟这里几十楼里的不一样再问

- clone 下来，装好依赖包，执行 npm run build，把 dist 拖进浏览器就能用了

  这样可以获得最新的扩展，但不保证一定能跑起来。因为我懒得切分支也懒得写单元测试，很多功能可能在某次修改后就没法用了...这个时候就得来提 issue 了

### 如果你要改代码，这些是必须得知道的一些东西

- 首先，不要直接 pr 到 master 分支，这样是不会过的。正确姿势应该是切到 merge 分支，然后再 pr。如果没分支，请一定要联系我

- 你得先学会一点 react、ES6、chrome-extension。Popup 使用 antd 的组件，操作 dom 直接用的 js 原生方法

- 当你需要只需要修改布局，比如 Popup 时，执行 npm start，会热刷新

- 当你需要改环境交互逻辑时，执行 npm run dev，这条命令会生成 map 文件便于调试

- 当你只需要打包时，执行 npm run build，这条命令只会生成压缩后的文件，提交时需要先执行下这条命令

- 还有一条命令，npm run push

  因为截止至上次 commit 的时候，这扩展都是我一个人维护，也懒得写提交注释，于是就这么放一条好了，

  ~~我才不会想着会有人会来 pr 呢~~

- 以上命令中，黄色输出代表 warns，红色代表 errors，绿色代表正常，可以不管。

## 代码从哪开始看？

- 这里假设上面提到的那些东西你都懂

- 从 background/index.js 开始。为了便于维护，所有 chrome 扩展的监听器基本都写在对应的 index.js 里，以后也会遵循这条规则

- 当 content_script 加载完成时，为了初始化 localStorage 中的数据，会先跟 background 交互一下

  短连接是各自请求各自的，可以在 contentScript 的 index 中看看分别执行了哪些方法，所有接收都写在 background/index.js 里

  长连接 contentScript 是接收端，建立连接在 popup 或 background 里

  默认配置在 background/options 中

  注入到页面的 js 写在 contentScript 里，通过派发事件通信

  注释中标着 TODO 的是当时图快写的很江硬，后续需要改的地方

- 编译时的输出是有插件的，有兴趣可以去 package.json 里看看 ~~欢迎来编故事~~

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

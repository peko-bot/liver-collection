# Liver-collection 

* 肝collection，用作Viramate功能补全  

* 善用chrome浏览器多用户登陆功能，为你的gbf单独创建一个账号  

* 因为我只有在课余时间才能写这个插件，所以测试肯定是不充分的，建议按照gif中演示的进行操作减少出bug的风险  

* 遇到bug可以先刷新一下页面再试试  

# 功能清单
* ~~用于日常记录，比如你今天刷了多少记忆。当然，这个要本地建个数据库的，服务器是没有的，这辈子都不会有的~~  

* 隐藏所有侧边栏，这里建议用Viramate的童鞋把左侧的侧边栏改成水平的，不然面板会浮在页面上很难看的..[操作及效果](#隐藏侧边栏)  
* 修改滚动条样式，现在的滚动条可以用鼠标拖了  [操作及效果](#修改滚动条)  
* 共斗房间搜索，不符合条件的房间会被隐藏。~~多条件搜索以后再说~~  [操作及效果](#共斗搜索)  
* ~~修改窗口大小~~（该功能因为不确定因素太多，卒）  [遗照](#修改窗口大小)  
* 一键查看所有队友天人情况  [操作及效果](#查看天人)  
* 增加左右侧面板开关，喜欢维拉侧面板的不用强行关了  
* 共斗房黑名单，下载黑名单的这个文件是用来共享的，但目前只能手动合并，更新时需要手动替换json文件，/assets/black_list.json  [操作及效果](#黑名单)  
* 两键舔婊  [操作及效果](#两键舔婊)  
* 一键舔婊。需要开启 [监听剪切板] 选项  [操作及效果](#一键舔婊)  
* 检查作业。[效果](#检查作业)  
# 用法
## 如果你只是单纯要用
* clone下来（需要先装好git跟node.js，及学会它们几条命令），装好依赖包，执行npm run build，把dist拖进浏览器就能用了  
  
  这样可以获得最新的扩展，但不保证一定能跑起来。因为我懒得切分支也懒得写单元测试，很多功能可能在某次修改后就没法用了...这个时候就得来提issue了  

## 如果你要改代码，这些是必须得知道的一些东西
* 首先，不要直接pr到master分支，这样是不会过的。正确姿势应该是切到merge分支，然后再pr

* 你得先学会一点react、ES6、chrome-extension。Popup使用antd的组件，操作dom直接用的js原生方法 ~~当然也不算纯原生，es6语法糖随处可见~~
  
* 当你需要只需要修改布局，比如Popup时，执行 npm start，会热刷新

* 当你需要改环境交互逻辑时，执行 npm run dev，这条命令会生成map文件便于调试
  
* 当你只需要打包时，执行 npm run build，这条命令只会生成压缩后的文件，提交时需要先执行下这条命令
  
* 还有一条命令，npm run push
  
  因为截止至上次commit的时候，这扩展都是我一个人维护，也懒得写提交注释，于是就这么放一条好了，
  
  ~~我才不会想着会有人会来pr呢~~
  
* 以上命令中，黄色输出代表warns，红色代表errors，绿色代表正常，可以不管。  

## 代码从哪开始看？  

* 这里假设上面提到的那些东西你都懂  

* 从background/index.js开始。为了便于维护，所有chrome扩展的监听器基本都写在对应的index.js里，以后也会遵循这条规则  

* 当content_script加载完成时，为了初始化localStorage中的数据，会先跟background交互一下  

  短连接是各自请求各自的，可以在contentScript的index中看看分别执行了哪些方法，所有接收都写在background/index.js里  

  长连接contentScript是接收端，建立连接在popup或background里  

  默认配置在background/options中  

  注入到页面的js写在contentScript里，通过派发事件通信  

  注释中标着TODO的是当时图快写的很江硬，后续需要改的地方  

* 编译时的输出是有插件的，有兴趣可以去package.json里看看 ~~欢迎来编故事~~  

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
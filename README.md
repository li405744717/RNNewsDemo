# RNNewsDemo
NewsDemo with react-native<br>
cd 进入项目目录 ，使用npm install 安装插件<br>
进入ios目录运行程序RNDemo.xcworkspace<br>
#效果展示
##启动页
video效果<br>
![](https://github.com/li405744717/RNNewsDemo/blob/master/show/start.gif)<br>
##首页
![](https://github.com/li405744717/RNNewsDemo/blob/master/show/home.gif)
##新闻详情
向webview嵌入js代码获取网页高度来设置组件webview的高度<br>
![](https://github.com/li405744717/RNNewsDemo/blob/master/show/newsInfo.gif)
##新闻评论
![](https://github.com/li405744717/RNNewsDemo/blob/master/show/newsFollow.gif)
#引入文件报错
解决办法:<br>
import \<React/RCTEventDispatcher.h\> -> #import "RCTEventDispatcher.h"<br>
#第三库扩展<br>
##react-native-web2<br>
在render中添加
```JavaScripte
if(height > 0 && !this.flag) {
            this.props.loaded()
            this.flag = true
        }
```

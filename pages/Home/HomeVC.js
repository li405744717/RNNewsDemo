/**
 * Created by dp-k on 2016/10/26.
 */
import React,{Component} from "react"
import {View, StyleSheet, Text, StatusBar } from "react-native"
import containerStyles from './../../assets/styles/containerStyles'
import CommonNavBar from './../../base/components/CommonNavBar'
import HomeScrollListView from  './HomeScrollListView'
import Icon from 'react-native-vector-icons/Ionicons'
class HomeVC extends Component {
  constructor(){
    super()
    this.curX = 0
    this.onPressTip = false
    this.listDatas = []
    this.state = {
      listDatas:[],
      rightOrLeft:true
    }
    this.tips = ["头条","精选","娱乐","体育","网易号","上海","视频","财经",
      "科技","骑车","时尚","图片","直播","热点", "跟帖","房产"]
    this.cellDatas = [
      {
        cellType:"image",
        text:"cell1",
        images:[
          "http://s1.dwstatic.com/group1/M00/DA/A4/eabae60eaedc17316680b1fe4fdd8e4b.jpg",
          "http://s1.dwstatic.com/group1/M00/88/12/54c391bfa56667379e28f8d0365fef28.jpg",
          "http://s1.dwstatic.com/group1/M00/A4/B6/60234f9fb303f7d94b3d637268f44eb9.jpg"
        ],
        newsType:"体育",
        followNum:1001,
        isAd:false,
        isVideo:true,
        isLive:true
      },
      {
        cellType:"common",
        text:"cell2",
        images:["http://s1.dwstatic.com/group1/M00/0D/5A/7944ae0f5e7361e51872c4bac8796729.jpg"],
        newsType:"科技",
        followNum:2001,
        isAd:false,
        isVideo:false,
        isLive:false
      },
      {
        cellType:"common",
        text:"cell3",
        images:["http://s1.dwstatic.com/group1/M00/4D/02/4ac23d480fc902594a1be7cff7627ad8.png"],
        newsType:"数码",
        followNum:3001,
        isAd:false,
        isVideo:false,
        isLive:false
      },
      {
        cellType:"image",
        text:"cell4",
        images:[
          "http://s1.dwstatic.com/group1/M00/3E/9E/389aa74650d2f1558a1a70028db2c51f.png",
          "http://s1.dwstatic.com/group1/M00/62/DA/7beed12996b006f63cca724a92a8aa2c.jpg",
          "http://s1.dwstatic.com/group1/M00/09/62/18d25faba6cab080ce107b266be82071.jpg",
        ],
        newsType:"时尚",
        followNum:4001,
        isAd:false,
        isVideo:false,
        isLive:false
      },
      {
        cellType:"image",
        text:"cell5",
        images:[
          "http://s1.dwstatic.com/group1/M00/6B/AB/8b77530bd64c336e1510554cf34ce2ed.png",
        ],
        newsType:"娱乐",
        followNum:5001,
        isAd:true,
        isVideo:false,
        isLive:false
      },
      {
        cellType:"common",
        text:"cell6",
        images:["http://s1.dwstatic.com/group1/M00/C9/E6/3789be3300d988f3b22c67f1feb045ce.png"],
        newsType:"动物",
        followNum:6001,
        isAd:false,
        isVideo:true,
        isLive:false
      }
    ]
  }
  componentWillMount() {
    //初始化数据
    this.initListDatas()
  }

  componentDidMount() {
  }
  loadMoreNewsTip = () => {

  }
  initListDatas = () => {
    for(var i=0;i<this.tips.length;i++){
      if(i > 4){
        this.listDatas.push([])
      }else{
        this.listDatas.push(this.cellDatas)
      }
    }
    this.setState({
      listDatas:this.listDatas
    })
  }
  onScrollList = (e) => {
    var index = e.nativeEvent.contentOffset.x / window.width
    this.refs.homeScrollTipView.scrollTip(index)
    if(index % 1 == 0){
      if(index > this.state.listDatas.length - 2 && index < this.tips.length - 1){
        //加载更多新闻tip
        this.loadMoreNewsTip()
      }else{
        // this.refs.homeScrollListView.loadNews()
      }
    }

  }
  render(){
    StatusBar.setBarStyle(1)
    return(
      <View style={[containerStyles.common]}>
        <CommonNavBar leftView={<Icon name="ios-menu" size={30} color="#fff"/>}
                      rightView={<Icon name="ios-search" size={30} color="#fff"/>}
                      title="今日新闻"
        />
        <HomeScrollListView navigator = {this.props.navigator}
                            scrollEventThrottle={60}
                            ref = "homeScrollListView"
                            onScroll={(e) => this.onScrollList(e)}
                            listDatas={this.state.listDatas}
                            tips={this.tips}/>
      </View>
    )

  }
}
export default  HomeVC
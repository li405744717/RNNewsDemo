/**
 * Created by dp-k on 2016/10/27.
 */
import React,{Component} from "react"
import {View, Text,RefreshControl,
  ListView,ActivityIndicator} from "react-native"
import ListPage from './../../base/components/ListPage'
import Icon from "react-native-vector-icons/Ionicons"
import containerStyles from './../../assets/styles/containerStyles'
import HomeNewsCell from './HomeNewsCell'
import HomeImageSwiper from './HomeImageSwiper'
import NewsInfoVC from './NewsInfo/NewsInfoVC'
class HomeList extends ListPage {
  static propTypes = {
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
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
    this.listData = [];
    this.state = {
      dataSource:[],
      isRefreshing:false,
      isLoadingMore:false
    }
  }

  componentWillUnmount() {
    // console.log("HomeList.componentWillUnMount")
  }
  componentDidMount() {
    this.timer = setTimeout(()=>{
      this.listData = this.cellDatas
      this.setState({
        dataSource:this.setDataSource({data:this.listData})
      })
    },2000)
  }
  loadMore = () => {
    if(!this.state.isLoadingMore){
      //开始加载
      this.setState({
        showFooter:true,
        isLoadingMore:true
      })
      //2秒后加载成功
      setTimeout(()=>{
        console.log(this.listData.length)
        this.listData = this.listData.concat(this.cellDatas)
        console.log(this.listData.length)
        this.setState({
          dataSource:this.setDataSource({data:this.listData}),
          isLoadingMore:false,
        })
        setTimeout(()=>{
          this.setState({
            showFooter:false
          })
        },1000)
      },2000)
    }
  }
  onRefresh = () => {
    this.setState({
      isRefreshing:true
    })
    setTimeout(()=>{
      this.listData = this.cellDatas
      this.setState({
        isRefreshing:false,
        dataSource:this.setDataSource({data:this.listData})
      })
    },1000)
  }
  turnNewsInfoVC = () => {
    this.props.navigator.push({
      component:NewsInfoVC,
      title:"新闻详情",
      params:{
      }
    })
  }
  _renderRow(rowData,rowID){
    return(
      <HomeNewsCell cellType={rowData.cellType} title={rowData.text} images={rowData.images} isVideo={rowData.isVideo}
                    newsType={rowData.newsType} followNum={rowData.followNum} isAd={rowData.isAd} isLive={rowData.isLive}
                    onPress={() => this.turnNewsInfoVC()} rowID = {rowID}
      />
    )
  }
  render(){
    return (
      <View style={containerStyles.tabContentContainer}>
        {this.listData.length == 0 ?
          <View style={{alignItems:"center",justifyContent:"center",width:window.width}}>
            <Icon name="ios-download" size={300}/>
          </View>
          :
          <ListView renderRow={(rowData,sectionID,rowID) => this._renderRow(rowData,rowID)}
                    dataSource={this.state.dataSource}
                    enableEmptySections = {true}
                    renderHeader={() => {return <HomeImageSwiper/>}} ref={'listview'}
                    initialListSize={10}
                    stickyHeaderIndices={[]}
                    onEndReachedThreshold={-50}
                    scrollRenderAheadDistance={1}
                    pageSize={1}
                    onEndReached={this.loadMore}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        title="下拉刷新数据"
                        onRefresh={this.onRefresh}
                        colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                        progressBackgroundColor="#ffffff"
                      />
                    }
                    renderFooter={()=>{
                      return(
                        <View>
                          {
                            this.state.isLoadingMore ?
                              <View style={[containerStyles.mediate,{width: window.width, flexDirection: 'row',
                                backgroundColor: 'transparent', height: 45,backgroundColor:"transparent"}]}>
                                <ActivityIndicator/>
                                <Text>正在加载更多...</Text>
                              </View>
                              :
                              <View>
                                {this.state.showFooter ?
                                  <View style={[{height:45,backgroundColor:"transparent"},containerStyles.mediate]}>
                                    <Text>已加载所有数据</Text>
                                  </View>
                                  :
                                  null
                                }
                              </View>
                          }
                        </View>
                      )
                    }}
          >
          </ListView>
        }
        <View style={{height:44,width:window.width}}></View>
      </View>

    )

  }
}
export default HomeList
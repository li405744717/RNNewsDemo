/**
 * Created by dp-k on 2016/11/7.
 */
import React,{Component} from 'react'
import {View, StyleSheet, Text, Modal,StatusBar , WebView, Easing,TouchableWithoutFeedback, TextInput,
  ListView, TouchableOpacity,findNodeHandle, PanResponder, Animated, ScrollView} from "react-native"
import NewsFollowCell from './NewsFollowCell'
import NewsFollowCell2 from './NewsFollowCell2'
import {BlurView,VibrancyView} from 'react-native-blur'
import Icon from 'react-native-vector-icons/Ionicons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import EditView from './../Common/EditView'
class NewsFollowContent extends Component{
  constructor(){
    super()
    this.timer
    this.count = 0
    this.listData = {}
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2) => s1 !== s2
    });
    this.cellData = {
      name:"采姑娘的胡萝卜",
      time:"19小时前",
      content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
      address:"陕西省西安市",
      image:"",
      number:23,
      show:false,
    }
    this.cellData1 = {
      name:"采姑娘的胡萝卜123",
      time:"19小时前123",
      content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
      address:"陕西省西安市123",
      image:"",
      number:23123,
      show:false,
    }
    this.cellFollowData = {
      name:"采姑娘的胡萝卜",
      time:"19小时前",
      content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
      address:"陕西省西安市",
      image:"",
      number:23,
      show:false,
      follows:[
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        },
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        },
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        },
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        },
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        }
      ]
    }
    this.cellFollowData2 = {
      name:"采姑娘的胡萝卜",
      time:"19小时前",
      content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
      address:"陕西省西安市",
      image:"",
      number:23,
      show:false,
      follows:[
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        },
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        },
        {
          name:"采姑娘的胡萝卜",
          time:"19小时前",
          content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
          address:"陕西省西安市",
          image:"",
          number:23
        }
      ]
    }
    this.listData = {"热门跟帖0":[this.cellData,this.cellFollowData,this.cellFollowData2]}
    this.count ++ //用来更新listView的dataSource
    this.state = {
      dataSource : this.ds.cloneWithRowsAndSections(this.listData),
      loadMoreText:"加载更多",
      modalVisible:false,
      editVisible:false,
      opacity:new Animated.Value(0),
      scaleValue:new Animated.Value(0.5),
      editViewBottomValue:new Animated.Value(-150),
      editSendStatus:true,
      editOpacityValue:new Animated.Value(0)
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder:(e,g) => true,
      onPanResponderGrant:(e,g)=>{
        console.log("onPanResponderGrant")
        this._hideModal()
      },
      onPanResponderTerminationRequest: (e, g) => true,
    })
    this.editPanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(e,g) => true,
      onPanResponderGrant:(e,g)=>{
        this._cancel()
      },
      onPanResponderTerminationRequest: (e, g) => true,
    })
  }
  _showFollow = (rowID) => {
    console.log("############")
    var a = "热门跟帖"+(this.count -1)+""
    console.log(a)
    this.listData[a][rowID].show = true
    var tempDic =  this.listData['热门跟帖'+(this.count -1)+""]
    console.log(tempDic)
    this.listData = {}
    this.listData["热门跟帖"+this.count+""] = tempDic
    console.log(this.listData)
    this.count ++
    // console.log(this.listData['热门跟帖'][rowID])
    this.setState({
      dataSource:this.ds.cloneWithRowsAndSections(this.listData),
    })
  }
  _showModal = () => {
    console.log("showModal")
    this.setState({
      modalVisible:true
    })
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 1,
        }
      ),
      Animated.timing(
        this.state.scaleValue,
        {
          easing:Easing.linear,
          duration:200,
          toValue:1
        }
      )
    ]).start()
  }
  _hideModal = () => {
    console.log("hideModal")
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 0,
        }
      ),
      Animated.timing(
        this.state.scaleValue,
        {
          easing:Easing.linear,
          duration:200,
          toValue:0.7
        }
      )
    ]).start()
    var timer = setTimeout(() => {
      this.setState({
        modalVisible:false,
        opacity:new Animated.Value(0),
        scaleValue:new Animated.Value(0.7)
      })
    },200);

  }
  _renderRow = (rowData,sectionID,rowID) => {
    if(rowData.follows){
      var realLenght = rowData.follows.length //跟帖数
      var length = realLenght > 4 ? 4 : realLenght
      var cell = null //跟帖view
      if(rowData.show){ //显示楼层

        //最里层跟帖 层级为真实跟帖数-1
        var tempCell =  <NewsFollowCell2 level={realLenght-1} serialNum={1} _answer={() => this._showModal()}
                                         hidden={true} _onPress={()=> this._showFollow(rowID)}/>
        for(var i = 0 ;i < realLenght - 1 ; i++ ){
          var serialNum = i + 2 //跟帖数从2开始计数
          var hidden = true
          cell = <NewsFollowCell2 level={realLenght-2-i} serialNum={serialNum} _answer={() => this._showModal()}
                                  cell={tempCell} hidden={hidden} _onPress={()=>this._showFollow(rowID)}/>
          tempCell = cell
        }
      }else { //隐藏楼层
        //最里层跟帖 层级为length-1
        var tempCell =  <NewsFollowCell2 level={length-1} serialNum={1} _answer={() => this._showModal()}
                                         hidden={true} _onPress={()=> this._showFollow(rowID)}/>
        for(var i = 0 ;i < length - 1 ; i++ ){
          var serialNum = i + 2 //跟帖数从2开始计数
          var hidden = true
          if(i == length-2 && realLenght > 4){//跟帖数大于4，最后一个跟帖序号显示为真实跟帖数
            serialNum = realLenght
          }
          if(i == length-3 && realLenght > 4){ //跟帖数大于4，倒数第二个跟帖view为显示隐藏楼层
            hidden = false
          }
          cell = <NewsFollowCell2 level={length-2-i} serialNum={serialNum} _answer={() => this._showModal()}
                                  cell={tempCell} hidden={hidden} _onPress={()=>this._showFollow(rowID)}/>
          tempCell = cell
        }
      }
    }
    return <NewsFollowCell overflow={true} cell={cell}/>
  }
  _renderSectionHeader = (data,sectionID) => {
    // if(sectionID != "热门跟帖"){
    //   return null
    // }
    //sectionID 为热门跟帖+count ，截取前4位显示sectionHeader
    return <View style={styles.header}>
      <Text style={{color:"white",fontSize:13}}>{sectionID.slice(0,4)}</Text>
    </View>
  }
  _renderFootView = () => {
    return <View style={styles.foot}>
      <Text style={{fontSize:13}}>{this.state.loadMoreText}</Text>
    </View>
  }
  _loadMoreFollw = () => {
    this.timer = setTimeout(()=>{
      for(var i = 0;i<3;i++){
        this.listData['热门跟帖'+(this.count-1)+""].push(this.cellData)
        this.setState({
          dataSource:this.ds.cloneWithRowsAndSections(this.listData)
        })
      }
    },3000)

  }
  _showEdit = () => {
    this._hideModal()
    this.refs.editView._showEdit()
  }
  _hideEdit = () => {

  }
  _send = () => {

  }
  _cancel = () => {
    this._hideEdit()
    this.setState({
      flag:true
    })
  }
  _onChangeText(content){
    this.setState({
      editSendStatus:content == "" ? true : false
    })
    var style = content == "" ? {fontSize:14,color:"#AAAAAA"} : {fontSize:14,color:"black"}

    console.log(style)
    this.refs.sendBtn.setNativeProps({style})
  }
  render(){
    console.log(this.state.modalVisible ? "出来吧" : "隐藏吧")
    var answerView = "";
    return(
      <View style={{flex:1}}>

        <ListView renderRow={(rowData,sectionID,rowID) => this._renderRow(rowData,sectionID,rowID)}
                    renderSectionHeader={(data,sectionID,) => this._renderSectionHeader(data,sectionID)}
                    dataSource={this.state.dataSource}
                    renderFooter={() => this._renderFootView()}
                    style={{flex:1}}
                    keyboardShouldPersistTaps = { true }
                    automaticallyAdjustContentInsets = { false }
                    keyboardDismissMode = 'interactive'
                    initialListSize={5}
                    pageSize={5}
                    onEndReachedThreshold={0}
                    onEndReached={() => this._loadMoreFollw()}
                    scrollRenderAheadDistance={88}
        >
        </ListView>
        {this.state.modalVisible ?
          <BlurView blurType="light" blurAmount={100} {...this._panResponder.panHandlers}
                    style={[styles.modal,{top:-window.navHeight,height:window.height+window.navHeight}]} >
          </BlurView>
          :
          null
        }
        {this.state.modalVisible ?
          <Animated.View style={[styles.answerView,{opacity:this.state.opacity, transform: [{scale: this.state.scaleValue}]}]}>
            <View style={{flexDirection:"row",flexWrap:"wrap",height:100}}>
              <TouchableWithoutFeedback  onPress={() => this._showEdit()}>
                <View style={styles.fondationContainer}>
                  <FIcon  name="edit" size={30} style={styles.fondationIcon}/>
                  <Text style={styles.fondationText}>回复</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.fondationContainer}>
                <Icon  name="ios-share" size={30} style={styles.fondationIcon}/>
                <Text style={styles.fondationText}>分享</Text>
              </View>
              <View style={styles.fondationContainer}>
                <Icon  name="logo-xbox" size={30} style={styles.fondationIcon}/>
                <Text style={styles.fondationText}>收藏</Text>
              </View>
              <View style={styles.fondationContainer}>
                <Icon  name="ios-copy" size={30} style={styles.fondationIcon}/>
                <Text style={styles.fondationText}>复制</Text>
              </View>
              <View style={styles.fondationContainer}>
                <Icon  name="md-eye" size={30} style={styles.fondationIcon}/>
                <Text style={styles.fondationText}>举报</Text>
              </View>
            </View>
            <Icon name="ios-close-circle-outline" size={35} onPress={() => this._hideModal()}></Icon>
          </Animated.View>
          :
          null
        }
        <EditView ref="editView" _showEdit={() => this._showEdit()} _hideEdit={() => this._hideEdit()} _send={() => this._send()}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header:{
    top:5,
    backgroundColor:"#FF3333",
    padding:5,
    paddingLeft:15,
    borderRadius:20,
    width:80,
    left:-10
  },
  foot:{
    borderRadius:5,
    margin:5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f0f0f4",
    height:44
  },
  modal:{
    justifyContent:"center",
    alignItems:"center",
    width:window.width,
    position:"absolute",
    left:0,
    backgroundColor:"transparent",
    top:-window.navHeight,
    height:window.height+window.navHeight
  },
  answerView:{
    backgroundColor:"white",
    width:window.width-40,
    position:"absolute",
    height:160,
    top:window.height/2-80-window.navHeight,
    left:20,
    paddingTop:20,
    paddingBottom:20,
    alignItems:"center"
  },
  fondationText:{
    color:"black",
    fontSize:14
  },
  fondationIcon:{
    flex:1
  },
  fondationContainer:{
    flexDirection:"row",
    alignItems:"center",
    width:(window.width-40)/3,
    height:50,padding:20
  }
})
export default NewsFollowContent
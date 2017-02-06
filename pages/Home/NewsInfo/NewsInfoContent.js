/**
 * Created by dp-k on 2016/10/27.
 */
import React,{Component} from 'react'
import {View, StyleSheet, Text, StatusBar , WebView, ScrollView, TouchableOpacity,findNodeHandle, PanResponder} from "react-native"
import {UIManager} from 'NativeModules'
import Spinner from 'react-native-spinkit'
import Web from 'react-native-webview2'
import Icon from 'react-native-vector-icons/Ionicons'
import NewsInfoFollowCell from './NewsInfoFollowCell'
import NewsInfoRelativeNewsCell from './NewsInfoRelativeNewsCell'
import NewsInfoCloseView from './NewsInfoCloseView'
import NewsFollowVC from './../NewsFollow/NewsFollowVC'
class NewsInfoContent extends Component {
  constructor(){
    super()
    this.state = {
      webUrl:"",
      isVisible:false,
      channel:"娱乐频道",
      closeText:"上班"
    }
    this.beginTouch = false
    this.endTouch = false
    this.endTouch2 = false
    this.curUrl = ""
    this.nextUrl = ""
  }

  componentWillMount() {
    this.panHandlers = PanResponder.create({
      onStartShouldSetPanResponder:() => true,

      onPanResponderGrant:() => {
        console.log("onResponderGrant")
        this.beginTouch  = true
        this.endTouch2 =false
        this.endTouch = false
        console.log(this.endTouch)
      },
      onPanResponderRelease:() => {
        console.log("onResponderRelease")
        this.endTouch = true
        this.beginTouch  = false
        console.log(this.endTouch)
        var view = this.refs.closeView
        var handle = findNodeHandle(view)
        UIManager.measure(handle,(x,y,width,height,pageX,pageY) => {
          if(this.endTouch && pageY <= window.height-44-70){
            console.log("提示释放时，释放,计时")
            this.refs.closeView.setView(false,true)
          }
        })
      }
    })
  }
  changeCloseView = (e) => {
    var view = this.refs.closeView
    var handle = findNodeHandle(view)
    var timer
    var style ={marginTop:2}
    if(handle){
      UIManager.measure(handle,(x,y,width,height,pageX,pageY) => {
        if(pageY <= window.height-44-70){
          this.refs.closeView.setView(true,false)
        }else{
          this.refs.closeView.setView(false,false)
        }
      })
    }
  }

  componentDidMount() {
    // console.log("@@@@@@@@@@@")
    // this.refs.web.go("http://dnf.duowan.com")
  }
  render(){
    var shareView = <View style={styles.shareView}>
      <View style={styles.line}>
        <View style={{flex:1,height:window.pixel,backgroundColor:"#AAAAAA", width:window.width-20}}></View>
        <View style={styles.shareTextView}><Text style={styles.shareText}>分享</Text></View>
      </View>
      <View style={{flexDirection:"row"}}>
        <View style={styles.shareBtn}>
          <Icon name="logo-twitter" size={25} color="#44cef6"></Icon>
          <Text style={styles.shareText2}>微信好友</Text>
        </View>
        <View style={styles.shareBtn}>
          <Icon name="logo-xbox" size={25} color="#44cef6"></Icon>
          <Text style={styles.shareText2}>微信盆友圈</Text>
        </View>
        <View style={styles.shareBtn}>
          <Icon name="logo-youtube" size={25} color="#44cef6"></Icon>
          <Text style={styles.shareText2}>QQ好友</Text>
        </View>
        <View style={styles.shareBtn}>
          <Icon name="ios-more" size={25} color="#44cef6"></Icon>
          <Text style={styles.shareText2}>更多</Text>
        </View>
      </View>
    </View>
    var followView = <TouchableOpacity style={styles.followViewContainer}
                                       onPress={this.props._turnFollowVC}>
      <View style={styles.followHead}>
        <Text style={{color:"#FF3333",fontSize: 13}}>热门跟帖</Text>
      </View>
      <View>
        <NewsInfoFollowCell></NewsInfoFollowCell>
        <NewsInfoFollowCell></NewsInfoFollowCell>
        <NewsInfoFollowCell></NewsInfoFollowCell>
      </View>
      <View style={styles.followFoot}>
        <Text style={{color:"#44cef6",fontSize: 13}}>查看更多跟帖</Text>
      </View>
    </TouchableOpacity>
    var moreNews = <View style={styles.moreNewsContainer}>
      <Icon style={{marginTop:2}} name="ios-paper-outline" color="black" size={25}/>
      <Text style={{flex:1,color:"black",fontSize:13,marginLeft:5}}>进入<Text style={{color:"#FF3333",fontSize:13}}>{this.state.channel}</Text>阅读更多精彩内容</Text>
      <Icon style={{marginTop:2}} name="md-arrow-dropright" color="black" size={25}/>
    </View>
    var relativeNews = <View style={styles.relativeNewsContainer}>
      <View style={styles.followHead}>
        <Text style={{color:"#FF3333",fontSize: 13}}>热门跟帖</Text>
      </View>
      <View>
        <NewsInfoRelativeNewsCell borderBottomWidth={window.pixel} borderColor="#AAAAAA"></NewsInfoRelativeNewsCell>
        <NewsInfoRelativeNewsCell borderBottomWidth={window.pixel} borderColor="#AAAAAA"></NewsInfoRelativeNewsCell>
        <NewsInfoRelativeNewsCell></NewsInfoRelativeNewsCell>
      </View>
    </View>

    return(
      <View style={styles.webView}>
        <ScrollView onScroll={(e) => this.changeCloseView(e)} scrollEventThrottle={1}
                    scrollEnabled={!this.state.isVisible}
                    {...this.panHandlers.panHandlers}>
          {/*<Web*/}
            {/*ref = "web"*/}
            {/*source={{uri:this.state.webUrl}}*/}
            {/*onNavigationStateChange = {(info) => {*/}
              {/*console.log("info",info)*/}
              {/*this.nextUrl = info.url*/}

            {/*}}*/}
            {/*onLoadEnd={() => {*/}
              {/*this.setState({*/}
                {/*isVisible:false*/}
              {/*})*/}
            {/*}}*/}
            {/*onContentSizeChange={(e) => {*/}
               {/*console.log('onContentSizeChange');*/}
               {/*console.log(e);*/}
            {/*}}*/}
            {/*onLoadStart={() => {*/}
              {/*this.setState({*/}
                {/*isVisible:true*/}
              {/*})*/}

            {/*}}*/}
          {/*>*/}
          {/*</Web>*/}
          {this.state.isVisible ?
            <View style={styles.spinnerContainer}>
              <Spinner size={50} isVisible={this.state.isVisible} type="FadingCircleAlt" color="blue"></Spinner>
            </View>
            :
            null
          }
          {!this.state.isVisible ?
            <View>
              {shareView}
              {followView}
              {moreNews}
              {relativeNews}
              <NewsInfoCloseView ref="closeView" navigator = {this.props.navigator}/>
            </View>
              :
            null
          }
        </ScrollView>
      </View>
    )
  }
}
//<View style={[styles.webView,{backgroundColor:"red"}]}></View>
const styles = StyleSheet.create({
  webView:{
    height:window.height - 64 ,
    width:window.width,
    backgroundColor:"whitesmoke"
  },
  spinnerContainer:{
    position:"absolute",
    height:window.height - 64 - 44,
    top:0,
    width:window.width,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white"
  },
  shareView:{
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10,
    marginTop:20,
  },
  line:{
    justifyContent:"center",
    height:20,
    flexDirection:"row",
    alignItems:"center"
  },
  shareBtn:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  shareTextView:{
    position:"absolute",
    width:40,
    height:20,
    left:window.width/2 - 30,
    backgroundColor:"whitesmoke",
    alignItems:"center",
    justifyContent:"center"
  },
  shareText:{
    color:"#AAAAAA",
    fontSize:13
  },
  shareText2:{
    color:"#AAAAAA",
    fontSize:10
  },
  followViewContainer:{
    borderWidth:window.pixel,
    borderColor:"#AAAAAA",
    width:window.width-20,
    marginLeft:10,
    marginRight:10,
    backgroundColor:"white"
  },
  followHead:{
    borderBottomWidth:window.pixel,
    borderColor:"#AAAAAA",
    height:25,
    justifyContent:"center",
    paddingLeft:10
  },
  followFoot:{
    height:40,
    justifyContent:"center",
    alignItems:"center"
  },
  moreNewsContainer:{
    flexDirection:"row",
    padding:10,
    marginTop:10,
    backgroundColor:"white",
    borderWidth:window.pixel,
    borderColor:"#AAAAAA",
    marginLeft:10,
    marginRight:10,
    alignItems:"center",
    height:40
  },
  relativeNewsContainer:{
    marginLeft:10,
    marginRight:10,
    borderWidth:window.pixel,
    borderColor:"#AAAAAA",
    backgroundColor:"white",
    width:window.width-20,
    marginTop:10,
    marginBottom:5
  },

  style1:{
    marginTop:2
  }
})
export default NewsInfoContent
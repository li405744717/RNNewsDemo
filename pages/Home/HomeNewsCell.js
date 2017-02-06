/**
 * Created by dp-k on 2016/10/27.
 */
import React,{Component} from "react"
import {View, Image,StyleSheet, Text, ScrollView, TouchableOpacity, LayoutAnimation } from "react-native"
import CommonStyles from '../../assets/styles/CommonStyles'
import Icon from "react-native-vector-icons/Ionicons"
import CacheImage from 'react-native-cacheable-image'
class HomeNewsCell extends Component {
  static propTypes = {
    cellType:React.PropTypes.string.isRequired,
    title:React.PropTypes.string.isRequired,
    images:React.PropTypes.array.isRequired,
    newsType:React.PropTypes.string.isRequired,
    followNum:React.PropTypes.number.isRequired,
    isAd:React.PropTypes.bool.isRequired,
    isVideo:React.PropTypes.bool.isRequired,
    isLive:React.PropTypes.bool.isRequired
  }

  static defaultProps = {}
  constructor(props){
    super(props)
    this.state = {
      cellType:"",
      images:[],
      title:"",
      newsType:"",
      followNum:0,
      isAd:false,
      isVideo:false,
      isLive:false
    }
  }

  componentDidMount() {

    this.setState({
      cellType: this.props.cellType,
      images:this.props.images,
      title:this.props.title,
      newsType:this.props.newsType,
      followNum:this.props.followNum,
      isAd:this.props.isAd,
      isVideo:this.props.isVideo,
      isLive:this.props.isLive
    })
  }
  render(){
    var footView = this.state.isAd == false ?
      <View style={{flexDirection:"row",alignItems:"center"}}>
        <Text style={[styles.footTextSize,{flex:1}]}>{this.state.newsType}</Text>
        <View style={styles.follwView}><Text style={[styles.footTextSize]}>{this.state.followNum}{this.state.isLive ? "参与" : "跟帖"}</Text></View>
        {this.state.isLive ? <View style={[styles.adView,{backgroundColor:"red"}]}><Text style={[styles.footTextSize,{color:"white"}]}>正在直播</Text></View> : null}
        {this.state.isVideo ? <Icon style={styles.videoView} name="ios-videocam-outline" size={20} color="red"/> : null}
        <View style={styles.closeView}><Icon size={12} name="md-close" color="silver"/></View>
      </View>
      :
      <View style={{flexDirection:"row",alignItems:"flex-end"}}>
        <Text style={[styles.footTextSize,{flex:1}]}>{this.state.newsType}</Text>
        <View style={styles.adView}><Text style={[styles.footTextSize,{color:"white"}]}>广告</Text></View>
      </View>
    return(
      <TouchableOpacity {...this.props} >
        {
          this.state.cellType === "image"  ?
            <View style={styles.container}>
              <Text numberOfLines={2}>{this.state.title}</Text>
              {this.state.images.length == 1 && this.state.cellType === "image" ?
                <View style={styles.contentContainer}>
                  <Image key={this.props.rowID+"0"}style={styles.img} source={{uri:this.state.images[0]}} onLoadStart={() => console.log("Image.onLoadStart")}></Image>
                </View>
                :
                <View style={styles.contentContainer}>
                  <Image key={this.props.rowID+"0"} style={styles.imgs} source={{uri:this.state.images[0]}}></Image>
                  <Image key={this.props.rowID+"1"} style={styles.imgs} source={{uri:this.state.images[1]}}></Image>
                  <Image key={this.props.rowID+"2"} style={styles.imgs} source={{uri:this.state.images[2]}}></Image>
                </View>
              }
              {footView}
              <View style={styles.line}></View>
            </View>
            :
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                <Image key={this.props.rowID+"0"} style={styles.imgs} source={{uri:this.state.images[0]}}></Image>
                <View style={{flexDirection:"column",flex:1}}>
                  <Text numberOfLines={2} style={{flex:1,marginBottom:5}}>{this.state.title}</Text>
                  {footView}
                </View>
              </View>
              <View style={styles.line}></View>
            </View>

        }
      </TouchableOpacity>

    )
  }

}
const styles = StyleSheet.create({
  container:{
    width:window.width,
    flexDirection:"column",
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    backgroundColor:"white"
  },
  contentContainer:{
    flexDirection:"row",
    marginTop:5,
    marginBottom:5
  },
  img:{
    height:100,
    width:(window.width - 20),
    resizeMode:"cover",
  },
  imgs:{
    height:70,
    width:(window.width - 40) / 3,
    resizeMode:"cover",
    marginRight:10
  },
  line:{
    height:window.pixel,
    left:-10,
    width:window.width,
    backgroundColor:"silver",
    marginTop:5
  },
  follwView:{
    borderRadius:10,
    backgroundColor:"#EEEEEE",
    paddingLeft:5,
    paddingRight:5,
    marginLeft:5,
    // height:18,
    // width:60
  },
  videoView:{
    marginLeft:5,
    marginTop:2
  },
  closeView:{
    borderRadius:10,
    backgroundColor:"#EEEEEE",
    paddingLeft:7,
    paddingRight:7,
    marginLeft:5,
  },
  footTextSize:{
    fontSize:12,
    color:"#AAAAAA",
    backgroundColor:"transparent"
  },
  adView:{
    borderRadius:2,
    backgroundColor:"#AAAAAA",
    paddingLeft:1,
    paddingRight:1,
    marginLeft:5,
  }

})
export default HomeNewsCell
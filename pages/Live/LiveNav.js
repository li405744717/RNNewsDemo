/**
 * Created by dp-k on 2016/11/18.
 */

import React, { Component, } from 'react'
import { View, StyleSheet, Dimensions, Text, Animated, Easing, TouchableOpacity,LayoutAnimation,
findNodeHandle} from 'react-native'
import CommonStyles from '../../assets/styles/CommonStyles'
import {UIManager} from 'NativeModules'
import Icon from 'react-native-vector-icons/Ionicons'
class LiveNav extends Component {

  static propTypes = {
    _changeTab:React.PropTypes.func.isRequired
  }

  static defaultProps = {}


  constructor(props) {
    super(props)
    this.state = {

    }
  }
  changeTab = (width) => {
    // console.log("changeTab","rgba(255,"+width/window.width*255+","+width/window.width*255+",1)")
    var style = {
      color:"rgba(255,"+width/window.width*255+","+width/window.width*255+",1)",
    }
    this.refs.text1.setNativeProps({style})
    this.changeTab2(width)
    this.changeTabPlane(width)
  }
  changeTab2 = (width) => {
    var style = {
      color:"rgba(255,"+(1-width/window.width)*255+","+(1-width/window.width)*255+",1)",
    }
    this.refs.text2.setNativeProps({style})
  }
  changeTabPlane = (width) => {
    var style = {
      left:width/window.width*window.width*3/8 - 1
    }
    LayoutAnimation.linear()
    this.refs.tabPlane.setNativeProps({style})
    var handler = findNodeHandle(this.refs.tabPlane)

  }
  render() {
    return (
      <View style = {[CommonStyles.commonNav,{justifyContent:"center",alignItems:"center"}]}>
        <View style={styles.liveTab}>
          <View style={styles.tabPlane} ref="tabPlane">
          </View>
          <TouchableOpacity style={styles.tabTitle} onPress={() => {this.props._changeTab(0)}}>
            <Text ref="text1" style={[styles.tabText,{color:"#FF3333"}]}>热门</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabTitle,{left:window.width*3/8}]} onPress={() => {this.props._changeTab(window.width)}}>
            <Text ref="text2" style={styles.tabText}>分类</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles =  StyleSheet.create({
  topTile:{
    fontSize:18,
    color:"#fff"
  },
  liveTab:{
    borderWidth:window.pixel*2,
    borderColor:"white",
    borderRadius:30,
    width:window.width*3/4,
    height:30,
    flexDirection:"row"
  },
  tabPlane:{
    borderColor:"white",
    borderRadius:30,
    width:window.width*3/8,
    height:29,
    left:-1,
    right:-1,
    backgroundColor:"white",
    position:"absolute"
  },
  tabTitle:{
    position:"absolute",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"transparent",
    width:window.width*3/8,
    height:29,
    top:0,
    left:0,
  },
  tabText:{
    color:"white",
    fontSize:14,
  }
})
export default LiveNav
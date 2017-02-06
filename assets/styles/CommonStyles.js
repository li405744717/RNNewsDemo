/**
 * Created by dp-k on 2016/10/26.
 */
import React,{Component} from "react"
import {View, StyleSheet, Dimensions, Platform ,PixelRatio} from "react-native"
let navHeight = Platform.OS === 'ios' ? 64 : 44
window.navHeight = Platform.OS === 'ios' ? 64 : 44
window.pixel = 1/PixelRatio.get()
let {width, height} = Dimensions.get('window')
var CommonStyles = StyleSheet.create({
  container:{
    height:height,
    width:width,
    backgroundColor:"white"
  },
  absolute:{
    position:"absolute",
    top:0
  },
  center:{
    justifyContent:"center",
    alignItems:"center"
  },
  commonNav:{
    height:navHeight,
    paddingTop:navHeight-44,
    width:width,
    backgroundColor:"#FF3333",
    flexDirection:"row"
  },
  titleContainer:{
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    width:width,
    height:44
  },
  leftIconContainer:{
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    left:10,
    height:44
  },
  rightIconContainer:{
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    right:10,
    height:44,
  },
  row:{
    overflow:"hidden"
  }
})
export default  CommonStyles

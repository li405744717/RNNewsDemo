/**
 * Created by dp-k on 2016/12/15.
 */
import RootSiblings from 'react-native-root-siblings'
import containerStyles from '../../assets/styles/containerStyles'
import React, {Component} from 'react';
import {View, Text, TouchableHighlight,} from 'react-native';
var elements = []
check = (navigator,component) => {
  if(!navigator){
    console.log("未传入navigator")
    return false
  }
  if(!component){
    console.log("未传入component")
    return false
  }
}
push = (navigator,component,title,data,previousComponent) => {
  if(check(navigator,component)) return
  navigator.push({
    component:component,
    title:title,
    params:{
      data:data,
      previousComponent:previousComponent
    }
  })
}
resetTo = (navigator,component,title,data) => {
  if(check(navigator,component)) return
  navigator.resetTo({
    component:component,
    title:title,
    params:{
      data:data
    }
  })
}
pop = (navigator) => {
  if(navigator == null) return
  navigator.pop()
}
alertWithCallback = (title,leftText,leftCallback,rightText,rightCallback) => {
  var sibling = new RootSiblings(<View style={[containerStyles.alertContainer]}>
      <View style={containerStyles.alertView}>
        <View style = { containerStyles.tipTitleView} >
          <Text style = {[containerStyles.tipTitleText,{fontSize:18,marginBottom:10}]}>提示</Text>
          <Text style = {[containerStyles.tipTitleText,{fontSize:15}]}>{title}</Text>
        </View>
        <View style = {{ flexDirection:"row" ,marginTop:35}}>
          { (leftText && leftText != "") ?
            <TouchableHighlight style = { containerStyles.tipLeftContentView } underlayColor = '#f0f0f0'
                                onPress = {() => {
                                  if(leftCallback){
                                    leftCallback()
                                  }
                                  destroySibling()
                                }}>
              <View>
                <Text style = { containerStyles.tipText }>{leftText}</Text>
              </View>
            </TouchableHighlight>
            :
            null
          }
          { (rightText && rightText != "") ?
            <TouchableHighlight style = { containerStyles.tipRightContentView } underlayColor = '#f0f0f0'
                                onPress = {() => {
                                  if(rightCallback){
                                    rightCallback()
                                  }
                                  destroySibling()
                                }}>
              <View>
                <Text style = { containerStyles.tipText }>{rightText}</Text>
              </View>
            </TouchableHighlight>
            :
            null
          }
        </View>
      </View>
    </View>);
  elements.push(sibling);
}
shortAlert = (title) => {
  var sibling = new RootSiblings(<View style={[containerStyles.alertContainer]}>
    <View style={containerStyles.shortAlertView}>
      <View style = { [containerStyles.tipTitleView,{height:40,paddingTop:0}]} numberOfLines={1}>
        <Text style = {[containerStyles.tipText] }>{title}</Text>
      </View>
    </View>
  </View>);
  elements.push(sibling);
  setTimeout(()=>{
    destroySibling()
  },1500)
}
destroySibling = () => {
  console.log("@@@@@@@@@@destroySibling");
  while(elements.length > 0){
    var lastSibling = elements.pop()
    lastSibling && lastSibling.destroy()
  }
}
base64TurnImage = (base64) => {
  var base64Icon = 'data:image/png;base64,'+base64
  var imageSource = {uri:base64Icon}
  return imageSource
}
const CommonTools = {
  "push" : push,
  "resetTo":resetTo,
  'pop':pop,
  "alertWithCallback":alertWithCallback,
  "shortAlert":shortAlert,
  "base64TurnImage":base64TurnImage
}
export default CommonTools
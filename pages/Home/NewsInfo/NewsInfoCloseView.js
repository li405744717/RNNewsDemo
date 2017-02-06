/**
 * Created by dp-k on 2016/11/4.
 */
import React, { Component, } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity , Image,} from 'react-native'
class NewsInfoCloseView extends Component{
  constructor(){
    super()
    this.state = {
      closeImage : "ios-close-circle",
      closeText : "上拉"
    }
    this.closeRight = true
    this.date = new Date()
    this.first1 = true
    this.first2 = true

  }
  setView(flag,endTouch){


    if(flag){
      this.setState({
        closeText:"释放",
        closeImage:"ios-close-circle"
      })
      if(this.first1){
        this.date = new Date()
        this.first1 = false
        this.time1 = this.date.getTime()
        console.log(this.time1)
      }
      this.first2 = true
    }else{
      if(this.first2 && endTouch){
        console.log("计时")
        this.date = new Date()
        this.first2 = false
        this.time2 = this.date.getTime()
        console.log(this.time2)
      }
      this.first1 = true

      if(this.time2 - this.time1 >= 700 && this.closeRight){
        this.closeRight = false
        this.props.navigator.pop()
        console.log("关闭页面")
      }
      this.setState({
        closeText:"上拉",
        closeImage:"ios-download-outline"
      })

    }
  }
  render(){
    return(
      <View style={styles.closeView}>
        <Icon style={{marginTop:2}} name={this.state.closeImage} size={30} color="#AAAAAA"/>
        <Text style={{color:"#AAAAAA",marginLeft:10}}>{this.state.closeText}关闭当前页</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  closeView:{
    flexDirection:"row",
    height:44,
    alignItems:"center",
    width:window.width,
    backgroundColor:"whitesmoke",
    justifyContent:"center"
  },
})
export default NewsInfoCloseView
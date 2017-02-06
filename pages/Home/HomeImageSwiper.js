/**
 * Created by dp-k on 2016/10/26.
 */
import React,{Component} from "react"
import {View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, LayoutAnimation } from "react-native"
import CommonStyles from '../../assets/styles/CommonStyles'
import Icon from "react-native-vector-icons/Ionicons"
import Swiper from  "react-native-swiper"
class HomeImageSwiper extends  Component {
  constructor(){
    super();

    this.prePageIndex = 0
    this.firstScroll = 0
    this.contents = [
      "Hello Swiper Info Content",
      "Beautiful Info Content",
      "And simple Info Content",
      "Then difficult Info Content"
    ]
    this.state = {
      infoSwiperIndex:1,
      swiperCount:4,
      content:this.contents[0]
    }
  }
  onScroll(e){
    var pageIndex = e.nativeEvent.contentOffset.x / window.width
    if(pageIndex%1 == 0){
      if(this.firstScroll > 0) {
        var pageIndex = e.nativeEvent.contentOffset.x / window.width
        var value = pageIndex - this.prePageIndex
        var relative = value == 1 || value == -(this.state.swiperCount - 1) ? 1 : -1
        if(this.firstScroll == 1){
          relative *= -1
          if(value == 0) relative = -1
        }
        if(pageIndex != this.prePageIndex ){
          // this.refs["infoSwiper"].scrollBy(relative,true)
          var index = relative > 0 ? pageIndex-1 : pageIndex+relative
          if(index == -1) index = this.contents.length - 1  //左滑到最后一张，实际pageindex是0
          if(pageIndex == this.contents.length + 1) index=0 //一个循环回到第一张，实际上pageindex是长度+1
          console.log(pageIndex,this.prePageIndex,value,relative,index)
          this.setState({
            content:this.contents[index]
          })
        }
        this.prePageIndex = pageIndex
      }
      this.firstScroll ++
    }
  }
  contentOnScroll = (e) => {

  }
  render(){
    return(
      <View style={{flexDirection:"column"}}>
        <Swiper height={150}
                scrollEventThrottle={1}
                paginationStyle = {styles.paginationStyle}
                onScroll={(e) => this.onScroll(e)}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>Then difficult</Text>
          </View>
        </Swiper>
        <View style={[styles.wrapper,{width:window.width}]}>
          <Text style={styles.text}>{this.state.content}</Text>
          {/*<Swiper height={20} showsPagination={false} width={window.width - 20*(this.state.swiperCount)}*/}
                  {/*ref = "infoSwiper" loadMinimal={true} scrollEnabled={false}*/}
                  {/*onScroll={this.contentOnScroll}>*/}
            {/*<View >*/}
              {/*<Text style={styles.text}>Hello Swiper Info Content</Text>*/}
            {/*</View>*/}
            {/*<View >*/}
              {/*<Text style={styles.text}>Beautiful Info Content</Text>*/}
            {/*</View>*/}
            {/*<View >*/}
              {/*<Text style={styles.text}>And simple Info Content</Text>*/}
            {/*</View>*/}
            {/*<View >*/}
              {/*<Text style={styles.text}>Then difficult Info Content</Text>*/}
            {/*</View>*/}
          {/*</Swiper>*/}
        </View>
      </View>

    )
  }
}
var styles = StyleSheet.create({
  wrapper: {
    top:105,
    left:0,
    paddingLeft:10,
    height:20,
    backgroundColor:"#000",
    opacity:0.2,
    position:"absolute",
  },
  paginationStyle:{
    justifyContent:"flex-end",
    marginRight:10,
    height:20,
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    height:150,
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
    height:150,
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    height:150,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  }
})
export default HomeImageSwiper
/**
 * Created by dp-k on 2016/11/3.
 */
import React, { Component, } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity , Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CacheImage from 'react-native-cacheable-image'
class NewsInfoRelativeNewsCell extends Component {
  constructor(){
    super()
    this.state = {
      newsAddress:"北青网-北京青年报",
      time:"2016-11-01",
      title:"这个省级职务 现任最年轻记录不断更新",
      imageURL:"http://s1.dwstatic.com/group1/M00/05/70/dd4c8e3b77f5e7c20ca1477d09653572.png"
    }
  }
  render(){
    return(
      <View  style={[styles.relativeNewsContainer,{...this.props}]}>
        <CacheImage style={styles.imgs} source={{uri:this.state.imageURL}}></CacheImage>
        <View style={styles.relativeNewsContent}>
          <Text numberOfLines={2} style={{marginRight:5,flex:1}}>{this.state.title}</Text>
          <Text style={{marginRight:5,fontSize:10,color:"#AAAAAA"}}>{this.state.newsAddress+" "+this.state.time}</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  relativeNewsContainer:{
    flexDirection:"row",
    padding:10
  },
  relativeNewsContent:{
    paddingLeft:5,
    paddingRight:5,
    paddingBottom:5,
    flexDirection:"column",
    flex:1
  },
  imgs:{
    height:70,
    width:(window.width - 40) / 3,
    resizeMode:"cover",
  },
})
export default NewsInfoRelativeNewsCell
/**
 * Created by dp-k on 2016/11/7.
 */
import React,{Component} from "react"
import {View, Image,StyleSheet, Text, ScrollView, TouchableOpacity, LayoutAnimation, StatusBar } from "react-native"
import CommonStyles from '../../../assets/styles/CommonStyles'
import NewsFollowContent from './NewsFollowContent'
import NewsFollowNav from './NewsFollowNav'
import CommonNavBar from './../../../base/components/CommonNavBar'
import Icon from 'react-native-vector-icons/Ionicons'
class NewsFollowVC extends Component {
  _pop = () => {
    this.props.navigator.pop()
  }
  render(){
    return(
      <View style={[CommonStyles.container]}>
        <CommonNavBar
          leftView={
            <Icon onPress={this._pop} name="md-arrow-dropleft-circle" size={30} color="#FF3333"/>
          }
          _style={{backgroundColor:"#fff",borderBottomWidth:1,borderColor:"#AAAAAA"}}
        >
        </CommonNavBar>
        <NewsFollowContent navigator = {this.props.navigator}></NewsFollowContent>
      </View>
    )
  }
}
export default NewsFollowVC
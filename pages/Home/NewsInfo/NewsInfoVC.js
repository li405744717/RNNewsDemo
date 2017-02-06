/**
 * Created by dp-k on 2016/10/27.
 */
import React,{Component} from "react"
import {View, Image,StyleSheet, Text, ScrollView, TouchableOpacity,
  PanResponder, LayoutAnimation, StatusBar, Animated, Easing , TextInput} from "react-native"
import NewsInfoNav from './NewsInfoNav'
import CommonStyles from '../../../assets/styles/CommonStyles'
import NewsInfoContent from './NewsInfoContent'
import NewsInfoFootView from './NewsInfoFootView'
import NewsFollowVC from './../NewsFollow/NewsFollowVC'
import EditView from './../Common/EditView'
import CommonNavBar from './../../../base/components/CommonNavBar'
import Icon from 'react-native-vector-icons/Ionicons'
class NewsInfoVC extends Component {
  _showEdit = () => {
    this.refs.editView._showEdit()
  }
  _pop = () =>{
    this.props.navigator.pop()
  }
  _turnFollowVC = () => {
    this.props.navigator.push({
      component:NewsFollowVC
    })
  }
  render(){
    StatusBar.setBarStyle(0)
    return(
      <View style={[CommonStyles.container]}>
        <CommonNavBar
          rightView={
            <TouchableOpacity style={styles.newsInfoNavRightView} onPress={this._turnFollowVC}>
              <Text style={styles.newInfoNavText}>60918跟帖</Text>
            </TouchableOpacity>
          }
          leftView={
            <Icon onPress={this._pop} name="md-arrow-dropleft-circle" size={30} color="#FF3333"/>
          }
          _style={{backgroundColor:"#fff",borderBottomWidth:1,borderColor:"#AAAAAA"}}>
        </CommonNavBar>
        <NewsInfoContent navigator = {this.props.navigator} _turnFollowVC={() => this._turnFollowVC()}></NewsInfoContent>
        <NewsInfoFootView followCount={60914} _showEdit={() => this._showEdit()} _turnFollowVC={() => this._turnFollowVC()}></NewsInfoFootView>
        <EditView ref = "editView"/>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  topTile:{
    fontSize:18,
    color:"#fff"
  },
  newInfoNavText:{
    fontSize:12,
    color:"white",
    backgroundColor:"transparent"
  },
  newsInfoNavRightView:{
    height:20,
    borderRadius:20,
    paddingLeft:5,
    paddingRight:5,
    backgroundColor:"#FF3333",
    justifyContent:"center"
  }
})
export default NewsInfoVC
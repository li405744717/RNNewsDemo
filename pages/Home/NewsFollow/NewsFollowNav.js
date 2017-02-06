/**
 * Created by dp-k on 2016/11/7.
 */
import React, { Component, } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import CommonStyles from '../../../assets/styles/CommonStyles'
import Icon from 'react-native-vector-icons/Ionicons'
class NewsFollowNav extends Component {
  static propTypes = {
    // followCount:React.PropTypes.number.isRequired
  }
  constructor(){
    super()
    this.state = {
      followCount:0
    }
  }
  componentDidMount() {
    // this.setState({
    //   followCount:this.props.followCount
    // })
  }
  render(){
    return(
      <View style = {[CommonStyles.commonNav,{backgroundColor:"#fff",borderBottomWidth:1,borderColor:"#AAAAAA"}]}>
        <View style={CommonStyles.titleContainer}>
          <Text style={[styles.topTile]}></Text>
        </View>
        <View  style={CommonStyles.leftIconContainer} >
          <Icon {...this.props} name="md-arrow-dropleft-circle" size={30} color="#FF3333"/>
        </View>
        <View style={[CommonStyles.rightIconContainer]}>
          {/*<View style={styles.newsInfoNavRightView}>*/}
            {/*<Text style={styles.newInfoNavText}>{this.state.followCount}跟帖</Text>*/}
          {/*</View>*/}
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
export default NewsFollowNav
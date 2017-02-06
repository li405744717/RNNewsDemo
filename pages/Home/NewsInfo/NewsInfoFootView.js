/**
 * Created by dp-k on 2016/10/27.
 */
import React,{Component} from "react"
import {View, Image,StyleSheet, Text, ScrollView, TouchableOpacity, TextInput,TouchableWithoutFeedback } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
class NewsInfoFootView extends Component {
  static propTypes = {
    followCount:React.PropTypes.number.isRequired
  }
  constructor(){
    super()
    this.state = {
      followCount:0
    }
  }

  componentDidMount() {
    this.setState({
      followCount:this.props.followCount
    })
  }
  _onPress = () => {
    console.log("share")
  }
  render(){
    var followView =
      <TouchableWithoutFeedback  onPress={this.props._showEdit}>
        <View style={styles.followView}>
          <Icon  name="ios-paper" size={20} color="#AAAAAA"/>
          <Text style={styles.followInput}>写跟帖</Text>
        </View>
      </TouchableWithoutFeedback>
    return(
      <View style={styles.container}>
        {followView}
        <View style={styles.btnView}>
          <TouchableWithoutFeedback onPress={this.props._turnFollowVC}>
            <View style={[{flexDirection:"row", alignItems:"center", backgroundColor:"white"}]}>
              <Icon style={[ {marginTop: 2}]} size={20} name="ios-text" color="#FF3333"/>
              <Text style={styles.followCount}>{this.state.followCount}</Text>
            </View>
          </TouchableWithoutFeedback>
          <Icon style={styles.iconStyle} size={20} name="ios-share" color="#969696" onPress={() => this._onPress()}/>
          <Icon style={styles.iconStyle} size={20} name="ios-more" color="#969696"/>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    borderTopWidth:window.pixel,
    height:44,
    position:"absolute",
    top:window.height-44,
    width:window.width,
    alignItems:"center",
    borderColor:"#AAAAAA",
    backgroundColor:"white"
  },
  followView:{
    borderWidth:window.pixel,
    borderRadius:15,
    flexDirection:"row",
    height:30,
    alignItems:"center",
    paddingLeft:10,
    paddingRight:10,
    marginRight:10,
    marginLeft:10,
    borderColor:"#AAAAAA",
  },
  followInput:{
    width:window.width - 200,
    marginRight:5,
    marginLeft:5,
    color:"#AAAAAA"
  },
  followCount:{
    color:"#FF3333",
    marginLeft:5
  },
  iconStyle:{
    marginLeft:18
  },
  btnView:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"white"
  }
})
export default NewsInfoFootView
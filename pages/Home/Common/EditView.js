/**
 * Created by dp-k on 2016/11/16.
 */
import React,{Component} from "react"
import {View, Image,StyleSheet, Text, ScrollView, TouchableOpacity,
  PanResponder, LayoutAnimation, StatusBar, Animated, Easing , TextInput} from "react-native"
import CommonStyles from '../../../assets/styles/CommonStyles'
class EditView extends Component{
  constructor(){
    super()
    this.state = {
      editVisible:false,
      editViewBottomValue:new Animated.Value(-150),
      editSendStatus:true,
      editOpacityValue:new Animated.Value(0)
    }
  }

  componentWillMount() {
    this.editPanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(e,g) => true,
      onPanResponderGrant:(e,g)=>{
        this._cancel()
      },
      onPanResponderTerminationRequest: (e, g) => true,
    })
  }
  _showEdit = () => {
    if(this.props._showEdit){
      this.props._showEdit
    }
    Animated.parallel([
      Animated.timing(
        this.state.editViewBottomValue,
        {
          toValue:-50,
          easing:Easing.linear,
          duration:200
        }
      ),
      Animated.timing(
        this.state.editOpacityValue,
        {
          toValue:0.7,
          easing:Easing.linear,
          duration:200
        }
      )
    ]).start()
    this.setState({
      editVisible:true,

    })
  }
  _hideEdit = () => {
    if(this.props._hideEdit){
      this.props._hideEdit
    }
    this.refs.editTextInput.blur()
    Animated.parallel([
      Animated.timing(
        this.state.editViewBottomValue,
        {
          toValue:-150,
          easing:Easing.linear,
          duration:200
        }
      ),
      Animated.timing(
        this.state.editOpacityValue,
        {
          toValue:0,
          easing:Easing.linear,
          duration:200
        }
      )
    ]).start()
    var timer = setTimeout(() => {
      this.setState({
        editVisible:false,
        editViewBottomValue:new Animated.Value(-150),
        editOpacityValue:new Animated.Value(0)
      })
    },200)
  }
  _send = () => {
    if(this.props._send){
      this.props._send
    }
  }
  _cancel = () => {
    this._hideEdit()
    this.setState({
      flag:true
    })
  }
  _onChangeText(content){
    this.setState({
      editSendStatus:content == "" ? true : false
    })
    var style = content == "" ? {fontSize:14,color:"#AAAAAA"} : {fontSize:14,color:"black"}

    console.log(style)
    this.refs.sendBtn.setNativeProps({style})
  }
  render(){
    return(
        this.state.editVisible ?
          <View style={[styles.editScrollView,{top:-window.navHeight,left:0}]}>
            <Animated.View style={[styles.editScrollView,{top:0,backgroundColor:"black",opacity: this.state.editOpacityValue}]}>

            </Animated.View>
            <Animated.View style={[styles.editScrollView]}>
              <ScrollView scrollEnabled={this.state.flag} style={{flex:1}} keyboardShouldPersistTaps={true}>
                <View style={{height:window.height-150,width:window.width}}{...this.editPanResponder.panHandlers}></View>
                <View style={[styles.editView]}>
                  <View style={{flexDirection:"row",alignItems:"center",height:30}}>
                    <TouchableOpacity onPress={() => this._cancel()} >
                      <Text style={{fontSize:14}}>取消</Text>
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:"center"}}>
                      <Text style={{fontSize:18}}>写跟帖</Text>
                    </View>
                    <TouchableOpacity onPress={() => this._send()} disabled = {this.state.editSendStatus} >
                      <Text ref = "sendBtn" style={{fontSize:14,color:"#AAAAAA"}}>发送</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput style={[styles.editTextInput,{fontSize:18}]} ref = "editTextInput" onFocus={()=>{this.setState({flag:true})}}
                             onBlur={()=>this._cancel()}  autoFocus={true} multiline={false} onChangeText={(content)=>this._onChangeText(content)}></TextInput>
                </View>
              </ScrollView>
            </Animated.View>
          </View>
          :
          null

    )
  }
}
const styles = StyleSheet.create({
  editScrollView:{
    height:window.height,
    width:window.width,
    position:"absolute",
    backgroundColor:"transparent"
  },
  editView:{
    height:150,
    width:window.width,
    padding:15,
    backgroundColor:"#f0f0f4",
    bottom:30
  },
  editTextInput:{
    width:window.width-40,
    height:75,
    backgroundColor:"white",
    borderWidth:window.pixel,
    borderColor:"#AAAAAA",
    marginTop:15
  }
})
export default EditView
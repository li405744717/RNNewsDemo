/**
 * Created by dp-k on 2016/11/7.
 */
import React, { Component, } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
class NewsFollowCell extends Component{
  constructor(props){
    super(props)
    this.state = {
      name:"采姑娘的胡萝卜",
      time:"19小时前",
      content:"是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！是真的不知道，还是没说实话？这本身就是谎言！",
      address:"陕西省西安市",
      image:"",
      number:23,
      cell:null,
    }
  }

  componentDidMount() {
    // console.log(this.state.content)
    // this.setState({
    //   name:this.props.name,
    //   time:this.props.time,
    //   content:this.props.content,
    //   address:this.props.address,
    //   image:this.props.image,
    //   number:this.props.number
    // })
    if(this.props.cell){
      console.log("@@@@@@@@")
      this.setState({
        cell : this.props.cell,
      })
    }
  }
  _setState(){
    this.setState({
      name:"采男孩子的胡萝卜"
    })
  }
  render(){
    return(
      <View style={styles.cellContainer} {...this.props}>
        <View style={{marginRight:5,marginTop:5}}>
          <Icon  name="logo-apple" size={25} color="#ff3300"/>
        </View>
        <View style={styles.followContent}>
          <View style={[styles.followContentTitle,{height:25}]}>
            <View style={{flex:1,flexDirection:"column"}}>
              <Text style={{fontSize:13,color:"#ffa631",marginBottom:3}}>{this.state.name}</Text>
              <Text style={{fontSize:9,color:"#AAAAAA"}}>{this.state.address+" "} {this.state.time}</Text>
            </View>
            <Text style={{fontSize:9,color:"#AAAAAA"}}>{this.state.number}</Text>
            <Icon name="ios-thumbs-up-outline" size={25} color="#AAAAAA"/>
          </View>
          <View style={styles.followsContainer}>
            {this.state.cell}
          </View>
          <View style={[styles.followContentTitle,{marginBottom:5,marginTop:10}]}>
            <Text style={{fontSize:14,color:"black",width:window.width-35,}}>{this.state.content}</Text>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  cellContainer:{
    flexDirection:"row",
    borderBottomWidth:window.pixel,
    borderColor:"#AAAAAA",
    padding:5
  },
  image:{

  },
  followContent:{
    flexDirection:"column",
    width:window.width-35
  },
  followContentTitle:{
    flexDirection:"row",
    justifyContent:"center",
    width:window.width-35,
    alignItems:"center",
    marginTop:5
  },
  followsContainer:{
    marginTop:10
  }
})
export default NewsFollowCell
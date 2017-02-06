/**
 * Created by dp-k on 2016/11/8.
 */
import React, { Component, PropTypes} from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
class NewsFollowCell2 extends Component {
  static propTypes = {
    level: React.PropTypes.number.isRequired,
    serialNum:React.PropTypes.number.isRequired,
    hidden:React.PropTypes.bool.isRequired
  }

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
      level:0,
      hidden:true
    }
  }

  componentDidMount() {
    if(this.props.cell){
      console.log("@@@@@@@@")
      this.setState({
        cell : this.props.cell,
        hidden:this.props.hidden
      })
    }
  }

  render(){
    return(
      <View style={[styles.container,{width:window.width-35-(this.props.level)*10}]}>
        {this.state.cell}
        {this.state.hidden ?
          <View  style={styles.cellContainer} >
            <View style={{left:-5,marginTop:5,width:20}}>
              <View style={{justifyContent:"center",alignItems:"center",backgroundColor:"#AAAAAA"}}><Text>{this.props.serialNum}</Text></View>
            </View>
            <View style={[styles.followContent,{width:window.width-(this.props.level)*10-70}]}>
              <View style={[styles.followContentTitle,{height:25,width:window.width-(this.props.level)*10-70,}]}>
                <View style={{flex:1,flexDirection:"column"}}>
                  <Text style={{fontSize:13,color:"#ffa631",marginBottom:3}}>{this.state.name}</Text>
                  <Text style={{fontSize:9,color:"#AAAAAA"}}>{this.state.address+" "} {this.state.time}</Text>
                </View>
                <Text style={{fontSize:9,color:"#AAAAAA"}}>{this.state.number}</Text>
                <Icon name="ios-thumbs-up-outline" size={25} color="#AAAAAA"/>
              </View>
              <TouchableOpacity onPress={this.props._answer}
                                style={[styles.followContentTitle,{marginBottom:5,marginTop:10,width:window.width-(this.props.level)*10-70,}]}>
                <Text style={{fontSize:14,color:"black",width:window.width-(this.props.level)*10-70,}}>{this.state.content}</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <TouchableOpacity style={styles.hiddenContainer} onPress={this.props._onPress}>
            <Text>显示隐藏楼层</Text>
            <Icon  name="md-arrow-dropdown" size={25}/>
          </TouchableOpacity>

        }

      </View>

    )
  }
}
const styles = StyleSheet.create({
  container:{
    borderWidth:window.pixel,
    borderColor:"#AAAAAA",
    padding:5,
    backgroundColor:"#FCFCF5"
  },
  cellContainer:{
    flexDirection:"row",

  },
  image:{

  },
  followContent:{
    flexDirection:"column",

  },
  followContentTitle:{
    flexDirection:"row",
    justifyContent:"center",

    alignItems:"center",
    marginTop:5
  },
  hiddenContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
})
export default NewsFollowCell2
import React, { Component, } from 'react'
import { View, StatusBar,StyleSheet,Text} from 'react-native'
import CacheableImage from 'react-native-cacheable-image'
import Video from 'react-native-video'
import TabBarMain  from '../pages/tab/TabBarMain'
import CommonStyles from '../assets/styles/CommonStyles'
class Start extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    StatusBar.setHidden(true)
  }
  turnTab = () => {
    this.props.navigator.resetTo({
      title:"tab",
      component:TabBarMain,
      params:{
        data:""
      }
    })
  }
  render() {
    return (
      <View style={[CommonStyles.container]}>
        <Video source={{uri:"moments"}} repeat={false} onEnd={this.turnTab} style={styles.backgroundVideo}>

        </Video>
        <View style={[CommonStyles.absolute,CommonStyles.center,styles.skipBtn]}>
          <Text style={{color:"#fff",fontSize:18}} onPress={this.turnTab}>跳过</Text>
        </View>
      </View>

    )
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  skipBtn:{
    right:20,
    top:20,
    width:80,
    height:40,
    backgroundColor:"rgba(0,0,0,0.5)",
    borderRadius:5
  }
});
export default Start

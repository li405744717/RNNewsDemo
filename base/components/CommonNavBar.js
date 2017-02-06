import React, { Component, } from 'react'
import { View, Text, Image,TouchableOpacity } from 'react-native'
import containerStyles from '../../assets/styles/containerStyles'
import iconStyles from '../../assets/styles/iconStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
class CommonNavBar extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }
  _pop = () => {
    if(this.props.navigator){
      this.props.navigator.pop()
      if(this.props.leftIconAction){
        this.props.leftIconAction()
      }
    }
  }
  render() {
    var leftReturnIcon = (
      this.props.leftReturn ?
      (<TouchableOpacity key={'leftIcon'}
                         activeOpacity={0.75}
                         style={iconStyles.navBarIconContainer}
                         onPress={() => this._pop()}>
        <Icon color="white" size={40} name="angle-left"/>
      </TouchableOpacity>)
      :
      null
    )
    var leftView = (
      <View style={[containerStyles.navLeftView]}>
       {this.props.leftView ? this.props.leftView : leftReturnIcon}
      </View>
    )
    var titleView = (<Text style={containerStyles.navText}>{this.props.title}</Text>)
    var midView = (
      <View style={[containerStyles.navMidView]}>
        {this.props.midView ? this.props.midView : titleView}
      </View>
    )
    var rightView = (
      <View style={[containerStyles.navRightView]}>
        {this.props.rightView ? this.props.rightView : null}
      </View>
    )
    return (
      <View style={[containerStyles.navBar,this.props._style]}>
        {midView}
        {leftView}
        {rightView}
      </View>
    )
  }
}

export default CommonNavBar
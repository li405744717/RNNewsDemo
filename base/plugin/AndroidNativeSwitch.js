import React, { Component, } from 'react'
import { View,requireNativeComponent } from 'react-native'
var RCTSwitchView = requireNativeComponent('RCTSwitchView',AndroidNativeSwitch)
class AndroidNativeSwitch extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <RCTSwitchView {...this.props}></RCTSwitchView>
    )
  }
}

export default AndroidNativeSwitch
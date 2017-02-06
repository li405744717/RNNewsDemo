import React, { Component, } from 'react'
import { View,requireNativeComponent,NativeModules} from 'react-native'
var RCTMyView = requireNativeComponent('RCTMyView',NativeMyView)

class NativeMyView extends Component {

  static propTypes = {
    defaultValue:React.PropTypes.string,
    onChange:React.PropTypes.func.isRequired
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}

  }
  _onChange(event) {
    console.log("aaa",event.nativeEvent.textValue)
  }
  render() {
    return (
      <RCTMyView {...this.props}></RCTMyView>
    )
  }
}

export default NativeMyView
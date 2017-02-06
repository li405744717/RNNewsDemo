import React, { Component, } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import btnStyles from '../../../assets/styles/btnStyles'
class CommomButton extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <TouchableOpacity style={[btnStyles.shortBtn,this.props._style,this.props.disabled ? btnStyles.disabledBtn : btnStyles.abledBtn]}
                        disabled={this.props.disabled} activeOpacity={0.5}
                        {...this.props}>
        <Text style={this.props.disabled ? btnStyles.disabledText : btnStyles.abledText}>
          {this.props.btnText ? this.props.btnText : "按钮"}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default CommomButton

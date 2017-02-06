/**
 * Created by dp-k on 2017/1/3.
 */
import React, { Component, } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import btnStyles from '../../../assets/styles/btnStyles'
import iconStyles from './../../../assets/styles/iconStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
class CheckButton extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      isCheck:false
    }
    this.isCheck = false
  }

  _onPress = () =>  {
    this.setState({
      isCheck:!this.state.isCheck
    })
    this.isCheck = !this.isCheck
    if(this.props.onPress) this.props.onPress(this.isCheck)
  }
  render() {
    return (
      <TouchableOpacity style={[btnStyles.checkBtn]}
                        disabled={this.props.disabled} activeOpacity={0.8}
                        onPress={() => this._onPress()}>
        {this.state.isCheck ?
          <Icon name={"check-square-o"} size={30} ></Icon>
            :
          <Icon name={"square-o"} size={30}></Icon>}
      </TouchableOpacity>
    )
  }
}
export default CheckButton

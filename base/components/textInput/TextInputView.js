'use strict';

/*
 * 左边标签,中间输入框,右边图片
 */

import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Image, TextInput,Platform,TouchableOpacity} from 'react-native'
import cellStyles from '../../../assets/styles/cellStyles'

class TextInputView extends Component {
  static propTypes = {
    leftText:React.PropTypes.string.isRequired
  }
    // 构造
  constructor(props) {
    super(props)
    // 初始状态
    this.state = {
      inputValue:'',
      isediting:false
    };

  }
  newBlur() {
    this.refs.input.blur();
  }

  _onDelTextHandle=()=>{
    this.setState({
      inputValue:''
    })
  }

  render() {
    console.log('render')
    var rightView = (
      <View style={[cellStyles.rightView]}>
        {this.props.rightView != null ? this.props.rightView : null}
      </View>
    );
    var middleView = (Platform.OS === 'ios' ?
        <View style={{flex:8}}>
            <TextInput ref="input"style={[cellStyles.midTextInput]}
                       underlineColorAndroid = "transparent"
                       onChangeText = {(inputvalue) => this.setState({inputValue:inputvalue})}
                       value = {this.state.inputValue}
                       placeholder = {this.props.placeholder}
                       placeholderTextColor = {this.props.placeholderTextColor? this.props.placeholderTextColor:'#a3a3a3'}
                       autoCapitalize = {this.props.autoCapitalize}
                       autoFocus = {this.props.autoFocus}
                       keyboardType = {this.props.keyboardType}
                       maxLength = {this.props.maxLength}
                       selectionColor = {this.props.selectionColor}
                       clearButtonMode = "while-editing"
                       onBlur = {this.props.onBlur}
                       onFocus = {this.props.onFocus}
                       secureTextEntry = {this.props.secureTextEntry == '' ? {false} : this.props.secureTextEntry}>
            </TextInput>
           </View>:
            <View style={{flex:8}}>
              <TextInput
                  ref="input"style={[cellStyles.midTextInput]}
                  underlineColorAndroid = "transparent"
                  onChangeText = {(inputvalue) => this.setState({inputValue:inputvalue})}
                  value = {this.state.inputValue}
                  placeholder = {this.props.placeholder}
                  placeholderTextColor = {this.props.placeholderTextColor? this.props.placeholderTextColor:'#a3a3a3'}
                  keyboardType = {this.props.keyboardType}
                  maxLength = {this.props.maxLength}
                  selectionColor = {this.props.selectionColor}
                  secureTextEntry = {this.props.secureTextEntry == '' ? {false} : this.props.secureTextEntry}
                  onFocus={() => {
                    this.setState({
                      isediting: true
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      isediting: false
                    });
                  }}
              />
              {this.state.isediting ?
                  <TouchableOpacity style={this.state.inputValue ? cellStyles.inputDel : ''} onPress={() => this._onDelTextHandle()}>
                    <Image style={this.state.inputValue ? cellStyles.inputDelImg : cellStyles.inputDelImgNone} resizeMode={'stretch'} source={require('./../../../assets/images/icon_delete.png')} />
                  </TouchableOpacity> :
                  <View></View>
              }
            </View>
    )
    var leftView = (
      <View style={[cellStyles.leftView]}>
        {this.props.leftView != null ? this.props.leftView :
          <Text style = {[cellStyles.leftText,{width:199*width/750}]}>{this.props.leftText}</Text>
        }
      </View>
    )
    return(
      <View style={this.props._style}>
        <View style = {cellStyles.container}>
          {leftView}
          {middleView}
          {rightView}
        </View>
        {this.props.needLine ? <View style = {cellStyles.line}/> : null}
      </View>
    );
  }
}

export default TextInputView

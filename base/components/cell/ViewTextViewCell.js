import React, { Component, } from 'react'
import { View, Text , Image} from 'react-native'
import cellStyles from './../../../assets/styles/cellStyles'
class ImageTextViewCell extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    var rightView = (
        <View style={[cellStyles.rightView]}>
          {this.props.rightView != null ? this.props.rightView : null}
        </View>
    )
    var middleView = (
      <View style={[cellStyles.middleView,this.props._middleStyle]}>
        {this.props.middleView != null ? this.props.middleView :
          <Text style = {[cellStyles.leftText,this.props.middleTextStyle]}>{this.props.cellText != null ? this.props.cellText : "middleView"}</Text>
        }
      </View>
    )
    var leftView = (
        <View style={[cellStyles.leftView]}>
          {this.props.leftView != null ? this.props.leftView : null}
        </View>
    )
    return(
      <View style={this.props._style}>
        <View style = {[cellStyles.container]}>
          {leftView}
          {middleView}
          {rightView}
        </View>
        {this.props.needLine ? <View style = {cellStyles.line}/> : null}
      </View>
    );
  }
}

export default ImageTextViewCell
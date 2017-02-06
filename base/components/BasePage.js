import React, { Component, } from 'react'
import { View, } from 'react-native'
import containerStyles from '../../assets/styles/containerStyles'
import RootSiblings from 'react-native-root-siblings'
import Spinkit from 'react-native-spinkit'
class SuperPage extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    console.log("constructor()")
    this.state = {
      asd:false
    }
    this.elements = []
  }
  showLoadingView = ()=>{
    var sibling = new RootSiblings(
        <View style={containerStyles.LoadingViewContainer}>
          <View style={containerStyles.LoadingViewModal}></View>
          <View style={containerStyles.spinkitContainer}>
            <Spinkit size = {50} type = 'FadingCircleAlt' color = '#ff2121'></Spinkit>
          </View>
        </View>
    )
    this.elements.push(sibling)
  }

  hideLoadingView = ()=>{
    while(this.elements.length > 0){
      var lastSibling = this.elements.pop();
      lastSibling && lastSibling.destroy();
    }
  }
  componentWillUnmount() {
    this.hideLoadingView()
    console.log("componentWillUnmount()")
  }
  render() {
    return (
      <View>

      </View>
    )
  }
}

export default SuperPage
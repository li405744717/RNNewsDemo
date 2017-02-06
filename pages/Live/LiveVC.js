/**
 * Created by dp-k on 2016/11/18.
 */
import React,{Component} from 'react'
import {View, StyleSheet,} from 'react-native'
import CommonStyles from '../../assets/styles/CommonStyles'
import LiveNav from './LiveNav'
import LiveScrollListView from  './LiveScrollListView'
class LiveVC extends Component{
  _onScroll = (e) => {
    var width = e.nativeEvent.contentOffset.x
    if(width<=0) width=0
    if(width>=window.width) width=window.width
    this.refs.liveNav.changeTab(width)
  }
  _onScrollTo = (width) => {
    console.log(width)
    this.refs.liveScrollListView._scrollTo(width,0,true)
  }
  render(){
    return(
      <View style={[CommonStyles.container]}>
        <LiveNav ref="liveNav" _changeTab={(width) => this._onScrollTo(width)}></LiveNav>
        <LiveScrollListView ref="liveScrollListView" listDatas={[[],[]]} _onScroll={(e) => this._onScroll(e)}></LiveScrollListView>
      </View>
    )
  }
}
export default LiveVC
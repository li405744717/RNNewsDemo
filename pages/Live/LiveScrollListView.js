/**
 * Created by dp-k on 2016/11/18.
 */
import React,{Component} from "react"
import {View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, LayoutAnimation,
  ListView} from "react-native"
import CommonStyles from '../../assets/styles/CommonStyles'
import Icon from "react-native-vector-icons/Ionicons"

class LiveScrollListView extends Component {
  static propTypes = {
    listDatas:React.PropTypes.array.isRequired
  }
  constructor(){
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.listDatas = [[],[]]
    this.state = {
      dataSource:this.ds.cloneWithRows(this.listDatas)
    }
  }
  componentDidMount() {

  }
  _scrollTo(x,y,animted){
    this.refs.listView.getNativeListView().scrollTo({x:x,y:y,animated:animted})
  }

  //
  _renderRow = (rowData,rowID) => {
    if(rowID==1){
      return <View style={{height:30,backgroundColor:"yellow",width:window.width,flex:1}}/>
    }
    return <View style={{height:30,backgroundColor:"blue",width:window.width,flex:1}}/>
  }

  render(){
    return(
      <ListView dataSource={this.ds.cloneWithRows(this.listDatas)} horizontal={true} showsHorizontalScrollIndicator={false}
                  pagingEnabled={true} enableEmptySections = {true} onScroll={this.props._onScroll}
                  scrollEventThrottle={1}
                  renderRow={(rowData,sectionID,rowID) => this._renderRow(rowData,rowID)}
                  ref = "listView" initialListSize={10}
                  stickyHeaderIndices={[]} onEndReachedThreshold={1} scrollRenderAheadDistance={1} pageSize={1}
                  {...this.props}>
      </ListView>
    )
  }
}
export default LiveScrollListView
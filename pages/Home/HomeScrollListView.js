/**
 * Created by dp-k on 2016/10/28.
 */
import React,{Component} from "react"
import {View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, LayoutAnimation,
  ListView} from "react-native"
import HomeList from './HomeList'
import containerStyles from './../../assets/styles/containerStyles'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view'
class HomeScrollListView extends Component {
  static propTypes = {
    listDatas:React.PropTypes.array.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
      listDatas:this.props.listDatas //所有新闻tips数据
    }
  }
  componentDidMount() {

  }


  render(){
    return(
    <ScrollableTabView style={[containerStyles.tabContentContainer]} renderTabBar={()=><ScrollableTabBar/>}>
      {
        this.state.listDatas.map((rowData,rowID)=>{
          return <HomeList key={rowID}
                           tabLabel={this.props.tips[rowID]}
                           ref={"homeList"+rowID}
                           navigator = {this.props.navigator}/>
        })
      }
    </ScrollableTabView>

    )
  }
}
export default HomeScrollListView
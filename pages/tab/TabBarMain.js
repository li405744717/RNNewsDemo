/**
 * Created by dp-k on 2016/10/26.
 */
import React,{Component} from "react"
import {View, StyleSheet, StatusBar } from "react-native"
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeVC from '../Home/HomeVC'
import LiveVC from '../Live/LiveVC'
class TabBarMain extends Component {
  constructor(){
    super()
    this.state = {
      selectedTab:"news"
    }
    this.tabTitleStyle = {
      color:"#000",
    }
  }

  componentWillMount() {
    StatusBar.setHidden(false)
  }
  setSelectedTab(tab){
    this.setState({
      selectedTab:tab
    })
  }
  render(){
    return(
      <TabNavigator>
        <TabNavigator.Item selected = {this.state.selectedTab == "news"}
                           title = "今日新闻" onPress={() => this.setSelectedTab("news")}
                           selectedTitleStyle = {this.tabTitleStyle}
                           renderIcon={() => <Icon name = "ios-home-outline" size = {25}/>}
                           renderSelectedIcon={() =>  <Icon name = "ios-home" size = {25}/>}>
          <HomeVC labelText = "今日新闻" navigator={this.props.navigator}/>
        </TabNavigator.Item>
        <TabNavigator.Item selected = {this.state.selectedTab == "live"}
                           title = "直播" onPress={() => this.setSelectedTab("live")}
                           selectedTitleStyle = {this.tabTitleStyle}
                           renderIcon={() => <Icon name = "ios-videocam-outline" size = {25}/>}
                           renderSelectedIcon={() =>  <Icon name = "ios-videocam" size = {25}/>}>
          <LiveVC  navigator={this.props.navigator}/>
        </TabNavigator.Item>
        <TabNavigator.Item selected = {this.state.selectedTab == "tip"}
                           title = "话题" onPress={() => this.setSelectedTab("tip")}
                           selectedTitleStyle = {this.tabTitleStyle}
                           renderIcon={() => <Icon name = "ios-menu-outline" size = {25}/>}
                           renderSelectedIcon={() =>  <Icon name = "ios-menu" size = {25}/>}>
          <HomeVC labelText = "tip" navigator={this.props.navigator}/>
        </TabNavigator.Item>
        <TabNavigator.Item selected = {this.state.selectedTab == "person"}
                           title = "我" onPress={() => this.setSelectedTab("person")}
                           selectedTitleStyle = {this.tabTitleStyle}
                           renderIcon={() => <Icon name = "ios-person-outline" size = {25}/>}
                           renderSelectedIcon={() =>  <Icon name = "ios-person" size = {25}/>}>
          <HomeVC labelText = "person" navigator={this.props.navigator}/>
        </TabNavigator.Item>
      </TabNavigator>
    )

  }
}

export default TabBarMain

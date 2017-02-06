/**
 * Created by dp-k on 2016/12/30.
 */
import React, { Component, } from 'react'
import { View,Image, StatusBar,DeviceEventEmitter, Platform } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/FontAwesome';
const render = (page) => {
  StatusBar.setHidden(false)
  if (Platform.OS != "ios") StatusBar.setTranslucent(true)
  if (Platform.OS != "ios") StatusBar.setBackgroundColor('transparent')
  return (
    <TabNavigator tabBarStyle={containerStyles.tab}>
      {
        page.state.tabBarItems.map((data,index)=>{
          var Component = data.component
          return(
            <TabNavigator.Item
              key={index}
              renderIcon={() => <Icon color='#808080' size={20} name={data.icon}/>}
              title={data.title}
              selectedTitleStyle={{color:data.selectedTitleStyle,fontSize:12}}
              renderSelectedIcon={() => <Icon color="#FF2121" size={24} name={data.icon}/>}
              onPress = {()=> page.setSeletedTab(data.title)}
              selected = { page.state.selectedTab == data.title}>
              <Component navigator={page.props.navigator}/>
            </TabNavigator.Item>
          )
        })
      }
    </TabNavigator>
  )
}
export default tabBarView = {
  'render':render
}
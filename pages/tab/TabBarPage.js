import React, { Component, } from 'react'
import { View,Image, StatusBar,DeviceEventEmitter, Platform } from 'react-native'
import HomePage from '../home/HomePage'
import LoginPage from '../account/login/LoginPage'
import TabBarView from './TabBarView'
import ContactPage from '../contact/contactList/ContactListPage'
const tabBarItems = [
  {title: 'Home',component: HomePage,selectedTitleStyle:'#FF2121',icon:"bank"},
  {title: 'Contact',component: ContactPage,selectedTitleStyle:'#FF2121',icon:"address-card-o"},
  {title: 'Account', component: LoginPage,selectedTitleStyle:'#FF2121',icon:"user-circle-o"}
];
class TabBarPage extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      selectedTab:tabBarItems[0].title,
      tabBarItems:tabBarItems
    }
  }
  setSeletedTab = (value) => {
    this.setState({
      selectedTab:value
    });
  }
  render = () =>  TabBarView.render(this)

}

export default TabBarPage
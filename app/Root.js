/**
 * Created by Lemon on 2016/12/23.
 */
import React, { Component } from 'react';
import {Navigator,BackAndroid} from 'react-native';
import StartPage from './StartPage'
import Listener from '../base/utils/Listener'
export default class Root extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: '启动页', component: StartPage}}
                configureScene={()=>{
                  var config =  Navigator.SceneConfigs.PushFromRight
                  config.gestures = null
                  return config
                }}
                renderScene={(route, navigator) => {
                    BackAndroid.addEventListener('hardwareBackPress',()=>{
                        return Listener.BackAndroidListener(navigator)
                    })
                    var Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }}
            />
        );
    }
}
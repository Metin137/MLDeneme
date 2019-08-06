import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, DrawerItems, SafeAreaView,
  createMaterialTopTabNavigator
} from 'react-navigation'

import MainPage from '../pages/mainPage';
import Appa from '../../App';
import HtmlCrawling from '../pages/htmlCrawling';
import Socketio from '../pages/socketio';
const App = createStackNavigator({
  Socketio: {
    screen: Socketio,
    navigationOptions: {
      header: null
    }
  },
  HtmlCrawling: {
    screen: HtmlCrawling,
    navigationOptions: {
      header: null
    }
  },
  MainPage: {
    screen: MainPage,
    navigationOptions: {
      header: null
    }
  },
  Appa: {
    screen: Appa,
    navigationOptions: {
      header: null
    }
  },
  
},{
  initialRouteName:'Appa'
});
export default createAppContainer(
  createSwitchNavigator({
    App: App,
  }));

import React from 'react';
import { StyleSheet, Text, View, SwipeableListView } from 'react-native';
import LoginScreen from './screens/loginscreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}
const switchnavigator=createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
 Drawer:{screen:AppDrawerNavigator}
  })
  const AppContainer=createAppContainer(switchnavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

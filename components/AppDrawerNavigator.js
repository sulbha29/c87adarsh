import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../screens/settingscreen';
import MYDonation from '../screens/mydonation';
import NotificationScreen from '../screens/notificationscreen';
import MyReceivedBooksScreen from '../screens/recievedbookscreen';
export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    mydonations:{screen:MYDonation},
    
notifications:{screen:NotificationScreen},
MyReceivedBooks :{
  screen: MyReceivedBooksScreen
},
    setting:{screen:SettingScreen}
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
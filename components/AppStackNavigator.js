import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import BookDonation from '../screens/bookdonation';
import RecieverDetails from '../screens/recieverdetailscreen';

export const AppStackNavigator=createStackNavigator({
    bookdonatelist:{screen:BookDonation,navigationOptions:{headerShown:false}},
recieverdetails:{screen:RecieverDetails,navigationOptions:{headerShown:false}},
},
{initialRouteName:'bookdonatelist'}
)
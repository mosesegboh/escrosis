import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SignUp from './SignUp';
import Profile from './Profile';
import Home from './Home';
// import Details from './Details';
import Login from './Login';
//drawer navigator
// import DrawerNavigator from '../navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

import {useTheme, Avatar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';


const Tab = createBottomTabNavigator();


const TabScreen = () => (
        <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Profile}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={SignUp}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
        <Tab.Screen
        name="Details"
        component={Home}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>  
);

export default TabScreen;
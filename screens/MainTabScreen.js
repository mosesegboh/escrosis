import React, {useContext} from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//async storage
import  AsyncStorage  from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

import SignUp from './SignUp';
import Profile from './Profile';
import Home from './HomeTwo';
import Dashboard from './Dashboard';
// import Details from './Details';
import Login from './Login';
import { DrawerContent } from './DrawerContent';

//drawer navigator
// import DrawerNavigator from '../navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

import {useTheme, Avatar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TabScreen from './TabScreen';
// import Profile from './Profile';
import Transactions from './Transactions';
import AddTransaction from './AddTransaction';



const ProfileStack = createStackNavigator();
const TabStack = createStackNavigator();

const Tab = createBottomTabNavigator();
//drawer navigator
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const DashboardStack = createStackNavigator();
// const ProfileStack = createStackNavigator();
const TransactionsStack = createStackNavigator();
const AddTransactionStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator 
  screenOptions = {{
    headerStyle: {
      backgroundColor:"#1b181f"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}
  >
    <HomeStack.Screen name="Home" component={Dashboard} options={{
      title: 'Overview',
      headerLeft: () => (
        <Icon.Button name="menu" size={25} backgroundColor="#1b181f" 
        onPress={()=>{navigation.openDrawer()}}
        ></Icon.Button>
      )
    }}
    />
  </HomeStack.Navigator>
);


const DashboardStackScreen = ({navigation}) => (
  <DashboardStack.Navigator 
  screenOptions = {{
    headerStyle: {
      backgroundColor:"#1b181f"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}
  >
    <DashboardStack.Screen name="Dashboard" component={Dashboard} options={{
      title: 'Overview',
      headerLeft: () => (
        <Icon.Button name="menu" size={25} backgroundColor="#1b181f" 
        onPress={()=>{navigation.openDrawer()}}
        ></Icon.Button>
      )
    }}
    />
  </DashboardStack.Navigator>
);


const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator screenOptions = {{
    headerStyle: {
      backgroundColor:"#009387"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <ProfileStack.Screen name="Profile" component={Profile} options={{
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#009387" 
          onPress={()=>{navigation.openDrawer()}}
          ></Icon.Button>
        )
    }}
    />
  </ProfileStack.Navigator>
);


const TabStackScreen = ({navigation}) => (
  <TabStack.Navigator screenOptions = {{
    headerStyle: {
      backgroundColor:"#1b181f"
    },
    headerTintColor: '#1b181f',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <ProfileStack.Screen name="Profile" component={TabScreen} options={{
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#009387" 
          onPress={()=>{navigation.openDrawer()}}
          ></Icon.Button>
        )
    }}
    />
  </TabStack.Navigator>
);


const TransactionsStackScreen = ({navigation}) => (
  <TransactionsStack.Navigator screenOptions = {{
    headerStyle: {
      backgroundColor:"#1b181f"
    },
    headerTintColor: '#1b181f',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <TransactionsStack.Screen name="Transactions" component={Transactions} options={{
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#1b181f" 
          onPress={()=>{navigation.openDrawer()}}
          ></Icon.Button>
        )
    }}
    />
  </TransactionsStack.Navigator>
);

const AddTransactionStackScreen = ({navigation}) => (
  <AddTransactionStack.Navigator screenOptions = {{
    headerStyle: {
      backgroundColor:"#1b181f"
    },
    headerTintColor: '#1b181f',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <AddTransactionStack.Screen name="AddTransaction" component={AddTransaction} options={{
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#1b181f" 
          onPress={()=>{navigation.openDrawer()}}
          ></Icon.Button>
        )
    }}
    />
  </AddTransactionStack.Navigator>
);




const MainTabScreen = () => {
      //destructure our stored credentials from the context
      const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
      const {username, email, photoUrl} = storedCredentials;
      const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/logo.png');

      const clearLogin = () => {
              AsyncStorage.removeItem('myAppCredentials')
              .then(() => {
                  setStoredCredentials("")
              })
              .catch(error => console.log(error))
      }

    return (
        <Drawer.Navigator drawerContent={props => < DrawerContent { ...props} /> }>
          <Drawer.Screen name="Dashboard" component={DashboardStackScreen} />
          <Drawer.Screen name="Home" component={HomeStackScreen} 
            // options={{
            //   title: 'Overview',
            //   headerLeft: () => (
            //       <Icon.Button name="" size={25} backgroundColor="#009387" 
            //       options={()=>{navigation.openDrawer()}} 
            //       ></Icon.Button>
            //   )
            // }}
           
          />
          <Drawer.Screen name="Tab" component={TabStackScreen} />
          <Drawer.Screen name="Profile" component={ProfileStackScreen} />
          <Drawer.Screen name="Transactions" component={TransactionsStackScreen} />
          <Drawer.Screen name="AddTransactions" component={AddTransactionStackScreen} />
        </Drawer.Navigator>
      



        
    //     <Tab.Navigator
    //   initialRouteName="Feed"
    //   tabBarOptions={{
    //     activeTintColor: '#e91e63',
    //   }}
    // >
    //   <Tab.Screen
    //     name="Feed"
    //     component={Home}
    //     options={{
    //       tabBarLabel: 'Home',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="home" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Notifications"
    //     component={SignUp}
    //     options={{
    //       tabBarLabel: 'Updates',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="bell" color={color} size={size} />
    //       ),
    //       tabBarBadge: 3,
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={Profile}
    //     options={{
    //       tabBarLabel: 'Profile',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="account" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //     <Tab.Screen
    //     name="Details"
    //     component={Home}
    //     options={{
    //       tabBarLabel: 'Details',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="account" color={color} size={size} />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
    

    );
};

export default MainTabScreen;

// const ProfileStackScreen = ({navigation}) => {
//   const {colors} = useTheme();

//   return (
//     <ProfileStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: colors.background,
//           shadowColor: colors.background, // iOS
//           elevation: 0, // Android
//         },
//         headerTintColor: colors.text,
//       }}>
//       <ProfileStack.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           title: '',
//           headerLeft: () => (
//             <View style={{marginLeft: 10}}>
//               <Icon.Button
//                 name="android-menu"
//                 size={25}
//                 backgroundColor={colors.background}
//                 color={colors.text}
//                 onPress={() => navigation.openDrawer()}
//               />
//             </View>
//           ),
//           headerRight: () => (
//             <View style={{marginRight: 10}}>
//               <MaterialCommunityIcons.Button
//                 name="account-edit"
//                 size={25}
//                 backgroundColor={colors.background}
//                 color={colors.text}
//                 onPress={() => navigation.navigate('EditProfile')}
//               />
//             </View>
//           ),
//         }}
//       />
//       <ProfileStack.Screen
//         name="EditProfile"
//         options={{
//           title: 'Edit Profile',
//         }}
//         component={EditProfileScreen}
//       />
//     </ProfileStack.Navigator>
//   );
// };
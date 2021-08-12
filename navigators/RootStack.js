import React from 'react';

//colors
import {Colors} from './../components/styles';
const {primary, tertiary} = Colors;

//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from './../screens/Login';
import SignUp from './../screens/SignUp';
import Welcome from '../screens/Welcome';
import Home from '../screens/HomeO';
import MainTabScreen from '../screens/MainTabScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import DetailsScreen from '../screens/DetailsScreen';
// import { LoginManager } from 'react-native-fbsdk';
import Profile from '../screens/Profile.js';
import AddItems from '../screens/AddItems.js';
import SettingsScreen from '../screens/SettingsScreen';
import SupportScreen from '../screens/SupportScreen';
import Dashboard from '../screens/Dashboard';
import Transactions from '../screens/Transactions';

const Stack = createStackNavigator();

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
    return(
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions = {{
                            // headerStyle: {
                            //     backgroundColor: 'transparent'
                            // },
                            headerTintColor: tertiary,
                            headerShown: false,
                            headerTransparent: true,
                            headerTitle: '',
                            // headerLeftContainerStyle: {
                            //     paddingLeft: 20,
                            //     paddingTop: 50
                            // }
                        }}
                        initialRouteName="Login"
                    >
                        { storedCredentials ? (
                            // <Stack.Screen options={{ headerTintColor: primary }} name="Home" component={Home} />
                            <Stack.Screen name="MainTabScreen" component={MainTabScreen} /> 
                        ) : (
                             <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="SignUp" component={SignUp} />
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
                            <Stack.Screen name="DetailsScreen" component={DetailsScreen}
                                options={{
                                     headerStyle: {
                                        backgroundColor: 'green'
                                    },
                                    headerTintColor: '#fff',
                                    headerTitleStyle: {
                                        fontWeight: 'bold'
                                    }
                                }} 
                            
                            />
                            <Stack.Screen name="Profile" component={Profile} />
                            
                            <Stack.Screen name='AddItems' component={AddItems} />
                            <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
                            <Stack.Screen name='SupportScreen' component={SupportScreen} />
                            <Stack.Screen name='Dashboard' component={Dashboard} />
                            <Stack.Screen name='Transactions' component={Transactions} />
                            </>
                         )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>       
    )
}

export default RootStack;
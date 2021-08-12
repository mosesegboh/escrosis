import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//async storage
import  AsyncStorage  from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const HomeStack = createStackNavigator();


const Home = ({navigation}) => {
  // <HomeStack.Navigator screenOptions = {{
  //   // headerStyle: {
  //   //   backgroundColor:"#009387"
  //   // },
  //   // headerTintColor: '#fff',
  //   // headerTitleStyle: {
  //   //   fontWeight: 'bold'
  //   // }
  // }}>
  //   <HomeStack.Screen name="Home" component={Home} options={{
  //     // title: 'Overview',
  //     headerLeft: () => (
  //       <Icon.Button name="menu" size={25} backgroundColor="#009387" 
  //       onPress={()=>{navigation.openDrawer()}}
  //       ></Icon.Button>
  //     )
  //   }}
  //   />
  // </HomeStack.Navigator>
  const [todaySelected, settodaySelected] = useState(true)

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
  

  return(
    <ScrollView style={styles.container}>
    <View style={{paddingTop:50}}>
      <View style={{flexDirection:'row', marginHorizontal:30, justifyContent:'space-between'}}>
        <Image 
        resizeMode='contain'
        style={{height:50, width:50}}
        source={require('../images/menu.png')}
        />
      <Image 
        style={{
          height:60, 
          width:60, 
          borderRadius:100,
          borderWidth:5,
          borderColor:'#00192D'
        }}
        source={require('../images/profile.jpg')}
        />
      </View>
    </View>

    <View style={{padding:30}}>
      <Text style={{
        color:'#fff',
        fontSize:30,
        fontWeight:'700',
      }}>My Budget</Text>
      <Text welcome={true}>{username || 'Egboh Moses'}</Text>
      <Text style={{
        color:'#fff',
        fontWeight:'700',
        fontSize:50
      }}>$ 581,436</Text>
    </View>

    <View style={{
      height:1000,
      width:'100%',
      backgroundColor:'#fff',
      marginTop:50,
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
    }}>
      <View style={{flexDirection:'row', paddingTop:20, padding:50}}>
        <TouchableOpacity
        onPress={() => settodaySelected(!todaySelected)}
        style={{
          paddingVertical:6,
          borderBottomWidth:4,
          borderBottomColor: todaySelected ? '#00192d':'#fff',
        }}
        >
          <Text style={{
            fontWeight:'bold',
            fontSize:25,
            color: todaySelected ? '#00192D' : '#8e9aaf',

          }}>TODAY</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => settodaySelected(!todaySelected)}
        style={{
          marginLeft:30,
          borderBottomWidth:4,
          paddingVertical:6,
          borderBottomColor:todaySelected ? '#fff':'#00192d',
          color:todaySelected ? '#8e9aaf':'#00192d',
        }}
        >
          <Text style={{
            fontWeight:'bold',
            fontSize:25,
            opacity:0.5
          }}>MONTH</Text>
        </TouchableOpacity>

      </View>

      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:30}}>
        <Text style={{fontSize:30, fontWeight:'bold'}}>16th Nov 2020</Text>
        <Text style={{fontSize:30, fontWeight:'bold', color:'#e76f51'}}>270</Text>
      </View>
      <View style={{borderBottomWidth:2, width:'85%', marginLeft:30, marginTop:20, opacity:0.3}}></View>

      <View style={{width:'100%', height:'30%'}}>
        <ScrollView>
{/* first Item */}
          <View style={{flexDirection:'row', 
          justifyContent:'space-between',
          alignItems:'center',
          marginHorizontal:30,
          paddingTop:30,
          }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{
              height:70,
              width:70,
              borderRadius:100,
              backgroundColor:'#00192d',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              resizeMode='contain'
              style={{height:50, width:50}}
              source={require('../images/electricity.png')} />
            </View>
            <Text style={{
              fontSize:25,
              fontWeight:'bold',
              marginLeft:10,
            }}>Electricity</Text>
            </View>
            <Text style={{
              fontSize:20,
              fontWeight:'bold',
              color:'#e76f51',
            }}>40,00</Text>
          </View>

{/* second Item */}
          <View style={{flexDirection:'row', 
          justifyContent:'space-between',
          alignItems:'center',
          marginHorizontal:30,
          paddingTop:30,
          }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{
              height:70,
              width:70,
              borderRadius:100,
              backgroundColor:'#00192d',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              resizeMode='contain'
              style={{height:50, width:50}}
              source={require('../images/taxi.png')} />
            </View>
            <Text style={{
              fontSize:25,
              fontWeight:'bold',
              marginLeft:10,
            }}>Taxi</Text>
            </View>
            <Text style={{
              fontSize:20,
              fontWeight:'bold',
              color:'#e76f51',
            }}>23,50</Text>
          </View>

{/* third Item */}
          <View style={{flexDirection:'row', 
          justifyContent:'space-between',
          alignItems:'center',
          marginHorizontal:30,
          paddingTop:30,
          }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{
              height:70,
              width:70,
              borderRadius:100,
              backgroundColor:'#00192d',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              resizeMode='contain'
              style={{height:50, width:50}}
              source={require('../images/food.png')} />
            </View>
            <Text style={{
              fontSize:25,
              fontWeight:'bold',
              marginLeft:10,
            }}>Food & Drinks</Text>
            </View>
            <Text style={{
              fontSize:20,
              fontWeight:'bold',
              color:'#e76f51',
            }}>36,50</Text>
          </View>

{/* Fourth Item */}
          <View style={{flexDirection:'row', 
          justifyContent:'space-between',
          alignItems:'center',
          marginHorizontal:30,
          paddingTop:30,
          }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{
              height:70,
              width:70,
              borderRadius:100,
              backgroundColor:'#00192d',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image 
              resizeMode='contain'
              style={{height:50, width:50}}
              source={require('../images/train.png')} />
            </View>
            <Text style={{
              fontSize:25,
              fontWeight:'bold',
              marginLeft:10,
            }}>Train</Text>
            </View>
            <Text style={{
              fontSize:20,
              fontWeight:'bold',
              color:'#e76f51',
            }}>40,00</Text>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
      onPress={() => navigation.navigate("AddItems")}
      style={{
        height:80,
        width:80,
        backgroundColor:'#00192d',
        borderRadius:100,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
      }}
      >
        <Image 
        style={{height:50, width:50, borderRadius:100}}
        source={require('../images/add.png')} />

      </TouchableOpacity>

    </View>
  </ScrollView>
  ); 
}


export default Home;

const styles = StyleSheet.create({
 container:{
   flex: 1,
   backgroundColor:'#22ce99'
 }
})
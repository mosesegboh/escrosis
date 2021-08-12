import React, {useContext, useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { CancelToken, isCancel } from 'axios';

import { createStackNavigator } from '@react-navigation/stack';

// import Transactions from './Transactions';

//import axios
import axios from 'axios';

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//async storage
import  AsyncStorage  from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';




const Dashboard = ({navigation}) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [balance, setBalance] = useState(0.00);
    //const {username, email, photoUrl} = storedCredentials;
    const email="mosesegboh@gmail.com"

    useEffect(()=>{
      // const source = axios.CancelToken.source(); 
      const credentials = {email: email};
      // const config = {
      //            'Content-Type': 'application/x-www-form-urlencoded',
      //            'Accept': 'application/json',
      //  };
      const url = 'http://10.91.20.119:5000/credit'
      console.log(credentials)
      axios.get(url, {params: credentials}, 
        // {cancelToken: source.token}
        )
      .then((response)=>{
        const result = response.data;
        const {message, status, data} = result;
  
        //check the status of the message, ref styled component
        if( status !== 'SUCCESS' ) {
            // handleMessage(message, status);
            console.log(message)
        }else{
            //  navigation.navigate('Welcome', {...data});
            // persistLogin({...data}, message,status);
              const balance = data[0].balance.toFixed(2)
              // const balance = toFixed(balance)
              console.log(balance)
              setBalance(balance);
        }
        // setSubmitting(false);
  
      }).catch((error) => {
        console.log(error);
        // if (axios.isCancel(error)) return;
        // setSubmitting(false);
        // handleMessage("An error occured. Check your network and try again!")
      });

      //clean up code
      // return () => source.cancel();

    },[]);


    return (
      <View style={styles.container}>
          <View style={styles.firstBox}>
            <Text style={{
              color:'#fff',
              fontSize:10,
              fontWeight:'400',
              
            }}>TOTAL BALANCE</Text>
             <Text style={{
              color:'#fff',
              fontSize:25,
              fontWeight:'400',
              paddingTop: 20,
            }}>{balance}</Text>
            
          </View>

          <View style={styles.secondBox}>
            <View style={styles.secondBoxOne}>
              <View style={styles.circleLeft}>
                <Icon name="arrow-up" size={30} color="green" />
              </View>
              

              <Text style={{
                color:'#fff',
                fontSize:10,
                fontWeight:'400',
                
              }}>INCOME</Text>
              <Text style={{
                color:'#fff',
                fontSize:20,
                fontWeight:'400',
                paddingTop: 20,
              }}>+$5,000.00</Text>
            </View>

            <View style={styles.secondBoxTwo}>
            <View style={styles.circleRight}>
                <Icon name="arrow-down" size={30} color="red" />
              </View>
                <Text style={{
                  color:'#fff',
                  fontSize:10,
                  fontWeight:'400',
                  
                }}>EXPENSES</Text>
                <Text style={{
                  color:'#fff',
                  fontSize:20,
                  fontWeight:'400',
                  paddingTop: 20,
                }}> - $581,436</Text>
            </View>
            
          </View>
          <View style={styles.firstText}>
                <Text style={{
                  color:'#fff',
                  fontSize:15,
                  fontWeight:'400',
                  textAlign: 'right',
                  // alignSelf: 'right',
                }}
                >Recent Transactions</Text>
                 <TouchableOpacity
              // onPress={() => navigate('Transactions', {name: 'Transactions'})}
              onPress={() => navigation.navigate("Transactions")}
            >
                <Text style={{
                  color:'#6f82a2',
                  fontSize:13,
                  fontWeight:'400',
                  textAlign: 'left',
                  // alignSelf: 'right',
                }}
                >View All</Text>
                </TouchableOpacity>
          </View>


          <View style={styles.ThirdBox}>
            <View style={styles.ThirdBoxLeft}>
              <View style={styles.OutfirstBoxInBox}>
                <View style={styles.firstBoxInBox}>
                  <Icon name="lightning-bolt-outline" size={30} color="white" />
                </View>
              </View>
              <View style={styles.ThirdBoxTextSecondLeft}>
                <Text style={{
                    color:'#fff',
                    fontSize:15,
                    fontWeight:'400',
                    textAlign: 'right',
                    // alignSelf: 'right',
                  }}
                  >Land Purchase</Text>
                  <Text style={{
                    color:'#6f82a2',
                    fontSize:13,
                    fontWeight:'400',
                    textAlign: 'left',
                    // alignSelf: 'right',
                  }}
                  >General</Text>
              </View>
            </View>

              <View style={styles.ThirdBoxTextLeft}>
                <Text style={{
                      color:'green',
                      fontSize:15,
                      fontWeight:'400',
                      // textAlign: 'right',
                      // alignSelf: 'right',
                    }}
                    >₦5,000.00</Text>
              </View>
          </View>


          <View style={styles.ThirdBox}>
            <View style={styles.ThirdBoxLeft}>
              <View style={styles.OutfirstBoxInBox}>
                <View style={styles.firstBoxInBox}>
                  <Icon name="lightning-bolt-outline" size={30} color="white" />
                </View>
              </View>
              <View style={styles.ThirdBoxTextSecondLeft}>
                <Text style={{
                    color:'#fff',
                    fontSize:15,
                    fontWeight:'400',
                    textAlign: 'right',
                    // alignSelf: 'right',
                  }}
                  >Car Purchase</Text>
                  <Text style={{
                    color:'#6f82a2',
                    fontSize:13,
                    fontWeight:'400',
                    textAlign: 'left',
                    // alignSelf: 'right',
                  }}
                  >General</Text>
              </View>
            </View>

              <View style={styles.ThirdBoxTextLeft}>
                <Text style={{
                      color:'red',
                      fontSize:15,
                      fontWeight:'400',
                      // marginRight: 30
                      // textAlign: 'right',
                      // alignSelf: 'right',
                    }}
                    >- ₦3,000.00</Text>
              </View>
          </View>

          <View style={styles.AddIcon}>
            <TouchableOpacity
              // onPress={() => navigate('Transactions', {name: 'Transactions'})}
              onPress={() => navigation.navigate("AddTransactions")}
            >
                  <Icon 
                  name="plus-circle" 
                  size={70} 
                  color="#3570b6" 
                  />
            </TouchableOpacity>
          </View>


      </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#121214',
    color: '#fff'  
  },
  firstBox: {
    backgroundColor: '#1b181f',
    justifyContent: 'center',
    height: 100,
    marginTop: 20,
    width: 400,
    alignItems: 'center',
    elevation: 10,
    paddingLeft: 20,
  },
  secondBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  secondBoxOne: {
    backgroundColor: '#1b181f',
    justifyContent: 'center',
    height: 125,
    width: 185,
    margin: 10,
    alignItems: 'center',
    marginLeft: 30,
    elevation: 10,
  },
  secondBoxTwo: {
    backgroundColor: '#1b181f',
    justifyContent: 'center',
    height: 125,
    width: 185,
    margin: 10,
    alignItems: 'center', 
    marginRight: 30,
    elevation: 10,
  },
  circleLeft:{
    backgroundColor: '#232d2c',
    width: 44,
    height: 44,
    borderRadius: 44/2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 5,
  },
  circleRight:{
    backgroundColor: '#352323',
    width: 44,
    height: 44,
    borderRadius: 44/2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 5,
  },
  firstText: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: 10
  },
  ThirdBox:{
    flexDirection: 'row',
    backgroundColor: '#1b181f',
    height: 100,
    // width: 398,
    justifyContent: 'space-between',
    margin: 5,
  },
  firstBoxInBox: {
    backgroundColor: '#2e2d33',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ThirdBoxLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ThirdBoxTextLeft:{
    textAlign: 'left',
    alignItems: 'center',
    height: 100,
    width: 100,
    justifyContent: 'center'
  },
  OutfirstBoxInBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  ThirdBoxTextSecondLeft : {
    alignItems: 'flex-start',
    height: 100,
    justifyContent: 'center'
  },
  AddIcon: {
    alignItems: 'flex-end',
  }   
});
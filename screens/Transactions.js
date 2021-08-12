import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Transactions = () => {
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
            }}>$ 581,436</Text>
            
          </View>

          <View style={styles.firstText}>
                <Text style={{
                  color:'#fff',
                  fontSize:15,
                  fontWeight:'400',
                  textAlign: 'right',
                  // alignSelf: 'right',
                }}
                >All Income</Text>
                {/* <Text style={{
                  color:'#6f82a2',
                  fontSize:13,
                  fontWeight:'400',
                  textAlign: 'left',
                  // alignSelf: 'right',
                }}
                >View All</Text> */}
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
                  <Icon name="plus-circle" size={70} color="#3570b6" />
          </View>


      </View>
    );
};

export default Transactions;

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
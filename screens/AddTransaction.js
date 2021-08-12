import React, {useState, useEffect, useContext, useRef} from 'react';
// import type { Node } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  TouchableOpacity, 
  Alert } from 'react-native';

  // import { Paystack, paystackProps } from 'react-native-paystack-webview'
  

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import FBSearchBar from '../components/FBSearchBar';
import SearchBar from '../components/SearchBar';
import Searcher from '../components/Searcher';
import SearchDropDown from '../components/SearchDropDown';
import uuid from 'react-native-uuid';

//formik for our forms
import {Form, Formik} from 'formik';

import {Picker} from '@react-native-picker/picker';

// import  { Paystack }  from 'react-native-paystack-webview';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

//keyboard avaoiding view
import KeyboardAvoidingWrapperDashboard from '../components/KeyboardAvoidingWrapperDashboard';

//colors
const {brand, darkLight, primary} = Colors;

//styled components
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  MyStyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../components/styles';

//import axios
import axios from 'axios';

//async storage
import  AsyncStorage  from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';

//paystack webview package

//import date time picker
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';


const AddTransaction = () => {
  // const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  // console.log(paystackWebViewRef) 

  //destructure our stored credentials from the context
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {username, email, photoUrl} = storedCredentials;

  //form input fields
  const [textInputValue, setTextInputValue]= useState();
  const [textInputValueNotes, setTextInputValueNotes]= useState();
  const [textInputValueAmount, setTextInputValueAmount]= useState();
  const [selectedLanguage, setSelectedLanguage] = useState('First Leg');

  //the state of the drop down
  const [dataSource, setDataSource] = useState()
  const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', "#E8DEF3",])
  const [filtered, setFiltered] = useState(dataSource)
  const [searching, setSearching] = useState(false)
  const [optionValue, setOptionValue] = useState()

   //state varible to handle message and message type.
   const [message, setMessage] = useState();
   const [messageType, setMessageType] = useState();


  //state to handle transaction id
  const [transactionID, setTrasactionId] = useState();

   //state for search and shoe search bar
   const [shouldShow, setshouldShow] = useState(false);
  
  //handling of date issues
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  //Actual date of birth the user picked
  const [dob, setDob] = useState();
  

  
  useEffect(()=>{
    //generate transaction id
    const tempid = uuid.v4();
    //set the transaction id using usestate
    setTrasactionId(tempid)

    // const source = axios.CancelToken.source(); 
    // const credentials = {email: email};
    const config = {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json',
     };
    const url = 'http://10.91.20.124:5000/transaction'
    //console.log(credentials)
    axios.get(url, config)
    .then((response)=>{
      const result = response.data;
      // console.log(result)
      const {message, status, data} = result;

      //check the status of the message, ref styled component
      if( status !== 'SUCCESS' ) {
          // handleMessage(message, status);
          console.log(message)
      }else{
          //  navigation.navigate('Welcome', {...data});
          // persistLogin({...data}, message,status);
            // console.log(data)
            // const balance = data[0].balance.toFixed(2)
            // const balance = toFixed(balance)
            // console.log(balance)
            // setBalance(balance);
            const username = data
            // console.log(username)
            const newarray = Object.assign([], username);
            //console.log(newarray);

            const newnewarray = [];
            for (var key in newarray) {
                newnewarray.push(username[key].transactionid);
            }
            console.log(newnewarray)
            // setFiltered(newnewarray)
            setDataSource(newnewarray);
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


    //function to handle the message
    const handleMessage = (message, type = 'FAILED') => {
      setMessage(message);
      setMessageType(type);
    }


  //on searching function for on search
  const onSearch = (text) => {
    setOptionValue(text)
    if (text) {
      setSearching(true)
      const temp = text.toLowerCase()
      const tempList = dataSource.filter(item => {
        if (item.match(temp))
          return item
      })
      setFiltered(tempList)
    }
    else {
      setSearching(false)
      setFiltered(dataSource)
    }
  }

  //for the search 
  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onSubmit = () => {
    // Alert.alert('Credentials', `Amount: ${textInputValue} + Note: ${textInputValueNotes} + Third: ${textInputValueAmount} + Fourth: ${selectedLanguage} + fifth: ${dob} + sixth: ${optionValue}`);
    // const source = axios.CancelToken.source(); 
    
    const transactionid = uuid.v4();
    const credentials = {
            email: email,
            username: username,
            transactionid: transactionID,
            amount: textInputValueAmount,
            narration: textInputValueNotes,
            transactionleg: selectedLanguage,
            transactionsecondlegid: optionValue,
            date: dob    
          };
    const config = {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json',
     };
    const url = 'http://10.91.20.124:5000/transaction'
    console.log(credentials)
    axios.post(url, credentials, config
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
            //const balance = data[0].balance.toFixed(2)
            // const balance = toFixed(balance)
            //console.log(balance)
            ///setBalance(balance);
            handleMessage(message, status);

            //reset the input fields
            setTextInputValue('')
            setTextInputValueAmount('')
            setTextInputValueNotes('')
            setSelectedLanguage('First Leg')
            setDate(new Date(2000, 0, 1))

            //then generate another ID incase the customer wants it again and set to the form
             //generate transaction id
            const tempidnew = uuid.v4();
            //set the transaction id using usestate
            setTrasactionId(tempidnew)

      }
      // setSubmitting(false);

    }).catch((error) => {
      console.log(error);
      // if (axios.isCancel(error)) return;
      // setSubmitting(false);
      // handleMessage("An error occured. Check your network and try again!")
    });
  }


    return (
      <KeyboardAvoidingWrapperDashboard>
        <ScrollView style={styles.container}>
                <View style={styles.headerWrapper}>
                  <TextInput
                    style={{ height: 40, paddingLeft: 10, height: 60, borderWidth: 1, color:'#78757c', backgroundColor: '#1b181f' }}
                    onChangeText={text => setTextInputValue(text)}
                    value={transactionID}
                    // placeholder="Insert your text!"
                    placeholderTextColor='#78757c'
                    editable={false}
                  />
                </View>

                <View style={styles.headerWrapper}>
                  <TextInput
                    keyboardType = 'numeric'
                    style={{ height: 40, paddingLeft: 10, height: 60, borderWidth: 1, color:'#78757c', backgroundColor: '#1b181f' }}
                    onChangeText={text => setTextInputValueAmount(text)}
                    value={textInputValueAmount}
                    placeholder="Amount"
                    placeholderTextColor='#78757c'
                  />
                </View>

                <View style={styles.headerWrapper}>
                  <Picker
                      selectedValue={selectedLanguage}
                      style={{height: 50,paddingLeft: 10, height: 60, borderWidth: 1, color:'#78757c', backgroundColor: '#1b181f'}}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedLanguage(itemValue)
                        if (itemValue === "Java") {
                          setshouldShow(true)
                        }else{
                          setshouldShow(!shouldShow)
                        }
                      }
                      }>
                      <Picker.Item label="First Leg" value="First Leg" />
                      <Picker.Item label="Second Leg" value="Second Leg" />
                    </Picker>
                </View>

                <View style={styles.headerWrapper}>
                  <TouchableOpacity onPress={showDatepicker}>
                    <TextInput 
                      label = "Date Of Transaction"
                      icon = "calendar"
                      placeholder="YYYY - MM - DD"
                      placeholderTextColor = "#78757c"
                      value={dob ? dob.toDateString() : ''}
                      onFocus={showDatepicker}
                      editable = {false}
                      style={{ height: 40, paddingLeft: 10, height: 60, borderWidth: 1, color:'#78757c', backgroundColor: '#1b181f' }}
                  />
                   {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.headerWrapper}>
                  <TextInput
                    style={{ height: 40, paddingLeft: 10, height: 60, borderWidth: 1, color:'#78757c', backgroundColor: '#1b181f' }}
                    onChangeText={text => setTextInputValueNotes(text)}
                    value={textInputValueNotes}
                    placeholder="Notes"
                    placeholderTextColor='#78757c'
                  />
                </View>

                {
                  shouldShow && (
                    <View style={styles.containerb}>
                   
                    <TextInput
                      style={styles.textInput}
                        placeholder="Search"
                        placeholderTextColor='white'
                        onChangeText={onSearch}
                        value={optionValue}
                      />
                   

                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, }}> </Text>
                      <View style={{
                        flexWrap: 'wrap', flexDirection: 'row',
                        justifyContent: 'center'

                      }}>
                        {/* {
                          dataSource.map((item, index) => {
                            return (
                              <View style={{
                                margin: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 80, width: 80, backgroundColor: randomColor()
                              }}>
                                <Text style={{ fontSize: 15, }}>
                                  {item}
                                </Text>
                              </View>
                            )
                          })
                        } */}
                      </View>

                    </View>

                    {/* your components can stay here like anything */}
                    {/* and at the end of view */}
                    {
                      searching &&
                      <SearchDropDown
                          onPress={() => setSearching(false)}
                          dataSource={filtered} 
                          placeInput={optionValue => {
                            //if(optionValue){
                            setOptionValue(optionValue)
                            setSearching(false)
                            
                            //}
                          }
                          }
                          />
                    }
                  </View>
                     )
                    }
               






               



               <View style={styles.headerWrapper}>
                {/* <Paystack 
                    buttonText="Pay Now"
                    showPayButton={true} 
                    paystackKey="pk_test_6c7131bb1320a0c3a2862c36ecb5900754ef3016"
                    amount={'25000.00'}
                    billingEmail="paystackwebview@something.com"
                    activityIndicatorColor="green"
                    onCancel={(e) => {
                      // handle response here
                    }}
                    onSuccess={(res) => {
                      // handle response here
                    }}
                    // autoStart={false}
                    ref={paystackWebViewRef}
                  /> */}
                </View>


                <MsgBox type={messageType}>{message}</MsgBox>

                <TouchableOpacity onPress={onSubmit} style={styles.appButtonContainer}>
                <AppButton />
                </TouchableOpacity>
              {/* </View> */}
            {/* )}
          </Formik> */}
        </ScrollView>
      </KeyboardAvoidingWrapperDashboard>
    );
};

//custom button
const AppButton = ({ onPress, title }) => (
  // <TouchableOpacity onPress={onSubmit} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>ADD TRANSACTION</Text>
  // </TouchableOpacity>
);

const MyTextInput = ({label, icon,hidePassword,isPassword, setHidePassword, isDate, showDatePicker, ...props}) => {
  return (
      <View>
          <LeftIcon>
              <Octicons name={icon} size={30} color={brand}/>
          </LeftIcon>
          <StyledInputLabel>{label}</StyledInputLabel>
          {!isDate && <StyledTextInput {...props} />}
          {isDate && (<TouchableOpacity onPress={showDatePicker}>
              <StyledTextInput {...props} />
              </TouchableOpacity>)}
          {isPassword && (
              <RightIcon onPress = {() => setHidePassword(!hidePassword)} > 
                  <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}  />
              </RightIcon>
          )}
      </View>
  );
};


const MyNewTextInput = ({label, icon,hidePassword,isPassword, setHidePassword, isDate, showDatePicker, ...props}) => {
  return (
      <View>
          {!isDate && <MyStyledTextInput {...props} />}
          {isDate && (<TouchableOpacity onPress={showDatePicker}>
              <MyStyledTextInput {...props} />
              </TouchableOpacity>)}
      </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 25,
    backgroundColor: '#121214',
    // color: '#fff'  
  },
  headerWrapper: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#3570b6",
    // borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  textInput: {
    height: 40,
    paddingLeft: 10, 
    height: 60, 
    borderWidth: 1, 
    color:'#78757c', 
    backgroundColor: '#1b181f'
  },
});
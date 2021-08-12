import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik for our forms
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';


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
} from './../components/styles';
import {View, TouchableOpacity, ActivityIndicator } from 'react-native';

//colors
const {brand, darkLight, primary} = Colors;

//keyboard avaoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

//import axios
import axios from 'axios';

//async storage
import  AsyncStorage  from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

//import date time picker
import DateTimePicker from '@react-native-community/datetimepicker';


const SignUp = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

     //state varible to handle message and message type.
     const [message, setMessage] = useState();
     const [messageType, setMessageType] = useState();

    //Actual date of birth the user picked
    const [dob, setDob] = useState();

    //thesame thing as the context consumer
    //destructure our stored credentials from the context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const onChange =  (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    };

    const showDatePicker = () => {
        setShow('date');
    };


    //handle sign up
     const handleSignUp = (credentials, setSubmitting) => {
         handleMessage(null);
         const config = {
            'Content-Type': 'application/x-www-form-urlencoded',
                     'Accept': 'application/json',
           };
         const url = 'http://10.91.20.144:5000/user/signup'
     axios.post(url, credentials, config)
     .then((response)=>{
         const result = response.data;
         const {message, status, data} = result;
 
         //check the status of the message, ref styled component
         if( status !== 'SUCCESS' ) {
             handleMessage(message, status);
         }else{
            //  navigation.navigate('Welcome', {...data});
             persistLogin({...data}, message,status);
         }
         setSubmitting(false);
 
     }).catch((error) => {
         console.log(error);
         setSubmitting(false);
         handleMessage("An error occured. Check your network and try again!")
     });
     };

      //function to handle the message
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('myAppCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error)
            handleMessage('persisting login failed');
        })
    }


    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark"/>
            <InnerContainer>
                {/* <PageLogo resizeMode="cover" /> */}
                <PageTitle>Escrosis</PageTitle>
                <SubTitle>Account SignUp</SubTitle>

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}

                <Formik
                     initialValues={{username: '',email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                     onSubmit={(values, {setSubmitting}) => {
                         values = {...values, dateOfBirth: dob}
                        if (values.email == '' ||
                            values.password == '' || 
                            values.username == '' || 
                            values.dateOfBirth == '' || 
                            values.confirmPassword == '') {
                            handleMessage('Please fill all fields');
                            setSubmitting(false) 
                        }else if( values.password !== values.confirmPassword ) {
                            handleMessage('Passwords do not match');
                            setSubmitting(false) 
                        }
                        else{
                            handleSignUp(values, setSubmitting);
                        }
                     }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <StyledFormArea>
                        <MyTextInput 
                            label = "Full Name"
                            icon = "person"
                            placeholder="Egboh Moses"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('username')}
                            onBlur = {handleBlur('username')}  
                            value={values.username}
                        />

                        <MyTextInput 
                            label = "Email Address"
                            icon = "mail"
                            placeholder="mosesegboh@gmail.com"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('email')}
                            onBlur = {handleBlur('email')}  
                            value={values.email}
                            keyboardType = "email-address"
                        />

                        <MyTextInput 
                            label = "Date Of Birth"
                            icon = "calendar"
                            placeholder="YYYY - MM - DD"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('dateOfBirth')}
                            onBlur = {handleBlur('dateOfBirth')}  
                            value={dob ? dob.toDateString() : ''}
                            isDate = {true}
                            editable = {false}
                            showDatePicker = {showDatePicker}
                        />

                        <MyTextInput 
                            label = "Password"
                            icon = "lock"
                            placeholder="* * * * * * "
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('password')}
                            onBlur = {handleBlur('password')}  
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword = {true}
                            hidePassword = {hidePassword}
                            setHidePassword = {setHidePassword}
                        />

                        <MyTextInput 
                            label = "Confirm Password"
                            icon = "lock"
                            placeholder="* * * * * * "
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('confirmPassword')}
                            onBlur = {handleBlur('confirmPassword')}  
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword = {true}
                            hidePassword = {hidePassword}
                            setHidePassword = {setHidePassword}
                        />

                        <MsgBox type={messageType}>{message}</MsgBox>
                        
                        {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Sign Up
                            </ButtonText>
                        </StyledButton>)}

                        {isSubmitting && (<StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>)}
                        <Line />

                        <ExtraView>
                            <ExtraText>Already have an account </ExtraText>
                            <TextLink onPress={()=>navigation.navigate('Login')}>
                                <TextLinkContent>Sign In</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>) }
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

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

export default SignUp;

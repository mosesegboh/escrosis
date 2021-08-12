import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik for our forms
import {Formik} from 'formik';

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
//activity indicator is to show the loader
import {View,ActivityIndicator } from 'react-native';

//colors
const {brand, darkLight, primary} = Colors;

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

//axios
import axios from 'axios';

//keyboard avaoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

//google api client
import * as Google from 'expo-google-app-auth';

//async storage
import  AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import  {CredentialsContext}  from './../components/CredentialsContext';






const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true)
    //state varible to handle message and message type.
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    //thesame thing as the context consumer
    //destructure our stored credentials from the context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        // const config = {
        //    'Content-Type': 'application/x-www-form-urlencoded',
        //             'Accept': 'application/json',
        //   };
        const url = 'http://10.91.20.124:5000/user/signin'
    axios.post(url, credentials)
    .then((response)=>{
        const result = response.data;
        const {message, status, data} = result;

        //check the status of the message, ref styled component
        if( status !== 'SUCCESS' ) {
            handleMessage(message, status);
        }else{
            // navigation.navigate('Welcome', {...data[0]});
            persistLogin({...data[0]}, message,status);
        }
        setSubmitting(false);

    }).catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage("An error occured. Check your network and try again!")
    });
    };

    //function to handle the message
    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    }

    //google sign in functionality
    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {iosClientId: `516648526837-00s13ttt11q5aacah9imiam3kngre6o9.apps.googleusercontent.com`, 
                        androidClientId: `516648526837-ghdae77v0ukj8epok8jdgtoglckiabs3.apps.googleusercontent.com`,
                        scopes: ['profile', 'email']
                    }

        Google.logInAsync(config)
        .then((result) => {
            const {type, user} = result;
            if (type == 'success') {
                const {email, name, photoUrl} = user;
                // handleMessage('Google Sign in successful', 'SUCCESS');
                // setTimeout(() => navigation.navigate('Welcome', {email, name, photoUrl}), 1000);
                persistLogin({email, name, photoUrl}, message, 'SUCCESS');
            }else{
                handleMessage('Google sign in was cancelled!')
            }
            setGoogleSubmitting(false);
        })
        .catch(error => {
            console.log(error);
            handleMessage('An error occured. Check your network and try again');
            setGoogleSubmitting(false);
        })
    };

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
                <PageLogo resizeMode="cover" />
                <PageTitle>Escrosis</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                     initialValues={{email: '', password: ''}}
                     onSubmit={(values, {setSubmitting}) => {
                        if (values.email == '' || values.password == '') {
                            handleMessage('Please fill all fields');
                            setSubmitting(false) 
                        }else{
                            handleLogin(values, setSubmitting);
                        }
                     }}
                >
                    {/* issubmitting function comes from formek for handling onpress events */}
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <StyledFormArea>
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
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {/* if on submitting is false and true */}
                        {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>)}

                        {isSubmitting && (<StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>)}
                        <Line />
                        
                        

                        {!googleSubmitting && (
                            <StyledButton google={true} onPress={handleGoogleSignin}>
                            <Fontisto name="google" color={primary} size={25}/>
                            <ButtonText google={true}>
                                Sign In With Google
                            </ButtonText>
                        </StyledButton>
                        )}

                        {googleSubmitting && (
                            <StyledButton google={true} disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                        )}
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink onPress = {()=>navigation.navigate("SignUp")}>
                                <TextLinkContent>Sign Up</TextLinkContent>
                            </TextLink>
                            <TextLink onPress = {()=>navigation.navigate("Home")}>
                                <TextLinkContent>   Home</TextLinkContent>
                            </TextLink>
                            <TextLink onPress = {()=>navigation.navigate("MainTabScreen")}>
                                <TextLinkContent>   Main Tab</TextLinkContent>
                            </TextLink>
                            <TextLink onPress = {()=>navigation.navigate("DetailsScreen")}>
                                <TextLinkContent>  Details</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>) }
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon,hidePassword,isPassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress = {() => setHidePassword(!hidePassword)} > 
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}  />
                </RightIcon>
            )}
        </View>
    );
};

export default Login;

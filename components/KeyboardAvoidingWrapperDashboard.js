import React from 'react';

//keyboard avaiding view
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';

// import {Colors} from './../components/styles';
// const {primary} = Colors;

const KeyboardAvoidingWrapperDashboard = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#121214'}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapperDashboard;
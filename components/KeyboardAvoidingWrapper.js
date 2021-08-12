import React from 'react';

//keyboard avaiding view
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';

import {Colors} from './../components/styles';
const {primary} = Colors;

const keyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: primary}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default keyboardAvoidingWrapper;
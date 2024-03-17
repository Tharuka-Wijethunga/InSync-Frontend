import React, {useState} from 'react';
import {StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions} from 'react-native';
import {Box, Button, Input, Icon, NativeBaseProvider, Text, VStack, HStack, Checkbox, Modal, Radio} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import {useNavigation} from "@react-navigation/native";
import SignupForm from "./SignupForm";


const Signup = () => {
    return (
        <NativeBaseProvider>
            <SignupForm/>
        </NativeBaseProvider>
    );
}

export default Signup;

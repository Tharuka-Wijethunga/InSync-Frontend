import React, { useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import {
    Box,
    Button,
    Input,
    Icon,
    NativeBaseProvider,
    Text,
    VStack,
    HStack,
    Checkbox,
    Modal,
    Radio,
    View,
    Image
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {is_valid_email} from "./password";



const EmailVerificationFirstPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const handleBack = () => {
        navigation.goBack();
    };
    const handleSignup = () => {
        if ( !email ) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }
        axios.post(`https://ef7a-2402-4000-2180-9088-e95f-5682-e8eb-bdde.ngrok-free.app/checkMail?email=${email}`)
            .then(response => {
                if (response.data.exists) {
                    Alert.alert('Error', 'Email already exists, Try another one.');
                } else if (validateForm()) {
                    axios.post(`https://ef7a-2402-4000-2180-9088-e95f-5682-e8eb-bdde.ngrok-free.app/send-verification-email?email=${email}`)
                    navigation.navigate('EmailVerificationSecondPage',{
                        email:email
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const validateForm = ()=>{
        return is_valid_email(email);
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box style={[styles.container, {width: '100%', height: '100%'}]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.black}/>
                    <Text fontWeight={"bold"} color={Colors.black}>Back</Text>
                </TouchableOpacity>
                <VStack space={4} alignItems="center" width="100%">
                    <Image
                        source={require("../../../assets/pic7.png")}
                        style={styles.image}
                        resizeMode={"contain"}
                        alt='verified icon'
                    />
                    <Text fontSize={38} fontWeight="bold" color="black">Get Started</Text>
                    <Text fontSize={13} color="gray.500" mt={-4}>by creating a free account.</Text>
                    <Input mt={2}
                           variant="rounded"
                           borderColor={Colors.Blue}
                           placeholder="Email"
                           value={email}
                           onChangeText={setEmail}
                           style={styles.input}
                    />
                    <Button onPress={handleSignup} colorScheme={"blue"} width="100%" rounded={20} mt={4}>
                        <Text color="white" textAlign="center" fontSize="16">Next</Text>
                    </Button>
                </VStack>
            </Box>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '7%',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: '8%',
        left: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: '100%',
    },
    Alert:{
        borderRadius:"30%",
    },
    inputWrapper: {
        width: '100%',
    },
    image: {
        height: '38%',
        alignSelf: "center"
    },
});

export default EmailVerificationFirstPage;

import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Animated, Easing
} from 'react-native';
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
        axios.post(`http://192.168.248.230:8005/checkMail?email=${email}`)
            .then(response => {
                if (response.data.exists) {
                    Alert.alert('Error', 'Email already exists, Try another one.');
                } else if (validateForm()) {
                    axios.post(`http://192.168.248.230:8005/send-verification-email?email=${email}`)
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

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateYAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const keyboardDidShow = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration:0,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: -40,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,

            }),
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const keyboardDidHide = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const windowHeight = Dimensions.get('window').height;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box style={[styles.container, {width: '100%', height: '100%'}]}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24} />
                        <Text fontWeight='bold'>Back</Text>
                    </TouchableOpacity>
                </View>
                <VStack space={4} alignItems="center" width="100%">
                    <Animated.Image source={require("../../../assets/pic7.png")} style={[styles.image,{ transform: [{ scale: scaleAnim }],marginTop: windowHeight*0.05 }]} />

                    {/*<Image*/}
                    {/*    source={require("../../../assets/pic7.png")}*/}
                    {/*    style={styles.image}*/}
                    {/*    alt='verified icon'*/}
                    {/*/>*/}
                    <Animated.View style={{  transform: [{ translateY: translateYAnim }] }}>
                        <VStack space={4} alignItems="center" width="100%">

                            <Text fontSize={38} fontWeight="bold" color="black">Get Started</Text>
                            <Text fontSize={13} color="gray.500" mt={-4}>by creating a free account.</Text>
                        </VStack>
                    </Animated.View>
                    <Animated.View style={[ styles.inputWrapper,{ transform: [{ translateY: translateYAnim }]}]}>
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
                    </Animated.View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
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
        alignSelf: "center",
        resizeMode: "contain"

    },
});

export default EmailVerificationFirstPage;

import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Animated,
    Easing,
    TextInput
} from 'react-native';
import {
    Box,
    Button,
    Text,
    VStack,
    View,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const ResetPasswordSecondPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [code, setCode] = useState(new Array(6).fill(''));
    const [loading, setLoading] = useState(false); // State to manage loading state


    const handleBack = () => {
        navigation.goBack();
    };

    const handleVerifyCode = async () => {
        const verificationCode = code.join('');
        if (verificationCode.length !== 6) {
            Alert.alert('Error', 'Please enter the complete verification code.');
            return;
        }

        const payload = {
            email,
            code: parseInt(verificationCode)  // Make sure the code is sent as an integer
        };
        setLoading(true); // Start loading state
        console.log('Request payload:', payload); // Log the request payload to inspect it

        try {
            const response = await axios.post('https://8dd8-175-157-13-142.ngrok-free.app/api/reset_password/password-reset/verify', payload);

            console.log('Backend response status:', response.status);
            console.log('Backend response data:', response.data); // Log specific data if needed

            if (response.data.message === 'Verification successful') {
                // Alert.alert('Success', 'Verification successful');
                setLoading(false); // Stop loading state on success
                navigation.navigate('ResetPasswordThirdPage', { email, code: verificationCode });
            }
        } catch (error) {
            setLoading(false); // Stop loading state on success
            console.error('Verification error:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Invalid verification code. Please try again.');
        }
    };

    const handleChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Focus next input field
        if (value !== '') {
            if (index < 5) {
                inputs.current[index + 1].focus();
            }
        // } else {
        //     // Value is empty, handle backspace
        //     if (index > 0) {
        //         inputs.current[index -1].focus();
        //     }
        }
    };
    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const inputs = useRef([]);

    const translateYAnim = useRef(new Animated.Value(0)).current;
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
            Animated.timing(translateYAnim, {
                toValue: -40,
                duration: 300,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 300,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const keyboardDidHide = () => {
        Animated.parallel([
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box style={[styles.container, { width: '100%', height: '100%' }]}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24} />
                        <Text fontWeight='bold'>Back</Text>
                    </TouchableOpacity>
                </View>
                <VStack space={4} alignItems="center" width="100%">
                    <Animated.Image source={require("../../../assets/pic10.png")} style={[styles.image, { transform: [{ scale: scaleAnim }], marginTop: windowHeight * 0.05 }]} />

                    <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
                        <VStack space={4} alignItems="center" width="100%">
                            <Text fontSize={38} fontWeight="bold" color="black">Verification</Text>
                            <Text fontSize={13} color="gray.500" mt={-4}>Enter the code sent to your email</Text>
                        </VStack>
                    </Animated.View>
                    <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: translateYAnim }] }]}>
                        <View style={styles.codeInputContainer}>
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    value={digit}
                                    onChangeText={(value) => handleChange(value, index)}
                                    onKeyPress={(event) => handleKeyPress(event, index)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    style={styles.codeInput}
                                    ref={(input) => inputs.current[index] = input}
                                />
                            ))}
                        </View>
                        <Button onPress={handleVerifyCode} colorScheme={"blue"} width="100%" rounded={20} mt={10} isLoading={loading} isLoadingText="Verifying">
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
    inputWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        height: '38%',
        alignSelf: "center",
        resizeMode: "contain"
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center',
    },
    codeInput: {
        borderWidth: 1,
        borderColor: Colors.DBlue,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        height:40,
        width: 40,
        marginTop: 6,
        backgroundColor: Colors.lightgray,
    }
});

export default ResetPasswordSecondPage;

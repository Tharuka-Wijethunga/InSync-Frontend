import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Animated,
    Easing,
    ActivityIndicator
} from 'react-native';
import {
    Box,
    Button,
    Input,
    Text,
    VStack,
    View
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ResetPasswordFirstPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state

    const handleBack = () => {
        navigation.goBack();
    };

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Validation Error', 'Please fill in your email address');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true); // Start loading state

        axios.post(`http://192.168.248.230:8006/api/reset_password/password-reset/request`, { email })
            .then(response => {
                setLoading(false); // Stop loading state on success
                navigation.navigate('ResetPasswordSecondPage', { email });
            })
            .catch((error) => {
                setLoading(false); // Stop loading state on error
                if (error.response && error.response.status === 404) {
                    Alert.alert('Error', 'Email not found. Please try again.');
                } else {
                    console.error('Error:', error.response?.data || error.message);
                    Alert.alert('Error', 'An error occurred. Please try again.');
                }
            });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

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
                    <Animated.Image source={require("../../../assets/pic9.png")} style={[styles.image, { transform: [{ scale: scaleAnim }], marginTop: windowHeight * 0.05 }]} />

                    <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
                        <VStack space={4} alignItems="center" width="100%">
                            <Text fontSize={38} fontWeight="bold" color="black">Access Recovery</Text>
                            <Text fontSize={13} color="gray.500" mt={-4}>Enter your email to reset your password</Text>
                        </VStack>
                    </Animated.View>
                    <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: translateYAnim }] }]}>
                        <Input
                            mt={2}
                            variant="rounded"
                            borderColor={Colors.Blue}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                        <Button
                            onPress={handleResetPassword}
                            colorScheme={"blue"}
                            borderRadius={"full"}
                            width="100%"
                            size="lg"
                            alignSelf="center"
                            marginTop={4}
                            isLoading={loading}
                            isLoadingText="Checking"
                        >
                            Next
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
    },
    image: {
        height: '38%',
        alignSelf: "center",
        resizeMode: "contain"
    },
});

export default ResetPasswordFirstPage;
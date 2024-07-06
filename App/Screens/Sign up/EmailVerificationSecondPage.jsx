import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Box, Button, Text, VStack, Spinner, Image, View} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const EmailVerificationSecondPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;

    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [remainingChances, setRemainingChances] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://192.168.248.230:8006/check-verification-status?email=${email}`)
                .then(response => {
                    if (response.data.verified) {
                        setIsVerified(true);
                        clearInterval(interval);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [email]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleContinueSignup = async () => {
        try {
            await axios.delete(`http://192.168.248.230:8006/delete-verification-info?email=${email}`);
            navigation.navigate('SignupForm', {
                email: email
            });
        } catch (error) {
            console.error('Error deleting email verification info:', error);
            Alert.alert('Error', 'Unable to continue signup. Please try again later.');
        }
    };

    const handleResendLink = async () => {
        if (remainingChances > 0) {
            setIsLoading(true);
            try {
                await axios.post(`http://192.168.248.230:8006/send-verification-email?email=${email}`);
                setRemainingChances(remainingChances - 1);
                Alert.alert('Verification email sent', `Please check your email for the new verification link. You have ${remainingChances - 1} chances left.`);
            } catch (error) {
                Alert.alert('Error', 'Unable to resend verification email. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        } else {
            Alert.alert('No more chances', 'You have used all your chances to resend the verification link.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box style={[styles.container, { width: '100%', height: '100%' }]}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24}/>
                        <Text fontWeight='bold'>Back</Text>
                    </TouchableOpacity>
                </View>
                <VStack space={4} alignItems="center" width="100%">
                    {!isVerified ? (
                        <>
                            <Spinner size="lg" color={Colors.Blue} />
                            <Text fontSize={38} fontWeight="bold" color="black">Verify your email</Text>
                            <Text textAlign={"center"} fontSize={13} color="gray.500" mt={-4}>
                                A verification email has been sent to your email address.
                                Please check your email and click on the link to verify your email address.
                            </Text>
                            <TouchableOpacity onPress={handleResendLink} disabled={remainingChances === 0} >
                                <Text fontSize={13} color={remainingChances === 0 ? 'gray' : Colors.Blue}  mt={-2}>
                                    Resend the link
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <><Image
                            source={require("../../../assets/pic8.png")}
                            style={styles.image}
                            resizeMode={"contain"}
                            alt='verified icon'
                        />
                            <Text fontSize={38} fontWeight="bold" color="black">Verified !</Text>
                            <Text textAlign={"center"} fontSize={13} color="gray.500" mt={-4}>
                                You have successfully verified your email account.
                            </Text>
                            <Button onPress={handleContinueSignup} colorScheme={"blue"} width="100%" rounded={20}>
                                <Text color="white" textAlign="center" fontSize="16">Continue</Text>
                            </Button>
                        </>
                    )}
                </VStack>
            </Box>
        </TouchableWithoutFeedback>
    );
};

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
    Alert: {
        borderRadius: "30%",
    },
    inputWrapper: {
        width: '100%',
    },
    image: {
        height: '38%',
        alignSelf: "center"
    },
});

export default EmailVerificationSecondPage;

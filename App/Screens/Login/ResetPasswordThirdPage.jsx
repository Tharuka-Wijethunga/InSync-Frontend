import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Animated,
    Easing, TouchableOpacity
} from 'react-native';
import {
    Box,
    Button,
    Input,
    Text,
    VStack,
    View, IconButton, Icon,
    Modal
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { is_valid_password } from "../Sign up/password";

const PasswordRequirementsModal = ({ showModal, setShowModal }) => {
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content borderRadius={30}>
                <Modal.Header>
                    <Text textAlign="center">Password Requirements</Text>
                </Modal.Header>
                <Modal.Body>
                    <Text>Password must have a minimum of eight characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.</Text>
                </Modal.Body>
                <Button variant="outline" colorScheme="red" onPress={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Content>
        </Modal>
    );
};



const ResetPasswordThirdPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email, code } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading state


    const handleBack = () => {
        navigation.goBack();
    };
    const handleResetPassword = async () => {

        if (!newPassword || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }
        if (!is_valid_password(newPassword)) {
            return false;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Validation Error', 'Passwords do not match');
            return;
        }

        const payload = {
            email,
            code,
            new_password: newPassword
        };
        setLoading(true); // Start loading state

        try {
            const response = await axios.post('https://8dd8-175-157-13-142.ngrok-free.app/api/reset_password/password-reset/reset', payload);

            if (response.data.message === 'Password reset successful') {
                setLoading(false); // Stop loading state on success
                Alert.alert('Success', 'Password has been reset successfully');
                navigation.navigate('Login');
            } else {
                setLoading(false); // Stop loading state on success
                Alert.alert('Error', 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setLoading(false); // Stop loading state on success
            console.error('Error:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    <Animated.Image source={require("../../../assets/pic11.png")} style={[styles.image, { transform: [{ scale: scaleAnim }], marginTop: windowHeight * 0.05 }]} />

                    <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
                        <VStack space={4} alignItems="center" width="100%">
                            <Text fontSize={38} fontWeight="bold" color="black">Reset Password</Text>
                            <Text fontSize={13} color="gray.500" mt={-4}>Enter your new password</Text>
                        </VStack>
                    </Animated.View>
                    <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: translateYAnim }] }]}>
                        <Input
                            mt={2}
                            variant="rounded"
                            borderColor={Colors.Blue}
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                            InputRightElement={
                                <IconButton
                                    icon={<MaterialIcons name="info-outline" size={20} color="gray.700" />}
                                    onPress={() => setShowModal(true)}
                                    variant="unstyled"
                                />
                            }
                        />
                        <Input
                            mt={2}
                            variant="rounded"
                            borderColor={Colors.Blue}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                            InputRightElement={
                                <IconButton
                                    icon={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="gray.700" />}
                                    onPress={togglePasswordVisibility}
                                    variant="unstyled"
                                />
                            }
                        />
                        <Button onPress={handleResetPassword} colorScheme={"blue"} width="100%" rounded={20} mt={4} isLoading={loading} isLoadingText="Updating">
                            <Text color="white" textAlign="center" fontSize="16">Reset Password</Text>
                        </Button>
                    </Animated.View>
                </VStack>
                <PasswordRequirementsModal showModal={showModal} setShowModal={setShowModal} />
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

export default ResetPasswordThirdPage;

import React, { useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Box, Button, Input, Icon, NativeBaseProvider, Text, VStack, Link, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import logo from './../../../assets/bank.png';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from 'qs';


const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (validateForm()) {
            try {
                // Use `qs` to format the data in the application/x-www-form-urlencoded format
                const requestData = qs.stringify({ username, password });

                // Make a POST request using axios with the correct content type
                const response = await axios.post('http://192.168.72.230:8005/token', requestData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                const data = response.data;

                // Check if the response contains an access token and a refresh token
                if (data.access_token && data.refresh_token) {
                    // Print the tokens in the console
                    console.log('Access Token:', data.access_token);
                    console.log('Refresh Token:', data.refresh_token);

                    // Store the tokens securely using AsyncStorage
                    await AsyncStorage.setItem('accessToken', data.access_token);
                    await AsyncStorage.setItem('refreshToken', data.refresh_token);

                    // Navigate to the next screen
                    navigation.reset({ index: 0, routes: [{ name: 'TabNavigation' }] });
                } else {
                    throw new Error('Tokens not found');
                }
            } catch (error) {
                console.error('Login error:', error);
                Alert.alert('Error', 'Failed to log in. Please check your username and password and try again.');
            }
        }
    };



    const validateForm = () => {
        // Add your form validation logic here
        // For example, checking the length of the password, ensuring the username and password are not empty, etc.
        return true;
    };

    const handleSignup = () => {
        navigation.navigate({ name: 'Signup' });
    };

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box style={[styles.container, { width: '100%', height: '100%' }]}>
                    <VStack space={4} alignItems="center" width="100%">
                        <Text fontSize={40} fontWeight="bold" color="black">InSync</Text>
                        <Text fontSize={13} color="gray.500" mt={-4}>Login to continue.</Text>
                        <Image source={logo} style={styles.logo} />

                        <Input mt={10}
                               variant="rounded"
                               borderColor={Colors.Blue}
                               placeholder="Username"
                               value={username}
                               onChangeText={setUsername}
                               style={styles.input}
                        />
                        <Input mt={2}
                               variant="rounded"
                               borderColor={Colors.Blue}
                               placeholder="Password"
                               value={password}
                               onChangeText={setPassword}
                               secureTextEntry={!showPassword}
                               InputRightElement={
                                   <Button onPress={togglePasswordVisibility} variant="unstyled">
                                       <Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />} color="gray.700" />
                                   </Button>
                               }
                               style={styles.input}
                        />
                        <Button onPress={handleLogin} colorScheme={"blue"} width="100%" rounded={20} mt={7}>
                            <Text color="white" textAlign="center" fontSize="16">Login</Text>
                        </Button>
                        <Link onPress={handleSignup} fontSize={10}><Text fontSize={11}>Forgot Password?</Text></Link>
                        <HStack space={1} alignItems="center" mt={10}>
                            <Text fontSize={14} fontWeight="bold" paddingRight={2}>New to InSync?</Text>
                            <Link onPress={handleSignup}><Text color={Colors.Blue}>Sign up</Text></Link>
                        </HStack>
                    </VStack>
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
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
    input: {
        width: '100%',
    },
    logo: {
        width: '30%',
        height: '15%',
        resizeMode: 'contain',
    },
});

export default Login;
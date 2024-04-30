import React, { useState,useContext } from 'react';
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ActivityIndicator
} from 'react-native';
import {Box, Button, Input, Icon, NativeBaseProvider, Text, VStack, Link, HStack, View} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import logo from './../../../assets/bank.png';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from 'qs';
import {AuthContext} from "../../Context/AuthContext";



const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {login}=useContext(AuthContext)//getting login method from the AuthContext

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (validateForm()) {
            login(username,password);
        }
    };



    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(username)) {
            Alert.alert('Error', 'Please enter a valid email');
            return false;
        }
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
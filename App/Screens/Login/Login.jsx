import React, {useState, useContext, useRef,useEffect} from 'react';
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image ,
    ActivityIndicator, Animated, Easing
} from 'react-native';
import {Box, Button, Input, Icon, NativeBaseProvider, Text, VStack, Link, HStack, View, Center} from 'native-base';
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
    const {login}=useContext(AuthContext);//getting login method from the AuthContext

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateYAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

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
    const handleForgetPassword = () => {
        navigation.navigate({ name: 'ResetPasswordFirstPage' });
    };

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
                duration:700,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 0,
                easing: Easing.ease,
                useNativeDriver: true,

            }),
            Animated.timing(scaleAnim, {
                toValue: 0.7,
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
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 600,
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

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box style={[styles.container, { width: '100%', height: '100%' }]}>
                    <VStack space={4} alignItems="center" width="100%">
                        <Animated.View style={{ opacity: fadeAnim}}>
                            <Text fontSize={40} fontWeight="bold" color="black" mt={0} >InSync</Text>
                            <Center><Text fontSize={13} color="gray.500" mt={0}>Login to continue.</Text></Center>
                        </Animated.View>
                        {/*<Image source={logo} style={styles.logo} />*/}
                        <Animated.Image source={logo} style={[styles.logo, { transform: [{ scale: scaleAnim }],marginTop:-40 }]} />
                        <Input mt={-4}
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
                        <Button onPress={handleLogin} colorScheme={"blue"} width="100%" rounded={20} mt={5}>
                            <Text color="white" textAlign="center" fontSize="16">Login</Text>
                        </Button>
                        <Link onPress={handleForgetPassword} fontSize={10}><Text fontSize={11}>Forgot Password?</Text></Link>
                        <HStack space={1} alignItems="center">
                            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
                                <Text fontSize={14} fontWeight="bold" paddingRight={2} mt={2}>New to InSync?</Text>
                            </Animated.View>
                            <Link onPress={handleSignup}>
                                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
                                    <Text color={Colors.Blue} mt={2}>Sign up</Text>
                                </Animated.View>
                            </Link>
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
        width: '50%',
        height: '42%',
        resizeMode: 'contain',
    },
});

export default Login;
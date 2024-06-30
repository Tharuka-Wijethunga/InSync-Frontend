import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Dimensions,
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
    View, Center,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import { useNavigation } from "@react-navigation/native";
import { is_valid_fullName, is_valid_password } from "./password";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const SignupForm = ({ route }) => {
    const navigation = useNavigation();
    const { email } = route.params;

    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [isChecked, setIsChecked] = useState(false); // State for checkbox
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to toggle
    const [selectedGender, setSelectedGender] = useState('');
    const [isEmailExists, setIsEmailExits] = useState(false);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateYAnim = useRef(new Animated.Value(1)).current;

    const handleBack = () => {
        navigation.goBack();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = () => {
        if(validateForm()) {
            navigation.navigate('OnboardingFirstPage', {
                fullName: fullName,
                email: email,
                gender: gender,
                password: password,
            });
        }
    };

    const validateForm = () => {
        if (!fullName || !gender || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        if (!is_valid_fullName(fullName)) {
            return false;
        }

        if (!is_valid_password(password)) {
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert('Validation Error', 'Passwords did not match');
            return false;
        }
        if (!isChecked) {
            Alert.alert('Validation Error', 'Please agree to the terms and conditions');
            return false;
        }
        return true;
    };

    const handleGenderSelection = (value) => {
        setSelectedGender(value);
        setGender(value);
        setShowGenderModal(false);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration:1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: -20,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ]).start();
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ]).start();
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [fadeAnim, translateYAnim])

    const windowHeight = Dimensions.get('window').height;

    return (
        <NativeBaseProvider>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} extraScrollHeight={100}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Box style={[styles.container, { width: '100%', height: '100%' }]}>
                            <VStack space={4} alignItems="center" width="100%">
                                <Animated.View style={{ opacity: fadeAnim}}>
                                    <Text fontSize={38} fontWeight="bold" color="black" mt={0}>We're almost there!</Text>
                                    <Center><Text fontSize={13} color="gray.500" mt={-1} t>Set up your info and password.</Text></Center>
                                </Animated.View>
                            </VStack>
                            <VStack space={4} alignItems="center" width="100%">
                                <Input mt={5}
                                       variant="rounded"
                                       borderColor={Colors.Blue}
                                       placeholder="Full Name"
                                       value={fullName}
                                       onChangeText={setFullName}
                                    // style={styles.input}

                                />
                                <TouchableOpacity onPress={() => setShowGenderModal(true)} style={styles.inputWrapper}>
                                    <View pointerEvents="none">
                                        <Input mt={2}
                                               variant="rounded"
                                               borderColor={Colors.Blue}
                                               placeholder="Gender"
                                               value={gender}
                                               editable={false}
                                            // style={styles.input}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Modal isOpen={showGenderModal} onClose={() => setShowGenderModal(false)}>
                                    <Modal.Content borderRadius={30}>
                                        <Modal.Header><Text textAlign="center">Select Gender</Text></Modal.Header>
                                        <Modal.Body>
                                            <Radio.Group name="gender" value={selectedGender} onChange={handleGenderSelection}>
                                                <VStack space={2}>
                                                    <Radio value="Male" colorScheme='blue'>Male</Radio>
                                                    <Radio value="Female" colorScheme='blue'>Female</Radio>
                                                    <Radio value="Other" colorScheme='blue'>Other</Radio>
                                                </VStack>
                                            </Radio.Group>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>
                                <Input mt={-2}
                                       variant="rounded"
                                       borderColor={Colors.Blue}
                                       placeholder="Password"
                                       value={password}
                                       onChangeText={setPassword}
                                       secureTextEntry={!showPassword}
                                       InputRightElement={
                                           <Button onPress={() => setShowModal(true)} variant="unstyled">
                                               <Icon as={<MaterialIcons name="info-outline" />} color="gray.700" />
                                           </Button>
                                       }
                                    // style={styles.input}
                                />
                                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                    <Modal.Content borderRadius={30}>
                                        <Modal.Header><Text textAlign="center">Password Requirements</Text></Modal.Header>
                                        <Modal.Body>
                                            <Text>Password must have a minimum of eight characters, including at least one
                                                uppercase letter, one lowercase letter, one number, and one special
                                                character.</Text>
                                        </Modal.Body>
                                        <Button variant="outline" colorScheme="red"
                                                onPress={() => setShowModal(false)}>Close</Button>
                                    </Modal.Content>
                                </Modal>
                                <Input marginTop={-2}
                                       variant="rounded"
                                       borderColor={Colors.Blue}
                                       placeholder="Confirm Password"
                                       value={confirmPassword}
                                       onChangeText={setConfirmPassword}
                                       secureTextEntry={!showPassword}
                                       InputRightElement={
                                           <Button onPress={togglePasswordVisibility} variant="unstyled">
                                               <Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />}
                                                     color="gray.700" />
                                           </Button>
                                       }
                                    // style={styles.input}
                                />
                                <HStack alignItems="center" mt={3}>
                                            <Checkbox value="isChecked" isChecked={isChecked} onChange={(val) => setIsChecked(val)}
                                                      colorScheme={"blue"}>
                                                <Text fontSize={11}>By checking the box you agree to our
                                                    <Text color={Colors.Blue}> Terms </Text>and<Text color={Colors.Blue}> Conditions. </Text></Text>
                                            </Checkbox>
                                        </HStack>
                                        <Button onPress={handleSignup} colorScheme={"blue"} width="100%" rounded={20} mt={3}>
                                            <Center><Text color="white" fontSize="16">Next</Text></Center>
                                        </Button>
                            </VStack>
                        </Box>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
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

    // input: {
    //     width: '100%',
    // },
    Alert: {
        borderRadius: "30%",
    },
    inputWrapper: {
        width: '100%',
    },
    image: {
        height: '25%',
        alignSelf: "center"
    },
});

export default SignupForm;

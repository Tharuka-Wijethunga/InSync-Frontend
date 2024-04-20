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
    View
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Config/Colors";
import {useNavigation} from "@react-navigation/native";


const SignupForm = () => {
    const navigation = useNavigation();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [isChecked, setIsChecked] = useState(false); // State for checkbox
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to toggle
    const [selectedGender, setSelectedGender] = useState('');
    const handleBack = () => {
        navigation.goBack();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = () => {
        if (!fullName || !email || !gender || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }
        if (validateForm()) {
            console.log('Logging in with:', {fullName, email, gender, password});
            navigation.navigate({name: 'Login'});
        }

        //post request to pass this data to the backend
        fetch('http://192.168.72.230:8005/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username:fullName,
                email:email,
                gender:gender,
                password:password,
            })
        })
            .then(response => {
                console.log("successfully added");
            })
            .catch(error => console.error(error));
    };

    const validateForm = () => {
        const fullNameLetters = fullName.replace(/[.\s]/g, '');
        if (fullNameLetters.length < 4) {
            Alert.alert('Validation Error', 'Full name must have at least 4 letters');
            return false;
        }

        const fullNameRegex = /^[a-zA-Z\s.]+$/;
        if (!fullNameRegex.test(fullName)) {
            Alert.alert('Validation Error', 'Full name must contain only alphabetic characters, spaces, and dots');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address');
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
    const is_valid_password = (password) => {
        if (password.length < 8) {
            Alert.alert('Validation Error', 'Password must be at least 8 characters long');
            return false;
        }

        if (!/[A-Z]/.test(password)) {
            Alert.alert('Validation Error', 'Password must contain at least one uppercase letter');
            return false;
        }

        if (!/[a-z]/.test(password)) {
            Alert.alert('Validation Error', 'Password must contain at least one lowercase letter');
            return false;
        }

        if (!/[0-9]/.test(password)) {
            Alert.alert('Validation Error', 'Password must contain at least one digit');
            return false;
        }

        if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
            Alert.alert('Validation Error', 'Password must contain at least one special character');
            return false;
        }

        return true;
    };

    const handleGenderSelection = (value) => {
        setSelectedGender(value);
        setGender(value);
        setShowGenderModal(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box style={[styles.container, {width: '100%', height: '100%'}]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.black}/>
                    <Text fontWeight={"bold"} color={Colors.black}>Back</Text>
                </TouchableOpacity>
                <VStack space={4} alignItems="center" width="100%">
                    <Text fontSize={40} fontWeight="bold" color="black">Get Started</Text>
                    <Text fontSize={13} color="gray.500" mt={-4}>by creating a free account.</Text>
                    <Input mt={5}
                           variant="rounded"
                           borderColor={Colors.Blue}
                           placeholder="Full Name"
                           value={fullName}
                           onChangeText={setFullName}
                           style={styles.input}
                    />
                    <Input mt={2}
                           variant="rounded"
                           borderColor={Colors.Blue}
                           placeholder="Email"
                           value={email}
                           onChangeText={setEmail}
                           style={styles.input}
                    />
                    <TouchableOpacity onPress={() => setShowGenderModal(true)} style={styles.inputWrapper}>
                        <View pointerEvents="none">
                            <Input mt={2}
                                   variant="rounded"
                                   borderColor={Colors.Blue}
                                   placeholder="Gender"
                                   value={gender}
                                   editable={false}
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
                                   <Icon as={<MaterialIcons name="info-outline"/>} color="gray.700"/>
                               </Button>
                           }
                           style={styles.input}
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
                                   <Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'}/>}
                                         color="gray.700"/>
                               </Button>
                           }
                           style={styles.input}
                    />
                    <HStack alignItems="center" mt={5}>
                        <Checkbox value="isChecked" isChecked={isChecked} onChange={(val) => setIsChecked(val)}
                                  colorScheme={"blue"}>
                            <Text fontSize={11}>By checking the box you agree to our
                                <Text color={Colors.Blue}> Terms </Text>and<Text color={Colors.Blue}> Conditions. </Text></Text>
                        </Checkbox>
                    </HStack>
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
});

export default SignupForm;

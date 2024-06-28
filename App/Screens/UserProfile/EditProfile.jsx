import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    VStack,
    FormControl,
    Input,
    Button,
    Text,
    HStack,
    IconButton,
    Box,
    Spinner,
    Center,
    KeyboardAvoidingView,
    ScrollView,
    Icon,
    Modal
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Context/AuthContext';
import Colors from "../../Config/Colors";
import {is_valid_fullName, is_valid_password } from "../Sign up/password";
import {Alert, Platform} from 'react-native';


const EditProfile = ({ navigation }) => {
    const { setAccessToken,refreshAccessToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        currentPassword: '',
        password: '',
        confirmPassword: ''
    });

    const [originalData, setOriginalData] = useState({
        fullName: '',
        email: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPasswordError, setCurrentPasswordError] = useState('');  // New state for current password error
    const [isChanged, setIsChanged] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for showing password requirements modal


    useEffect(() => {
        fetchUserDetails();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!is_valid_fullName(formData.fullName)) {
            newErrors.fullName = 'Invalid full name';
        }

        if(formData.password|| formData.confirmPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = 'Current password is required';
            }
        }

        if (formData.password) {
            if (formData.password && !is_valid_password(formData.password)) {
                newErrors.password = 'Invalid password';
            }
            if (!formData.confirmPassword){
                newErrors.confirmPassword = 'Confirm the new password';
            }

            else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (formData.confirmPassword) {
            if (!formData.password)
                newErrors.password = 'Fill the new password field first';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchUserDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No token found');
            }
            console.log('Token:', token); // Debugging line to check token retrieval
            const response = await axios.get('https://ef7a-2402-4000-2180-9088-e95f-5682-e8eb-bdde.ngrok-free.app/api/user/fullname_email', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userDetails = response.data;
            console.log('Fetched user details:', userDetails); // Debugging line to check response
            setFormData((prevData) => ({
                ...prevData,
                fullName: userDetails.fullname,
                email: userDetails.email,
                currentPassword: '',
                password: '',
                confirmPassword:''

            }));

            setOriginalData({
                fullName: userDetails.fullname,
                email: userDetails.email,
            });
        } catch (error) {
            console.error('Error fetching user details:', error); // Debugging line to check error
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (validate()) {

            if (formData.fullName === originalData.fullName && formData.email === originalData.email && !formData.password && !formData.confirmPassword) {
                Alert.alert('No Changes', 'No changes were made.');
                return;
            }

            setLoading(true);
            setCurrentPasswordError('');  // Clear any previous current password error

            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('No token found');
                }

                const data = {
                    fullname: formData.fullName,
                    current_password: formData.currentPassword,
                    new_password: formData.password,
                    confirm_password: formData.confirmPassword
                };
                const response = await axios.put('https://ef7a-2402-4000-2180-9088-e95f-5682-e8eb-bdde.ngrok-free.app/api/user/update', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // setUpdateMessage('Profile updated successfully');
                console.log('Profile updated successfully:', response.data);
                Alert.alert('Success', 'Profile updated successfully');


                if (response.data.new_access_token) {
                    await AsyncStorage.setItem('accessToken', response.data.new_access_token);
                    setAccessToken(response.data.new_access_token);
                    console.log('Access token updated:', response.data.new_access_token);
                }
                await fetchUserDetails();
                // Clear password fields after successful update
                // setFormData((prevData) => ({
                //     ...prevData,
                //     currentPassword: '',
                //     password: '',
                //     confirmPassword: ''
                // }));
            }
            catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.detail === 'Current password is incorrect') {
                    setCurrentPasswordError('Current password is incorrect');
                    Alert.alert('Error', 'Current password is incorrect');
                }
                await fetchUserDetails();
            }
            finally {
                setLoading(false);
                setIsChanged(false);
            }
        } else {
            console.log('Validation failed:', errors);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setIsChanged(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View flex={1} backgroundColor={Colors.lightgray}>
                    {loading ? (
                        <Center flex={1}>
                            <Spinner size="lg" color={Colors.DBlue} />
                        </Center>
                    ) : (
                        <VStack space={3} paddingY={3} alignItems="center">
                            <Box backgroundColor={"white"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3}>
                                <HStack justifyContent="space-between" alignItems="center" paddingLeft={1} marginTop={2}>
                                    <IconButton
                                        icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black" />}
                                        onPress={() => navigation.navigate('Profile')}
                                        borderRadius="full"
                                        _pressed={{ bg: "blueGray.200:alpha.50" }}
                                    />
                                    <Text fontSize={18} fontWeight={"medium"} paddingRight={6}>
                                        Edit Profile
                                    </Text>
                                </HStack>
                                <View h={0.480} bg="black" />

                                <VStack space={3} padding={5}>
                                    <Text fontWeight="bold" fontSize="md">Change Profile Details</Text>
                                    <FormControl isInvalid={'fullName' in errors}>
                                        <FormControl.Label>Full Name</FormControl.Label>
                                        <Input
                                            variant="underlined"
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChangeText={(text) => handleChange('fullName', text)}
                                        />
                                        {'fullName' in errors && <FormControl.ErrorMessage>{errors.fullName}</FormControl.ErrorMessage>}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>User Email</FormControl.Label>
                                        <Input
                                            variant="underlined"
                                            placeholder="Email"
                                            value={formData.email}
                                            isReadOnly
                                        />
                                    </FormControl>

                                    <Text fontWeight="bold" fontSize="md">Update New Password</Text>
                                    <FormControl isInvalid={'currentPassword' in errors}>
                                        <FormControl.Label>Current Password</FormControl.Label>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            variant="underlined"
                                            placeholder="Enter current password"
                                            value={formData.currentPassword}
                                            onChangeText={(text) => handleChange('currentPassword', text)}
                                            InputRightElement={
                                                <IconButton
                                                    icon={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="gray.700" />}
                                                    onPress={togglePasswordVisibility}
                                                    variant="unstyled"
                                                />
                                            }
                                        />
                                        {'currentPassword' in errors && <FormControl.ErrorMessage>{errors.currentPassword}</FormControl.ErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={'password' in errors}>
                                        <FormControl.Label>Change Password</FormControl.Label>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            variant="underlined"
                                            placeholder="Enter a new password"
                                            value={formData.password}
                                            onChangeText={(text) => handleChange('password', text)}
                                            InputRightElement={
                                                <Button onPress={() => setShowModal(true)} variant="unstyled">
                                                    <Icon as={<MaterialIcons name="info-outline" />} color="gray.700" />
                                                </Button>
                                            }
                                        />
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

                                        {'password' in errors && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>}
                                        <FormControl.HelperText>
                                            Must be at least 8 characters.
                                        </FormControl.HelperText>
                                    </FormControl>

                                    <FormControl isInvalid={'confirmPassword' in errors}>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            variant="underlined"
                                            placeholder="Confirm password"
                                            value={formData.confirmPassword}
                                            onChangeText={(text) => handleChange('confirmPassword', text)}
                                        />
                                        {'confirmPassword' in errors && <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage>}
                                    </FormControl>
                                </VStack>
                            </Box>
                            {updateMessage && (
                                <Text color={updateMessage.includes('success') ? 'green.500' : 'red.500'} textAlign="center" mt={4}>
                                    {updateMessage}
                                </Text>
                            )}
                            <Button
                                bg={Colors.DBlue}
                                borderRadius={"full"}
                                w="94%"
                                size="md"
                                alignSelf="center"
                                mt={8}
                                mb={4}
                                onPress={handleSubmit}
                            >
                                Save
                            </Button>
                        </VStack>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditProfile;
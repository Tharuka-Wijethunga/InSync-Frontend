import React, { useState, useEffect, useContext } from 'react';
import { View, VStack, FormControl, Input, Button, Text, HStack, IconButton, Box, Spinner, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Context/AuthContext';
import Colors from "../../Config/Colors";
import {is_valid_email, is_valid_fullName, is_valid_password} from "../Sign up/password";

const EditProfile = ({ navigation }) => {
    const { setAccessToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!is_valid_fullName(formData.fullName)) {
            newErrors.fullName = 'Invalid full name';
        }
        if (!is_valid_email(formData.email)) {
            newErrors.email = 'Invalid email';
        }
        if (formData.password && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Fill the above new password field';
        }
        else if (formData.password && !is_valid_password(formData.password)) {
            newErrors.password = 'Invalid password';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('http://192.168.248.230:8005/api/user/fullname_email');
            const userDetails = response.data;
            setFormData((prevData) => ({
                ...prevData,
                fullName: userDetails.fullname,
                email: userDetails.email,
            }));
            console.log('Fetched user details:', userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (validate()) {
            setLoading(true);
            try {
                const data = {
                    fullname: formData.fullName,
                    new_email: formData.email,
                    new_password: formData.password,
                    confirm_password: formData.confirmPassword
                };
                const response = await axios.put('http://192.168.248.230:8005/api/user/update', data);
                setUpdateMessage('Profile updated successfully');
                console.log('Profile updated successfully:', response.data);

                if (response.data.new_access_token) {
                    await AsyncStorage.setItem('accessToken', response.data.new_access_token);
                    await AsyncStorage.setItem('refreshToken', response.data.new_refresh_token);
                    setAccessToken(response.data.new_access_token);
                }
                // Clear password fields after successful update
                setFormData((prevData) => ({
                    ...prevData,
                    password: '',
                    confirmPassword: ''
                }));
            } catch (error) {
                // console.error('Error updating user details:', error);
                // setUpdateMessage('Error updating profile');
            } finally {
                setLoading(false);
            }
        } else {
            console.log('Validation failed:', errors);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View flex={1} backgroundColor={Colors.LightGray}>
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
                            <FormControl isInvalid={'fullName' in errors}>
                                <FormControl.Label>Change Profile Details</FormControl.Label>
                                <Input
                                    variant="underlined"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChangeText={(text) => handleChange('fullName', text)}
                                />
                                {'fullName' in errors && <FormControl.ErrorMessage>{errors.fullName}</FormControl.ErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={'email' in errors}>
                                <Input
                                    variant="underlined"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                />
                                {'email' in errors && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={'password' in errors}>
                                <FormControl.Label>Change Password</FormControl.Label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    variant="underlined"
                                    placeholder="Enter a new password"
                                    value={formData.password}
                                    onChangeText={(text) => handleChange('password', text)}
                                />
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
                                    InputRightElement={
                                        <IconButton
                                            icon={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="gray.700" />}
                                            onPress={togglePasswordVisibility}
                                            variant="unstyled"
                                        />
                                    }
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
    );
};

export default EditProfile;

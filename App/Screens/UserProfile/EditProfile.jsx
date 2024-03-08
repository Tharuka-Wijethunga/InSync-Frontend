import React, { useState } from 'react';
import { View, VStack, FormControl, Input, Button, Text, HStack, IconButton, Box } from 'native-base';
import { MaterialIcons, WarningOutlineIcon } from 'react-native-vector-icons';
import Colors from "../../Config/Colors";

const EditProfile = ({ navigation }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let isValid = true;
        setErrors({}); // Clear previous errors

        const newErrors = {};
        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required.';
            isValid = false;
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last Name is required.';
            isValid = false;
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid Email format.';
            isValid = false;
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        if (validate()) {
            // Handle successful form submission (e.g., send data to server)
            console.log('Form submitted:', formData);
        } else {
            console.log('Validation failed:', errors);
        }
    };

    return (
        <View paddingY={3} flex={1}>
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
                <View h={0.5} w={"100%"} bg="gray.400" />

                <VStack space={3} padding={5}>
                    <FormControl isInvalid={'firstName' in errors}>
                        <FormControl.Label>Change Profile Details</FormControl.Label>
                        <Input
                            variant="underlined"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChangeText={(text) => handleChange('firstName', text)}
                        />
                        {'firstName' in errors && <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={'lastName' in errors}>
                        <Input
                            variant="underlined"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChangeText={(text) => handleChange('lastName', text)}
                        />
                        {'lastName' in errors && <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>}
                    </FormControl>

                    <FormControl  isInvalid={'email' in errors}>
                        <Input
                            variant="underlined"
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                        />
                        {'email' in errors && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}
                    </FormControl>

                    <FormControl  isInvalid={'password' in errors}>
                        <FormControl.Label>Change Password</FormControl.Label>
                        <Input
                            type="password"
                            variant="underlined"
                            placeholder="Enter a new password"
                            value={formData.password}
                            onChangeText={(text) => handleChange('password', text)}
                        />
                        {'password' in errors && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>}
                        <FormControl.HelperText>
                            Must be at least 6 characters.
                        </FormControl.HelperText>
                    </FormControl>

                    <FormControl isInvalid={'confirmPassword' in errors}>
                        <Input
                            type="password"
                            variant="underlined"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChangeText={(text) => handleChange('confirmPassword', text)}
                        />
                        {'confirmPassword' in errors && <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage>}
                    </FormControl>
                </VStack>
            </Box>
            <Button
                marginTop={4}
                w="94%"
                overflow={"hidden"}
                rounded="full"
                alignSelf="center"
                shadow={3}
                backgroundColor={Colors.Blue}
                onPress={handleSubmit}
            >
                <Text fontSize={16} fontWeight={"medium"} color={"white"}>
                    Save
                </Text>
            </Button>
        </View>
    );
};

export default EditProfile;

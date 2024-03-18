import React, { useState } from 'react';
import { View, VStack, FormControl, Input, Button, Text, HStack, IconButton, Box } from 'native-base';
import { MaterialIcons, WarningOutlineIcon } from 'react-native-vector-icons';
import Colors from "../../Config/Colors";

const EditProfile = ({ navigation }) => {
    const [formData, setFormData] = useState({

        //fill this "lihaj" hardcoded value from by taking as a variable from the back end
        firstName:'Lihaj'|| '',
        lastName:'Wickramsinghe' ||'',
        email: 'lihajwickramasinghe@gmail.com'||'',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        setErrors({}); // Clear previous errors

        const newErrors = {};
        let isValid = true;

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        // Check if a new password is entered and meets the minimum length requirement
        if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
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
                <View h={0.480} bg="black"/>

                <VStack space={3} padding={5}>
                    <FormControl isInvalid={'firstName' in errors}>
                        <FormControl.Label>Change Profile Details</FormControl.Label>
                        <Input
                            variant="underlined"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChangeText={(text) => handleChange('firstName', text)}
                        />
                    </FormControl>

                    <FormControl isInvalid={'lastName' in errors}>
                        <Input
                            variant="underlined"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChangeText={(text) => handleChange('lastName', text)}
                        />
                    </FormControl>

                    <FormControl  isInvalid={'email' in errors}>
                        <Input
                            variant="underlined"
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                        />
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
            <Button bg={Colors.DBlue}
                    borderRadius={"full"}
                    w="94%"
                    size="md"
                    alignSelf="center"
                    marginTop={4}
                    onPress={handleSubmit}>
                Save
            </Button>
        </View>
    );
};

export default EditProfile;

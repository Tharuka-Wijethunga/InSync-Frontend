import React, { useContext, useState, useCallback } from 'react';
import { View, VStack, HStack, Avatar, Spacer, Button, AlertDialog, Center, Spinner, Box, Text } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";
import Colors from "../../Config/Colors";

export default function Profile() {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchUserDetails();
        }, [])
    );

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('https://e2f9-2a09-bac1-4300-00-279-78.ngrok-free.app/api/users/fullname_email');
            const userDetails = response.data;
            setFullName(userDetails.fullname);
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        logout();
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete('https://90ea-2a09-bac1-4300-00-279-78.ngrok-free.app/api/users/delete-account');
            logout();
        } catch (error) {
            console.error('Error deleting account:', error);
        } finally {
            onClose();
        }
    };

    return (
        <View flex={1} backgroundColor={Colors.lightgray}>
            {loading ? (
                <Center flex={1}>
                    <Spinner size="lg" color={Colors.DBlue} />
                </Center>
            ) : (
                <VStack space={3} paddingY={3}>
                    <Box backgroundColor={"white"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} padding={3}>
                        <HStack justifyContent="space-between" alignItems={"center"} w={"100%"}>
                            <VStack>
                                <Text fontWeight={"medium"} fontSize={20}>Hello!</Text>
                                <Text fontWeight={"semibold"} fontSize={22}>{fullName}</Text>
                            </VStack>
                            <Spacer />
                            <Avatar size={70} bgColor={Colors.Blue}>
                                <Text fontWeight={"medium"} fontSize={30} color={"white"}>
                                    {fullName.split(' ').map(name => name[0]).join('')}
                                </Text>
                            </Avatar>
                        </HStack>
                    </Box>

                    <Box backgroundColor={"white"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} padding={1}>
                        <VStack>
                            <Button
                                variant="ghost"
                                borderRadius={30}
                                w={"100%"}
                                _pressed={{
                                    bg: "blueGray.200:alpha.50",
                                }}
                                onPress={() => navigation.navigate("EditProfile")}
                            >
                                <HStack justifyContent="space-between" alignItems={"center"} w={"100%"} space={3}>
                                    <Avatar size={42} bgColor={Colors.Blue}><FontAwesome6 name="edit" size={24} color="white" /></Avatar>
                                    <Text fontSize={16}>Edit Profile</Text>
                                    <Spacer />
                                    <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                                </HStack>
                            </Button>

                            <Button
                                variant="ghost"
                                borderRadius={30}
                                w={"100%"}
                                _pressed={{
                                    bg: "blueGray.200:alpha.50",
                                }}
                                onPress={() => navigation.navigate("Help")}
                            >
                                <HStack justifyContent="space-between" alignItems={"center"} w={"100%"} space={3}>
                                    <Avatar size={42} bgColor={Colors.Blue}><MaterialCommunityIcons name="help" size={24} color="white" /></Avatar>
                                    <Text fontSize={16}>Help</Text>
                                    <Spacer />
                                    <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                                </HStack>
                            </Button>

                            <Button
                                variant="ghost"
                                borderRadius={30}
                                w={"100%"}
                                _pressed={{
                                    bg: "blueGray.200:alpha.50",
                                }}
                                onPress={handleLogout}
                            >
                                <HStack justifyContent="space-between" alignItems={"center"} w={"100%"} space={3}>
                                    <Avatar size={42} bgColor={Colors.Red}><MaterialIcons name="logout" size={24} color="white" /></Avatar>
                                    <Text fontSize={16} color={Colors.Red}>Log Out</Text>
                                    <Spacer />
                                    <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                                </HStack>
                            </Button>
                        </VStack>
                    </Box>

                    <Box backgroundColor={"white"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} padding={1}>
                        <Button
                            variant="ghost"
                            borderRadius={30}
                            w={"100%"}
                            _pressed={{
                                bg: "blueGray.200:alpha.50",
                            }}
                            onPress={() => setIsOpen(true)}
                        >
                            <HStack justifyContent="space-between" alignItems={"center"} w={"100%"} space={3}>
                                <Avatar size={42} bgColor={Colors.Red}><MaterialIcons name="delete" size={24} color="white" /></Avatar>
                                <Text fontSize={16} color={Colors.Red}>Delete Account</Text>
                                <Spacer />
                                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                            </HStack>
                        </Button>
                    </Box>

                    <AlertDialog
                        leastDestructiveRef={cancelRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>Delete Account</AlertDialog.Header>
                            <AlertDialog.Body>
                                Are you sure you want to delete your account? This action cannot be undone.
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button.Group space={2}>
                                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="red" onPress={handleDeleteAccount}>
                                        Delete
                                    </Button>
                                </Button.Group>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                </VStack>
            )}
        </View>
    );
}

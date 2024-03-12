
import React from 'react';
import Colors from "../../Config/Colors";
import {Text, Box, HStack, VStack, Avatar, Spacer, IconButton, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

export default function Profile() {
    const navigation = useNavigation();
    return (
        <VStack space={3} paddingY={3}>
            <Box backgroundColor={"white"}  w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} padding={3}>
                <HStack  justifyContent="space-between"  alignItems={"center"}  w={"100%"} >
                    <VStack>
                        <Text fontWeight={"medium"} fontSize={20}>Hello!</Text>
                        <Text fontWeight={"semibold"} fontSize={22}>Tharuka Wijethunga</Text>
                    </VStack>
                    <Spacer/>
                    <Avatar size={70} bgColor={Colors.Blue}>
                        <Text fontWeight={"medium"} fontSize={20} color={"white"}>TW</Text>
                    </Avatar>
                </HStack>
            </Box>

            <Box backgroundColor={"white"}  w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} padding={3}>
                <VStack space={2}>
                    <HStack  justifyContent="space-between"  alignItems={"center"}  w={"100%"} space={3} >
                        <Avatar size={42} bgColor={Colors.Blue}><FontAwesome6 name="edit" size={24} color="white" /></Avatar>
                        <Text  fontSize={16}>Edit Profile</Text>
                        <Spacer/>
                        <View>
                            <IconButton
                                icon={<MaterialIcons name="keyboard-arrow-right" size={30} color="black"/>}
                                borderRadius={"full"}
                                _pressed={{
                                    bg: "blueGray.200:alpha.50"
                                }}
                                onPress={() => navigation.navigate("EditProfile")}
                            />
                        </View>
                    </HStack>

                    <HStack  justifyContent="space-between"  alignItems={"center"}  w={"100%"} space={3} >
                        <Avatar size={42} bgColor={Colors.Blue}><MaterialCommunityIcons name="help" size={24} color="white" /></Avatar>
                        <Text  fontSize={16}>Help</Text>
                        <Spacer/>
                        <View>
                            <IconButton
                                icon={<MaterialIcons name="keyboard-arrow-right" size={30} color="black"/>}
                                borderRadius={"full"}
                                _pressed={{
                                    bg: "blueGray.200:alpha.50"
                                }}
                                onPress={() => navigation.navigate("Help")}
                            />
                        </View>
                    </HStack>
                    <HStack   alignItems={"center"}  w={"100%"} space={3} >
                        <Avatar size={42} bgColor={Colors.Red}><MaterialIcons name="logout" size={24} color="white" /></Avatar>
                        <Text  fontSize={16} color={Colors.Red}>Log Out</Text>
                        <Spacer/>
                        <View>
                            <IconButton
                                icon={<MaterialIcons name="keyboard-arrow-right" size={30} color="black"/>}
                                borderRadius={"full"}
                                _pressed={{
                                    bg: "blueGray.200:alpha.50"
                                }}
                                onPress={() => navigation.navigate("Help")}
                            />
                        </View>
                    </HStack>
                </VStack>
            </Box>
        </VStack>
    )
}

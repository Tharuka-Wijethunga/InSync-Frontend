import {Dimensions} from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {
    View,
    Text,
    VStack,
    HStack,
    ScrollView,
    Avatar
} from "native-base";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";


export default function Category() {
    const screenWidth =Dimensions.get("screen").width;

    return (
        <View backgroundColor={"white"} h="100%" paddingX={4} paddingY={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <HStack space={3}  paddingBottom={4} >
                <VStack w={"50%"}>
                    <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                        <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                    </Avatar>
                    <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                </VStack>
                <VStack w={"50%"}>
                    <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                        <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                    </Avatar>
                    <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                </VStack>
            </HStack>
                <HStack space={3}  paddingBottom={4} >
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                </HStack>
                <HStack space={3}  paddingBottom={4} >
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                </HStack>
                <HStack space={3}  paddingBottom={4} >
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                </HStack>
                <HStack space={3}  paddingBottom={4} >
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                    <VStack w={"50%"}>
                        <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                            <FontAwesome5 name="hand-holding-usd" size={30} color="white"/>
                        </Avatar>
                        <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>Food</Text>
                    </VStack>
                </HStack>
            </ScrollView>
        </View>
    )
}


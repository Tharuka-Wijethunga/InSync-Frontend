import React from 'react';
import Colors from "../../Config/Colors";
import {
    View,
    Text,
    VStack,
    HStack,
    ScrollView,
    Avatar, IconButton, Divider
} from "native-base";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import Borders from "native-base/src/theme/base/borders";
import {useNavigation} from "@react-navigation/native";


export default function Category() {
    const navigation = useNavigation();
    return (
        <View backgroundColor={"white"} h="97%" w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack h="100%" alignSelf="center" paddingTop={2} space={3}>
                    <HStack justifyContent="space-between" alignItems="center" paddingLeft={4}>
                        <IconButton
                            icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                            onPress={() => navigation.navigate('RecordForm')}
                            borderRadius="full"
                            _pressed={{
                                bg: "blueGray.200:alpha.50"
                            }}
                        />
                        <Text fontSize={18} fontWeight={"medium"} paddingRight={6}>Categories</Text>
                    </HStack>
                    <View h={0.5} bg="gray.400"/>
                <HStack>
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
                <HStack>
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
                <HStack>
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
                <HStack>
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
                <HStack>
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
                </VStack>
            </ScrollView>
        </View>
    )
}

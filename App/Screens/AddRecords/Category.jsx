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
import {useNavigation} from "@react-navigation/native";
import CatIcon from "./CatIcon";

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
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                    </HStack>
                    <HStack>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                    </HStack>
                    <HStack>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                    </HStack>
                    <HStack>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                    </HStack>
                    <HStack>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                        <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} name="Food"/>
                    </HStack>
                </VStack>
            </ScrollView>
        </View>
    )
}

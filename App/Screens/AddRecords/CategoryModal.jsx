import React from 'react';
import {Button, HStack, IconButton, Modal, ScrollView, Text, View, VStack} from "native-base";
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import CatIcon from "./CatIcon";

const CategoryModal = ({modalVisible, setModalVisible}) => {
    return (
        <Modal isOpen={modalVisible} animationPreset="slide" safeAreaTop={12} backdropVisible={false}>
            <View backgroundColor={"white"} h="83%" w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3}>
                <VStack h="100%" alignSelf="center" paddingTop={2} >
                    <HStack justifyContent="space-between" alignItems="center" paddingLeft={4} >
                        <IconButton
                            icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                            onPress={() => setModalVisible(false)}
                            borderRadius="full"
                            _pressed={{
                                bg: "blueGray.200:alpha.50"
                            }}
                        />
                        <Text fontSize={18} fontWeight={"medium"} paddingRight={6}>Categories</Text>
                    </HStack>
                    <View h={0.480} bg="black"/>
                    <ScrollView showsVerticalScrollIndicator={false} maxH={550}>
                        <VStack space={4} paddingBottom={3} paddingTop={4}>
                            <HStack>
                                    <CatIcon icon={<MaterialCommunityIcons name="food" size={30} color="white" />}  color={"yellow.400"} name="Foods & Drinks" />
                                    <CatIcon icon={<MaterialCommunityIcons name="shopping" size={30} color="white" />} color={"purple.400"} name="Shopping"/>
                            </HStack>
                            <HStack>
                                <CatIcon icon={<MaterialCommunityIcons name="heart-pulse" size={30} color="white" />} color={"red.500"} name="Health"/>
                                <CatIcon icon={<FontAwesome5 name="hand-holding-usd" size={30} color="white"/>} color={"green.500"} name="Income"/>
                            </HStack>
                            <HStack>
                                <CatIcon icon={<MaterialCommunityIcons name="car-hatchback" size={30} color="white" />} color={"blue.500"} name="Vehicle"/>
                                <CatIcon icon={<MaterialCommunityIcons name="road-variant" size={30} color="white" />} color={"purple.600"} name="Public transport"/>
                            </HStack>
                            <HStack>
                                <CatIcon icon={<MaterialCommunityIcons name="file-document" size={30} color="white" />} color={"orange.400"} name="Bills"/>
                                <CatIcon icon={<FontAwesome5 name="coins" size={30} color="white" />} color={"blue.400"} name="Loans"/>
                            </HStack>
                            <HStack>
                                <CatIcon icon={<MaterialIcons name="maps-home-work" size={30} color="white" />} color={"blue.400"} name="Rent"/>
                                <CatIcon icon={<MaterialCommunityIcons name="menu" size={30} color="white" />} color={"rose.400"} name="Other"/>
                            </HStack>
                        </VStack>

                    </ScrollView>
                </VStack>

            </View>
        </Modal>
    );
};


export default CategoryModal;
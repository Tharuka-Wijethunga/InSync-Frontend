import React from 'react';
import {StyleSheet, Platform} from "react-native";
import {HStack, IconButton, Modal, Text, View,VStack} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import Records from "../Records";

const RecentActivities = ({modalVisible, setModalVisible}) => {
    return (
        <Modal isOpen={modalVisible} animationPreset="slide">
            <View backgroundColor={"white"}  marginTop={"30%"} marginBottom={"17%"}  w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3}>
                <VStack h="100%" w={"100%"} alignSelf="center" paddingTop={2}>
                    <HStack justifyContent="space-between" alignItems="center" paddingLeft={2} >
                            <IconButton
                                icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                                onPress={() => setModalVisible(!modalVisible)}
                                borderRadius="full"
                                _pressed={{
                                    bg: "blueGray.200:alpha.50"
                                }}
                            />
                            <Text fontSize={18} fontWeight={"medium"} paddingRight={4}>Recent Activities</Text>
                        </HStack>
                            <View h={0.480} bg="black"/>
                    <VStack paddingX={4}>
                        <Records/>
                    </VStack>
                </VStack>
            </View>
        </Modal>
    );
};


export default RecentActivities;
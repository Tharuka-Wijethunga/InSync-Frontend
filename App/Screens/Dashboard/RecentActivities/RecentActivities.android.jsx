import React, {useEffect} from 'react';
import {StyleSheet, Platform} from "react-native";
import {HStack, IconButton, Modal, Text, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import Records from "../Records";

const RecentActivities = ({modalVisible, setModalVisible,isFocused,recordRef}) => {

    useEffect(()=> {
        if(isFocused){
            recordRef.current.fetchRecords().then();
        }
    }, [isFocused]);

    return (
        <Modal isOpen={modalVisible} animationPreset="slide">
            {/*<View backgroundColor={"white"}  marginTop={"30%"} marginBottom={"17%"}  w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3}>*/}
                <Modal.Content  h="100%" bg="white" marginTop={"30%"} marginBottom={"17%"}  w="94%" rounded={"2xl"}>
                <Modal.Header bg={"white"}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <IconButton
                            icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                            onPress={() => setModalVisible(!modalVisible)}
                            borderRadius="full"
                            _pressed={{
                                bg: "blueGray.200:alpha.50"
                            }}
                        />
                        <Text fontSize={18} fontWeight={"medium"}>Recent Activities</Text>
                    </HStack>
                </Modal.Header>
                <Modal.Body>
                    <Records ref={recordRef}/>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
};


export default RecentActivities;
import React from 'react';
import {StyleSheet, Platform} from "react-native";
import {HStack, IconButton, Modal, Text, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import Records from "./Records";
import flex from "native-base/src/components/primitives/Flex";

const RecentActivities = ({modalVisible, setModalVisible}) => {
    return (
        <Modal isOpen={modalVisible} animationPreset="fade">
            <View style={styles.container}>
                <Modal.Content w="100%" h="100%"  bg="white" rounded={"2xl"} style={styles.content} >
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
                        <Records/>
                    </Modal.Body>
                </Modal.Content>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        borderRadius: "2xl",
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,

    },
    content: {
        ...Platform.select({
            android: {
                margin: "auto",
                height: '100%'
            }
        })
    }
})

export default RecentActivities;
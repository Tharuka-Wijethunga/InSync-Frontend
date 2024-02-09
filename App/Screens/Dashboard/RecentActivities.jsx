import React from 'react';
import {StyleSheet} from "react-native";
import Colors from "../../Config/Colors";
import {Modal, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

const RecentActivities = () => {
    return (
        <Modal>
            <View style={styles.container}>
                <View alignSelf="flex-end">
                    <MaterialIcons name="keyboard-arrow-left" size={36} color="black"/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "white",
        alignItems: 'center',
        flex: 1,
        borderRadius: "2xl",
        paddingTop:15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15
    }
})
export default RecentActivities;
import { StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, View} from "native-base";
import {useNavigation} from "@react-navigation/native";
import RecordForm from "./RecordForm";


export default function AddRecords() {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <RecordForm/>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.BGColor,
        flex: 1,
        paddingTop: 15,
    }
})
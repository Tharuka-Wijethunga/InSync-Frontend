import { StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, View} from "native-base";
import {useNavigation} from "@react-navigation/native";
import RecordForm from "./RecordForm";
import {SafeAreaView} from "react-native-safe-area-context";


export default function AddRecords() {
    return (
        <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
                <RecordForm/>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.BGColor,
        flex: 1,
    }
})
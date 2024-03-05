import { StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider} from "native-base";
import RecordForm from "./RecordForm";

export default function AddRecords() {
    return (
        <NativeBaseProvider>
            <RecordForm/>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.BGColor,
        alignItems: 'center',
        flex: 1,
        paddingTop: 15
    }
})
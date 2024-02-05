import { Text, StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, Button, View} from "native-base";

export default function AddRecords() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Text>AddRecords</Text>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: Colors.BGColor,
        alignItems: 'center',
        flex: 1,
        paddingTop: 50
    }
})
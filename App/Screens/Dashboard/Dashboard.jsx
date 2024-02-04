import { Text, StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Utils/Colors";
import {NativeBaseProvider, View} from "native-base";

export default function Dashboard() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Text>Dashboard</Text>
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